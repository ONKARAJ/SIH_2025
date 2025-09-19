import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPTS } from "@/lib/openaiClient";
import {
  getRelevantLocalData,
  formatLocalDataForContext,
  isJharkhandTourismQuery,
  isNonJharkhandLocationQuery,
} from "@/lib/dataLoader";
import { ConversationMemory } from "@/lib/conversationMemory";
import {
  googleMapsService,
  JHARKHAND_TRAVEL_TIPS,
} from "@/lib/googleMapsIntegration";
import { bookingService, JHARKHAND_ROUTES } from "@/lib/bookingIntegration";

interface ChatMessage {
  role: "system" | "user" | "assistant";
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
    const { message, sessionId } = (await request.json()) as ChatRequest;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Generate session ID if not provided
    const currentSessionId =
      sessionId || ConversationMemory.generateSessionId();

    // Store user message in conversation memory
    ConversationMemory.addMessage(currentSessionId, {
      role: "user",
      content: message,
      timestamp: Date.now(),
    });

    // Check for distance queries first (keep existing functionality)
    const distanceQuery = extractDistanceQuery(message);
    if (distanceQuery) {
      try {
        const distanceResponse = await handleDistanceQuery(distanceQuery);
        if (distanceResponse) {
          ConversationMemory.addMessage(currentSessionId, {
            role: "assistant",
            content: distanceResponse,
            timestamp: Date.now(),
          });
          return NextResponse.json({
            message: distanceResponse,
            source: "distance_api",
            sessionId: currentSessionId,
          });
        }
      } catch (error) {
        console.log("Distance API failed, continuing with AI response");
      }
    }

    // Detect query type and gather relevant data
    const localData = getRelevantLocalData(message);
    const isJharkhandQuery = isJharkhandTourismQuery(message);

    // Check for specific travel assistant queries
    const travelQuery = await detectTravelQuery(message);

    // Get conversation context
    const conversationContext =
      ConversationMemory.formatConversationForLLM(currentSessionId);

    // If travel query detected, handle with specialized logic
    if (travelQuery) {
      const travelResponse = await handleTravelQuery(
        travelQuery,
        currentSessionId
      );
      if (travelResponse) {
        return NextResponse.json({
          message: travelResponse,
          source: "travel_assistant",
          sessionId: currentSessionId,
          hasLocalData: true,
        });
      }
    }

    // Choose system prompt based on query type and available data
    let systemPrompt: string;
    let contextData = "";

    if (isJharkhandQuery && localData.hasLocalData) {
      const localContext = formatLocalDataForContext(
        localData.locations,
        localData.pois
      );
      contextData = localContext + "\n\n" + formatJharkhandTravelTips();
      systemPrompt = SYSTEM_PROMPTS.CONTEXTUAL(contextData);
    } else if (isJharkhandQuery) {
      contextData = formatJharkhandTravelTips();
      systemPrompt = SYSTEM_PROMPTS.TOURISM_ENHANCED + "\n\n" + contextData;
    } else {
      systemPrompt = SYSTEM_PROMPTS.GENERAL;
    }

    // Add conversation context to system prompt
    if (conversationContext) {
      systemPrompt += `\n\n${conversationContext}`;
    }

    const messages: ChatMessage[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: message,
      },
    ];

    // Generate response, prefer AI API if configured
    let aiResponse: string;
    let source: string;

    try {
      if (isAIAvailable()) {
        try {
          const aiResponseText = await tryDeepSeekAPI(messages);
          aiResponse = aiResponseText;
          source = "ai_api";
        } catch (apiError) {
          console.log(
            "AI API call failed, falling back to intelligent response"
          );
          aiResponse = getIntelligentResponse(message);
          source = "intelligent_response";
        }
      } else {
        aiResponse = getIntelligentResponse(message);
        source = "intelligent_response";
      }
    } catch (error) {
      console.error("All response methods failed:", error);
      aiResponse = getFallbackResponse(message);
      source = "final_fallback";
    }

    // Store AI response in conversation memory
    ConversationMemory.addMessage(currentSessionId, {
      role: "assistant",
      content: aiResponse,
      timestamp: Date.now(),
    });

    return NextResponse.json({
      message: aiResponse,
      source,
      sessionId: currentSessionId,
      hasLocalData: localData.hasLocalData,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    // Provide fallback response
    const { message, sessionId } = await request
      .json()
      .catch(() => ({ message: "", sessionId: null }));
    const fallbackResponse = getFallbackResponse(message);
    const currentSessionId =
      sessionId || ConversationMemory.generateSessionId();

    return NextResponse.json({
      message: fallbackResponse,
      source: "fallback",
      sessionId: currentSessionId,
    });
  }
}

