import { NextRequest, NextResponse } from 'next/server';
import { 
  SYSTEM_PROMPTS
} from '@/lib/openaiClient';
import {
  getRelevantLocalData,
  formatLocalDataForContext,
  isJharkhandTourismQuery
} from '@/lib/dataLoader';
import { ConversationMemory } from '@/lib/conversationMemory';
import { googleMapsService, JHARKHAND_TRAVEL_TIPS } from '@/lib/googleMapsIntegration';
import { bookingService, JHARKHAND_ROUTES } from '@/lib/bookingIntegration';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  sessionId?: string;
}

interface AIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json() as ChatRequest;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate session ID if not provided
    const currentSessionId = sessionId || ConversationMemory.generateSessionId();

    // Store user message in conversation memory
    ConversationMemory.addMessage(currentSessionId, {
      role: 'user',
      content: message,
      timestamp: Date.now()
    });

    // Check for distance queries first (keep existing functionality)
    const distanceQuery = extractDistanceQuery(message);
    if (distanceQuery) {
      try {
        const distanceResponse = await handleDistanceQuery(distanceQuery);
        if (distanceResponse) {
          ConversationMemory.addMessage(currentSessionId, {
            role: 'assistant',
            content: distanceResponse,
            timestamp: Date.now()
          });
          return NextResponse.json({
            message: distanceResponse,
            source: 'distance_api',
            sessionId: currentSessionId
          });
        }
      } catch (error) {
        console.log('Distance API failed, continuing with AI response');
      }
    }

    // Detect query type and gather relevant data
    const localData = getRelevantLocalData(message);
    const isJharkhandQuery = isJharkhandTourismQuery(message);
    
    // Check for specific travel assistant queries
    const travelQuery = await detectTravelQuery(message);
    
    // Get conversation context
    const conversationContext = ConversationMemory.formatConversationForLLM(currentSessionId);

    // If travel query detected, handle with specialized logic
    if (travelQuery) {
      const travelResponse = await handleTravelQuery(travelQuery, currentSessionId);
      if (travelResponse) {
        return NextResponse.json({
          message: travelResponse,
          source: 'travel_assistant',
          sessionId: currentSessionId,
          hasLocalData: true
        });
      }
    }
    
    // Choose system prompt based on query type and available data
    let systemPrompt: string;
    let contextData = '';
    
    if (isJharkhandQuery && localData.hasLocalData) {
      const localContext = formatLocalDataForContext(localData.locations, localData.pois);
      contextData = localContext + '\n\n' + formatJharkhandTravelTips();
      systemPrompt = SYSTEM_PROMPTS.CONTEXTUAL(contextData);
    } else if (isJharkhandQuery) {
      contextData = formatJharkhandTravelTips();
      systemPrompt = SYSTEM_PROMPTS.TOURISM_ENHANCED + '\n\n' + contextData;
    } else {
      systemPrompt = SYSTEM_PROMPTS.GENERAL;
    }

    // Add conversation context to system prompt
    if (conversationContext) {
      systemPrompt += `\n\n${conversationContext}`;
    }

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: message
      }
    ];

    // Use intelligent responses as primary (API key format issue)
    let aiResponse: string;
    let source: string;

    try {
      // Primary: Use intelligent pattern-based responses
      aiResponse = getIntelligentResponse(message);
      source = 'intelligent_response';
      
      // Backup: Try AI API if available and intelligent response is generic
      if (isAIAvailable() && aiResponse.includes('I understand you\'re asking about')) {
        try {
          const aiResponseText = await tryDeepSeekAPI(messages);
          aiResponse = aiResponseText;
          source = 'ai_api';
        } catch (apiError) {
          console.log('AI API fallback failed, using intelligent response');
          // Keep the intelligent response
        }
      }
    } catch (error) {
      console.error('All response methods failed:', error);
      aiResponse = getFallbackResponse(message);
      source = 'final_fallback';
    }

    // Store AI response in conversation memory
    ConversationMemory.addMessage(currentSessionId, {
      role: 'assistant',
      content: aiResponse,
      timestamp: Date.now()
    });

    return NextResponse.json({
      message: aiResponse,
      source,
      sessionId: currentSessionId,
      hasLocalData: localData.hasLocalData
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Provide fallback response
    const { message, sessionId } = await request.json().catch(() => ({ message: '', sessionId: null }));
    const fallbackResponse = getFallbackResponse(message);
    const currentSessionId = sessionId || ConversationMemory.generateSessionId();
    
    return NextResponse.json({
      message: fallbackResponse,
      source: 'fallback',
      sessionId: currentSessionId
    });
  }
}

// Helper function to extract distance queries
function extractDistanceQuery(message: string): { origin: string; destination: string } | null {
  const lowerMessage = message.toLowerCase();
  
  // Common distance query patterns
  const patterns = [
    /(?:distance|how far).{0,20}(?:between|from)\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:and|to)\s+([^\s]+(?:\s+[^\s]+)*)/i,
    /(?:from)\s+([^\s]+(?:\s+[^\s]+)*)\s+to\s+([^\s]+(?:\s+[^\s]+)*).{0,20}(?:distance|how far)/i,
    /([^\s]+(?:\s+[^\s]+)*)\s+to\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:distance|km|kilometers)/i
  ];
  
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      return {
        origin: match[1].trim(),
        destination: match[2].trim()
      };
    }
  }
  
  return null;
}

// Helper function to handle distance queries
async function handleDistanceQuery(distanceQuery: { origin: string; destination: string }): Promise<string | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/distance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: distanceQuery.origin,
        destination: distanceQuery.destination,
      }),
    });
    
    if (response.ok) {
      const distanceData = await response.json();
      return `📍 **Distance from ${distanceData.origin} to ${distanceData.destination}:**\n\n🚗 **By Road**: ${distanceData.distance.text} (${distanceData.distance.kilometers} km)\n⏱️ **Travel Time**: ${distanceData.duration.text} (approximately ${distanceData.duration.hours} hours)\n\n*Travel times are estimated for driving and may vary based on traffic conditions and route taken.*\n\nWould you like to know about any attractions or places to visit along this route?`;
    }
  } catch (error) {
    console.error('Distance API error:', error);
  }
  return null;
}

// Helper function for DeepSeek API
async function tryDeepSeekAPI(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  // Note: The provided key appears to be for a different service, using OpenAI-compatible endpoint
  const baseUrl = 'https://api.openai.com';

  if (!apiKey) {
    throw new Error('AI API key not configured');
  }

  console.log('Attempting AI API call...');

  try {
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout

    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API Error Response:', errorText);
      
      if (response.status === 401) {
        throw new Error('AI API: Invalid API key');
      } else if (response.status === 429) {
        throw new Error('AI API: Rate limit exceeded');
      } else if (response.status >= 500) {
        throw new Error('AI API: Server error');
      }
      
      throw new Error(`AI API Error: ${response.status} - ${response.statusText}`);
    }

    const data: AIResponse = await response.json();
    console.log('AI API response received successfully');
    
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response content from AI API');
    }

    return aiResponse;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('AI API request timed out');
    }
    throw error;
  }
}

// Intelligent pattern-based responses (works without API keys)
function getIntelligentResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Pawan Singh questions
  if (message.includes('power star pawan singh') || message.includes('pawan singh')) {
    return "🌟 **Pawan Singh** is known as the 'Power Star' of Bhojpuri cinema. He's a popular Bhojpuri actor and singer from Bihar, famous for action movies and folk songs. He has a huge fan following in Bihar, UP, and Jharkhand regions.";
  }
  
  // AI/Technology questions
  if (message.includes('artificial intelligence') || message.includes('machine learning') || message.includes('ai')) {
    return "🤖 **Artificial Intelligence** is transforming industries worldwide. AI involves creating smart systems that can learn, reason, and make decisions. Key areas include machine learning, natural language processing, and computer vision.";
  }
  
  // Current affairs
  if (message.includes('current affairs') || message.includes('news') || message.includes('latest')) {
    return "📰 I can help with general knowledge! For latest news, I recommend checking reliable news sources. Is there a specific topic you'd like to know about - politics, technology, sports, or something else?";
  }
  
  // Science questions
  if (message.includes('science') || message.includes('physics') || message.includes('chemistry')) {
    return "🔬 **Science** encompasses understanding our natural world through observation and experimentation. What specific scientific topic interests you - physics, chemistry, biology, or space science?";
  }
  
  // Technology questions
  if (message.includes('technology') || message.includes('computer') || message.includes('internet')) {
    return "💻 **Technology** is rapidly evolving! From smartphones to AI, tech shapes our daily lives. Are you interested in a specific technology - programming, gadgets, software, or emerging tech?";
  }
  
  // History questions
  if (message.includes('history') || message.includes('historical')) {
    return "📚 **History** teaches us about our past and helps shape our future. What period or region interests you - ancient civilizations, world wars, Indian history, or local heritage?";
  }
  
  // General greetings
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "👋 Hello! I'm here to help with travel, tourism, general knowledge, and more. What would you like to know?";
  }
  
  // Thank you responses
  if (message.includes('thank you') || message.includes('thanks')) {
    return "😊 You're welcome! Happy to help. Is there anything else you'd like to know?";
  }
  
  // Default intelligent response
  return `I understand you're asking about "${userMessage}". While I don't have specific information on that topic right now, I can help with:\n\n• 🏞️ Jharkhand tourism and travel\n• 📍 Distance calculations\n• 🎭 Culture and festivals\n• 💬 General knowledge\n\nFeel free to ask about any of these topics!`;
}