// Helper function to extract distance queries
function extractDistanceQuery(
  message: string
): { origin: string; destination: string } | null {
  const lowerMessage = message.toLowerCase();

  // Common distance query patterns
  const patterns = [
    /(?:distance|how far).{0,20}(?:between|from)\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:and|to)\s+([^\s]+(?:\s+[^\s]+)*)/i,
    /(?:from)\s+([^\s]+(?:\s+[^\s]+)*)\s+to\s+([^\s]+(?:\s+[^\s]+)*).{0,20}(?:distance|how far)/i,
    /([^\s]+(?:\s+[^\s]+)*)\s+to\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:distance|km|kilometers)/i,
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      return {
        origin: match[1].trim(),
        destination: match[2].trim(),
      };
    }
  }

  return null;
}

// Helper function to handle distance queries
async function handleDistanceQuery(distanceQuery: {
  origin: string;
  destination: string;
}): Promise<string | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/distance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: distanceQuery.origin,
          destination: distanceQuery.destination,
        }),
      }
    );

    if (response.ok) {
      const distanceData = await response.json();
      return `📍 **Distance from ${distanceData.origin} to ${distanceData.destination}:**\n\n🚗 **By Road**: ${distanceData.distance.text} (${distanceData.distance.kilometers} km)\n⏱️ **Travel Time**: ${distanceData.duration.text} (approximately ${distanceData.duration.hours} hours)\n\n*Travel times are estimated for driving and may vary based on traffic conditions and route taken.*\n\nWould you like to know about any attractions or places to visit along this route?`;
    }
  } catch (error) {
    console.error("Distance API error:", error);
  }
  return null;
}

// Helper function to call DeepSeek API (OpenAI-compatible)
async function tryDeepSeekAPI(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl =
    process.env.DEEPSEEK_API_BASE_URL || "https://api.deepseek.com";
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!apiKey) {
    throw new Error("AI API key not configured");
  }

  console.log("Attempting AI API call (DeepSeek)...");

  try {
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout

    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 300,
        temperature: 0.7,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API Error Response:", errorText);

      if (response.status === 401) {
        throw new Error("AI API: Invalid API key");
      } else if (response.status === 429) {
        throw new Error("AI API: Rate limit exceeded");
      } else if (response.status >= 500) {
        throw new Error("AI API: Server error");
      }

      throw new Error(
        `AI API Error: ${response.status} - ${response.statusText}`
      );
    }

    const data: AIResponse = await response.json();
    console.log("DeepSeek API response received successfully");

    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response content from AI API");
    }

    return aiResponse;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("AI API request timed out");
    }
    throw error;
  }
}

// Jharkhand-only intelligent responses
function getIntelligentResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // First check if it's about non-Jharkhand locations and reject immediately
  if (isNonJharkhandLocationQuery(message)) {
    return `🏞️ I specialize only in Jharkhand tourism! I can't help with places outside Jharkhand.\n\nLet me help you discover Jharkhand instead:\n\n• Hundru Falls - Spectacular 98m waterfall\n• Baidyanath Dham - Sacred Jyotirlinga temple\n• Netarhat - Queen of Chotanagpur\n\nWhat would you like to know about Jharkhand?`;
  }

  // Check if query is about Jharkhand tourism
  if (isJharkhandTourismQuery(message)) {
    // General greetings for Jharkhand context
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return "👋 Johar! I'm your Jharkhand Tourism Assistant. Ask me about places to visit, distances, or travel in Jharkhand!";
    }

    // Thank you responses
    if (message.includes("thank you") || message.includes("thanks")) {
      return "😊 You're welcome! Happy to help with your Jharkhand travel plans!";
    }

    // Return Jharkhand-specific fallback
    return getJharkhandSpecificResponse(userMessage);
  }

  // For non-Jharkhand queries, politely redirect
  return `🏞️ I'm specialized in Jharkhand tourism! I can help you with:\n\n• Places to visit in Jharkhand\n• Travel distances within Jharkhand\n• Jharkhand culture and festivals\n• Tourist attractions in Jharkhand\n\nWhat would you like to know about Jharkhand?`;
}

// Function to provide Jharkhand-specific responses
function getJharkhandSpecificResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.includes("place") || message.includes("visit") || message.includes("destination")) {
    return "🌟 Popular Jharkhand destinations: Hundru Falls, Baidyanath Dham (Deoghar), Netarhat, Betla National Park, Parasnath Hill. Which type interests you - waterfalls, temples, or wildlife?";
  }

  if (message.includes("waterfall") || message.includes("falls")) {
    return "🏞️ Jharkhand's beautiful waterfalls: Hundru Falls (98m), Dassam Falls, Lodh Falls (143m), Jonha Falls. Best time to visit is July-February!";
  }

  if (message.includes("festival") || message.includes("culture")) {
    return "🎭 Jharkhand's tribal festivals: Sarhul (spring), Sohrai (harvest), Tusu (winter), Karma (monsoon). Each celebrates the connection with nature!";
  }

  return `I can help with specific information about Jharkhand tourism. Try asking about:\n\n• "Best places in Jharkhand"\n• "Waterfalls in Jharkhand"\n• "Distance from Ranchi to Deoghar"\n• "Jharkhand festivals"\n\nWhat interests you most?`;
}