// Function to check if AI API is available
function isAIAvailable(): boolean {
  return !!process.env.DEEPSEEK_API_KEY;
}

// Travel query detection and handling
interface TravelQuery {
  type: 'distance' | 'booking' | 'attractions' | 'travel_mode';
  origin?: string;
  destination?: string;
  query: string;
}

async function detectTravelQuery(message: string): Promise<TravelQuery | null> {
  const lowerMessage = message.toLowerCase();
  
  // Distance queries
  const distancePatterns = [
    /(?:distance|how far).{0,30}(?:between|from)\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:and|to)\s+([^\s]+(?:\s+[^\s]+)*)/i,
    /(?:from)\s+([^\s]+(?:\s+[^\s]+)*)\s+to\s+([^\s]+(?:\s+[^\s]+)*).{0,30}(?:distance|how far)/i
  ];
  
  for (const pattern of distancePatterns) {
    const match = message.match(pattern);
    if (match) {
      return {
        type: 'distance',
        origin: match[1].trim(),
        destination: match[2].trim(),
        query: message
      };
    }
  }
  
  // Booking queries
  if (lowerMessage.includes('cheapest') || lowerMessage.includes('book') || 
      lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    const locationMatch = message.match(/(?:from|between)\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:to|and)\s+([^\s]+(?:\s+[^\s]+)*)/i);
    if (locationMatch) {
      return {
        type: 'booking',
        origin: locationMatch[1].trim(),
        destination: locationMatch[2].trim(),
        query: message
      };
    }
  }
  
  // Travel mode queries
  if (lowerMessage.includes('fastest way') || lowerMessage.includes('best way') ||
      lowerMessage.includes('how to reach') || lowerMessage.includes('how to go')) {
    const locationMatch = message.match(/(?:to|reach)\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:from)\s+([^\s]+(?:\s+[^\s]+)*)/i);
    if (locationMatch) {
      return {
        type: 'travel_mode',
        destination: locationMatch[1].trim(),
        origin: locationMatch[2].trim(),
        query: message
      };
    }
  }
  
  // Attractions queries
  if (lowerMessage.includes('places to visit') || lowerMessage.includes('tourist spots') ||
      lowerMessage.includes('attractions') || lowerMessage.includes('sightseeing')) {
    const locationMatch = message.match(/(?:in|at|near)\s+([^\s]+(?:\s+[^\s]+)*)/i);
    if (locationMatch) {
      return {
        type: 'attractions',
        destination: locationMatch[1].trim(),
        query: message
      };
    }
  }
  
  return null;
}

async function handleTravelQuery(travelQuery: TravelQuery, sessionId: string): Promise<string | null> {
  try {
    switch (travelQuery.type) {
      case 'distance':
        return await handleDistanceQuery({
          origin: travelQuery.origin!,
          destination: travelQuery.destination!
        });
        
      case 'booking':
        return await handleBookingQuery(travelQuery.origin!, travelQuery.destination!);
        
      case 'travel_mode':
        return await handleTravelModeQuery(travelQuery.origin!, travelQuery.destination!);
        
      case 'attractions':
        return await handleAttractionsQuery(travelQuery.destination!);
        
      default:
        return null;
    }
  } catch (error) {
    console.error('Error handling travel query:', error);
    return null;
  }
}

async function handleBookingQuery(origin: string, destination: string): Promise<string> {
  try {
    const bookingOptions = await bookingService.getTransportOptions(origin, destination);
    
    if (!bookingOptions) {
      return `I couldn't find specific booking options for ${origin} to ${destination} right now. Here are some general recommendations:\n\n${getJharkhandRouteAdvice(origin, destination)}`;
    }
    
    let response = `🚌 **Transport Options: ${origin} → ${destination}**\n\n`;
    response += bookingOptions.summary;
    response += `\n\n**All Options:**`;
    
    bookingOptions.all_options.forEach((option, index) => {
      response += `\n${index + 1}. **${option.operator}** (${option.type})\n`;
      response += `   ⏰ ${option.departure_time} → ${option.arrival_time} (${option.duration})\n`;
      response += `   💰 ₹${option.price} | 🪑 ${option.seats_available} seats available`;
    });
    
    response += `\n\n*Want to book? Visit our booking section for live availability and instant confirmation!*`;
    
    return response;
  } catch (error) {
    return `I'm having trouble fetching live booking data. ${getJharkhandRouteAdvice(origin, destination)}`;
  }
}

async function handleTravelModeQuery(origin: string, destination: string): Promise<string> {
  try {
    const travelModes = await googleMapsService.getTravelModeOptions(origin, destination);
    
    if (travelModes.length === 0) {
      return `I couldn't get specific travel options for ${origin} to ${destination}. ${getJharkhandRouteAdvice(origin, destination)}`;
    }
    
    let response = `🛣️ **Travel Options: ${origin} → ${destination}**\n\n`;
    
    travelModes.forEach((mode, index) => {
      const modeEmoji = mode.mode === 'DRIVING' ? '🚗' : mode.mode === 'TRANSIT' ? '🚌' : '🚶';
      response += `${index + 1}. ${modeEmoji} **${mode.mode.toLowerCase()}** - ${mode.duration} (${mode.distance})\n`;
      response += `   💰 ${mode.cost_estimate} | ${mode.description}\n\n`;
    });
    
    response += `💡 **My recommendation**: ${travelModes[0].mode.toLowerCase()} is fastest at ${travelModes[0].duration}.`;
    
    return response;
  } catch (error) {
    return `I couldn't get live travel data right now. ${getJharkhandRouteAdvice(origin, destination)}`;
  }
}

async function handleAttractionsQuery(location: string): Promise<string> {
  try {
    const attractions = await googleMapsService.getNearbyAttractions(location);
    
    if (attractions.length === 0) {
      return `I couldn't find specific attractions data for ${location}. Let me share some popular Jharkhand destinations:\n\n${getPopularJharkhandDestinations()}`;
    }
    
    let response = `🏞️ **Top Attractions near ${location}**\n\n`;
    
    attractions.forEach((place, index) => {
      response += `${index + 1}. **${place.name}**\n`;
      if (place.rating) {
        response += `   ⭐ ${place.rating}/5 (${place.reviews_count || 0} reviews)\n`;
      }
      if (place.opening_hours?.open_now !== undefined) {
        response += `   ${place.opening_hours.open_now ? '🟢 Open now' : '🔴 Closed now'}\n`;
      }
      response += `\n`;
    });
    
    response += `*Based on Google Maps reviews and ratings. Visit timings may vary.*`;
    
    return response;
  } catch (error) {
    return `I couldn't get live attractions data. ${getPopularJharkhandDestinations()}`;
  }
}

function formatJharkhandTravelTips(): string {
  let tips = '**Jharkhand Travel Tips:**\n';
  
  tips += '\n**Popular Routes:**\n';
  JHARKHAND_TRAVEL_TIPS.popular_routes.forEach(route => {
    tips += `• ${route.route}: ${route.duration} | ${route.tips}\n`;
  });
  
  tips += '\n**Transport Hubs:**\n';
  Object.entries(JHARKHAND_TRAVEL_TIPS.transport_hubs).forEach(([city, info]) => {
    tips += `• ${city}: ${info.note}\n`;
  });
  
  return tips;
}