// Function to check if AI API is available
function isAIAvailable(): boolean {
  return !!process.env.DEEPSEEK_API_KEY;
}

// Travel query detection and handling
interface TravelQuery {
  type: "distance" | "booking" | "attractions" | "travel_mode";
  origin?: string;
  destination?: string;
  query: string;
}

async function detectTravelQuery(message: string): Promise<TravelQuery | null> {
  const lowerMessage = message.toLowerCase();

  // Distance queries
  const distancePatterns = [
    /(?:distance|how far).{0,30}(?:between|from)\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:and|to)\s+([^\s]+(?:\s+[^\s]+)*)/i,
    /(?:from)\s+([^\s]+(?:\s+[^\s]+)*)\s+to\s+([^\s]+(?:\s+[^\s]+)*).{0,30}(?:distance|how far)/i,
  ];

  for (const pattern of distancePatterns) {
    const match = message.match(pattern);
    if (match) {
      return {
        type: "distance",
        origin: match[1].trim(),
        destination: match[2].trim(),
        query: message,
      };
    }
  }

  // Booking queries
  if (
    lowerMessage.includes("cheapest") ||
    lowerMessage.includes("book") ||
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost")
  ) {
    const locationMatch = message.match(
      /(?:from|between)\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:to|and)\s+([^\s]+(?:\s+[^\s]+)*)/i
    );
    if (locationMatch) {
      return {
        type: "booking",
        origin: locationMatch[1].trim(),
        destination: locationMatch[2].trim(),
        query: message,
      };
    }
  }

  // Travel mode queries
  if (
    lowerMessage.includes("fastest way") ||
    lowerMessage.includes("best way") ||
    lowerMessage.includes("how to reach") ||
    lowerMessage.includes("how to go")
  ) {
    const locationMatch = message.match(
      /(?:to|reach)\s+([^\s]+(?:\s+[^\s]+)*)\s+(?:from)\s+([^\s]+(?:\s+[^\s]+)*)/i
    );
    if (locationMatch) {
      return {
        type: "travel_mode",
        destination: locationMatch[1].trim(),
        origin: locationMatch[2].trim(),
        query: message,
      };
    }
  }

  // Attractions queries
  if (
    lowerMessage.includes("places to visit") ||
    lowerMessage.includes("tourist spots") ||
    lowerMessage.includes("attractions") ||
    lowerMessage.includes("sightseeing")
  ) {
    const locationMatch = message.match(
      /(?:in|at|near)\s+([^\s]+(?:\s+[^\s]+)*)/i
    );
    if (locationMatch) {
      return {
        type: "attractions",
        destination: locationMatch[1].trim(),
        query: message,
      };
    }
  }

  return null;
}

async function handleTravelQuery(
  travelQuery: TravelQuery,
  sessionId: string
): Promise<string | null> {
  try {
    switch (travelQuery.type) {
      case "distance":
        return await handleDistanceQuery({
          origin: travelQuery.origin!,
          destination: travelQuery.destination!,
        });

      case "booking":
        return await handleBookingQuery(
          travelQuery.origin!,
          travelQuery.destination!
        );

      case "travel_mode":
        return await handleTravelModeQuery(
          travelQuery.origin!,
          travelQuery.destination!
        );

      case "attractions":
        return await handleAttractionsQuery(travelQuery.destination!);

      default:
        return null;
    }
  } catch (error) {
    console.error("Error handling travel query:", error);
    return null;
  }
}

async function handleBookingQuery(
  origin: string,
  destination: string
): Promise<string> {
  try {
    const bookingOptions = await bookingService.getTransportOptions(
      origin,
      destination
    );

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

async function handleTravelModeQuery(
  origin: string,
  destination: string
): Promise<string> {
  try {
    const travelModes = await googleMapsService.getTravelModeOptions(
      origin,
      destination
    );

    if (travelModes.length === 0) {
      return `I couldn't get specific travel options for ${origin} to ${destination}. ${getJharkhandRouteAdvice(origin, destination)}`;
    }

    let response = `🛣️ **Travel Options: ${origin} → ${destination}**\n\n`;

    travelModes.forEach((mode, index) => {
      const modeEmoji =
        mode.mode === "DRIVING" ? "🚗" : mode.mode === "TRANSIT" ? "🚌" : "🚶";
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
        response += `   ${place.opening_hours.open_now ? "🟢 Open now" : "🔴 Closed now"}\n`;
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
  let tips = "**Jharkhand Travel Tips:**\n";

  tips += "\n**Popular Routes:**\n";
  JHARKHAND_TRAVEL_TIPS.popular_routes.forEach((route) => {
    tips += `• ${route.route}: ${route.duration} | ${route.tips}\n`;
  });

  tips += "\n**Transport Hubs:**\n";
  Object.entries(JHARKHAND_TRAVEL_TIPS.transport_hubs).forEach(
    ([city, info]) => {
      tips += `• ${city}: ${info.note}\n`;
    }
  );

  return tips;
}

function getJharkhandRouteAdvice(origin: string, destination: string): string {
  const route = JHARKHAND_ROUTES.popular_connections.find(
    (r) =>
      r.route.toLowerCase().includes(origin.toLowerCase()) &&
      r.route.toLowerCase().includes(destination.toLowerCase())
  );

  if (route) {
    return `**${route.route}**: ${route.description}. ${route.tips}`;
  }

  return "For accurate prices and bookings, check our transport booking section.";
}

function getPopularJharkhandDestinations(): string {
  return `**Popular Jharkhand Destinations:**\n\n• **Baidyanath Dham (Deoghar)** - Sacred Jyotirlinga temple\n• **Hundru Falls** - 98m waterfall near Ranchi\n• **Netarhat** - Queen of Chotanagpur hill station\n• **Betla National Park** - Wildlife and tiger reserve\n• **Parasnath Hill** - Highest peak, Jain pilgrimage site\n\n*Ask me about specific places for detailed information and travel options!*`;
}

// Jharkhand-only fallback responses
function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // First check if it's about non-Jharkhand places
  if (isNonJharkhandLocationQuery(message)) {
    return `🏞️ I only provide information about Jharkhand tourism! I can't help with places outside Jharkhand.\n\nExplore Jharkhand instead:\n\n• Hundru Falls - 98m spectacular waterfall\n• Baidyanath Dham - Sacred Jyotirlinga temple\n• Betla National Park - Wildlife sanctuary\n\nAsk me about Jharkhand places!`;
  }

  // Check if it's a Jharkhand-related query
  if (isJharkhandTourismQuery(message)) {
    // Tourism-related fallback responses for Jharkhand
    if (message.includes("waterfall") || message.includes("falls")) {
      return "🏞️ Jharkhand's Beautiful Waterfalls:\n\n• **Hundru Falls** (98m) - Near Ranchi\n• **Dassam Falls** (44m) - Niagara of Jharkhand\n• **Lodh Falls** (143m) - Highest waterfall\n• **Jonha Falls** (43m) - Gautamdhara\n\n**Best time**: July-February for maximum flow!";
    }

    if (message.includes("festival") || message.includes("culture")) {
      return "🎭 Jharkhand's Tribal Festivals:\n\n• **Sarhul** - Spring nature festival\n• **Sohrai** - Harvest festival\n• **Tusu** - Winter goddess festival\n• **Karma** - Monsoon blessing festival\n\nThese celebrate tribal connection with nature!";
    }

    if (message.includes("place") || message.includes("visit") || message.includes("destination")) {
      return "🌟 Top Jharkhand Destinations:\n\n• Hundru Falls - 98m waterfall\n• Betla National Park - Wildlife\n• Netarhat - Queen of Chotanagpur\n• Deoghar - Baidyanath Temple\n• Parasnath Hill - Highest peak\n\nWhat interests you - nature, temples, or wildlife?";
    }

    if (message.includes("distance") || message.includes("how far")) {
      return "📍 Jharkhand Distances from Ranchi:\n\n• Jamshedpur: ~130 km (3 hours)\n• Deoghar: ~250 km (5-6 hours)\n• Netarhat: ~156 km (4 hours)\n• Hundru Falls: ~45 km (1.5 hours)\n\nWhich route do you need?";
    }

    if (message.includes("capital")) {
      return "🏙️ **Ranchi** is Jharkhand's capital! MS Dhoni's hometown with Rock Garden, Tagore Hill, and pleasant climate.";
    }

    if (message.includes("hello") || message.includes("hi")) {
      return "👋 Johar! I'm your Jharkhand tourism specialist. Ask about places, distances, or attractions in Jharkhand!";
    }

    return "I help with Jharkhand tourism information. Ask about places, waterfalls, temples, or travel within Jharkhand!";
  }

  // For completely off-topic queries, redirect to Jharkhand
  return `🏞️ I specialize in Jharkhand tourism only! Let me help you discover Jharkhand:\n\n• Amazing waterfalls like Hundru Falls\n• Sacred temples like Baidyanath Dham\n• Wildlife at Betla National Park\n• Hill stations like Netarhat\n\nWhat would you like to know about Jharkhand?`;
}