function getJharkhandRouteAdvice(origin: string, destination: string): string {
  const route = JHARKHAND_ROUTES.popular_connections.find(r => 
    r.route.toLowerCase().includes(origin.toLowerCase()) && 
    r.route.toLowerCase().includes(destination.toLowerCase())
  );
  
  if (route) {
    return `**${route.route}**: ${route.description}. ${route.tips}`;
  }
  
  return 'For accurate prices and bookings, check our transport booking section.';
}

function getPopularJharkhandDestinations(): string {
  return `**Popular Jharkhand Destinations:**\n\n• **Baidyanath Dham (Deoghar)** - Sacred Jyotirlinga temple\n• **Hundru Falls** - 98m waterfall near Ranchi\n• **Netarhat** - Queen of Chotanagpur hill station\n• **Betla National Park** - Wildlife and tiger reserve\n• **Parasnath Hill** - Highest peak, Jain pilgrimage site\n\n*Ask me about specific places for detailed information and travel options!*`;
}

// Fallback responses for when API is unavailable
function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Tourism-related fallback responses
  if (message.includes('waterfall') || message.includes('falls')) {
    return "🏞️ **Jharkhand's Beautiful Waterfalls**:\n\n• **Hundru Falls** (98m) - Near Ranchi, spectacular cascade\n• **Dassam Falls** (44m) - Called 'Niagara of Jharkhand'\n• **Lodh Falls** (143m) - Highest waterfall in the state\n• **Jonha Falls** (43m) - Also known as Gautamdhara\n\n**Best time to visit**: During/after monsoon (July-February) for maximum water flow!";
  }
  
  if (message.includes('festival') || message.includes('culture')) {
    return "🎭 **Jharkhand's Rich Tribal Culture**:\n\n• **Sarhul** - Spring festival celebrating nature\n• **Sohrai** - Harvest festival honoring cattle\n• **Tusu** - Winter festival dedicated to goddess Tusu\n• **Karma** - Monsoon festival for youth blessings\n\nThese festivals showcase the deep connection between tribal communities and nature! Would you like to know more about any specific festival?";
  }
  
  if (message.includes('place') || message.includes('visit') || message.includes('destination')) {
    return "🌟 **Top Jharkhand Destinations**:\n\n• **Hundru Falls** - Spectacular 98m waterfall\n• **Betla National Park** - Tigers, elephants, wildlife\n• **Netarhat** - 'Queen of Chotanagpur', hill station\n• **Deoghar** - Sacred Baidyanath Jyotirlinga temple\n• **Parasnath Hill** - Highest peak, Jain pilgrimage\n• **Ranchi** - Capital city, Rock Garden, Tagore Hill\n\nWhat type of experience are you looking for - adventure, spirituality, or nature?";
  }
  
  if (message.includes('distance') || message.includes('how far')) {
    return "📍 **Distance Information**:\n\nI can help you with distances between places in Jharkhand and beyond! For accurate, real-time distance calculations with travel options, I'm working on getting that data for you.\n\n**Major distances from Ranchi**:\n• Jamshedpur: ~130 km (3 hours by road)\n• Deoghar: ~250 km (5-6 hours)\n• Netarhat: ~156 km (4 hours)\n• Hundru Falls: ~45 km (1.5 hours)\n\nWhich specific route would you like to know about?";
  }
  
  // Government-related
  if (message.includes('cm') || message.includes('chief minister')) {
    return "🏛️ **Hemant Soren** is the current Chief Minister of Jharkhand (JMM party), serving since 2019. He focuses on tribal rights, employment generation, and welfare schemes.";
  }
  
  if (message.includes('capital')) {
    return "🏙️ **Ranchi** is the capital of Jharkhand! Known for its pleasant climate, educational institutions (IIT, NIT), and as MS Dhoni's hometown. Major attractions include Jagannath Temple, Rock Garden, and Tagore Hill.";
  }
  
  // General responses
  if (message.includes('hello') || message.includes('hi')) {
    return "Hi! 👋 I'm your Jharkhand travel assistant. Ask me about places, distances, or any topic!";
  }
  
  return "I can help with tourism, travel, distances, and general questions. Currently connecting to AI service. What would you like to know?";
}
