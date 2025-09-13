import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    const baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' },
        { status: 500 }
      );
    }

    // System prompt for Jharkhand Tourism context
    const systemPrompt = `You are an AI assistant for Jharkhand Tourism website. You are knowledgeable, friendly, and helpful. You can answer questions about:

1. **Jharkhand Tourism**: Tourist destinations, waterfalls, national parks, temples, hill stations, best times to visit, travel tips, accommodations, local attractions
2. **Culture & Heritage**: Tribal cultures, festivals (Sarhul, Sohrai, Tusu, Karma), traditional arts, crafts, music, dance, local customs
3. **Geography & Places**: Cities, districts, landmarks, geographical features, climate, seasonal information
4. **Current Affairs**: Government, politics, recent developments, administrative information
5. **General Knowledge**: Science, technology, history, current events, and any other topic users might ask about
6. **Distance Calculations**: When users ask about distances between places, provide helpful information

Key facts about Jharkhand:
- Capital: Ranchi (known for pleasant climate and as MS Dhoni's hometown)
- Formed: November 15, 2000 (28th state of India)
- Current Chief Minister: Hemant Soren (JMM party)
- Current Governor: C.P. Radhakrishnan
- Famous for: Waterfalls (Hundru, Dassam, Lodh, Jonha), Tribal culture, Mineral resources, Wildlife sanctuaries
- Major attractions: Betla National Park, Netarhat hill station, Deoghar (Baidyanath Temple), Parasnath Hill

Respond in a conversational, friendly tone. For tourism questions, provide practical information including best times to visit, how to reach, and what to expect. For distance questions, acknowledge the query and provide helpful context about the places mentioned.

Always be accurate and helpful. If you're not certain about specific current information, acknowledge that and provide the best general guidance you can.`;

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

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API Error:', errorText);
      
      // Fallback response for API errors
      const fallbackResponse = getFallbackResponse(message);
      return NextResponse.json({ 
        message: fallbackResponse,
        source: 'fallback'
      });
    }

    const data: DeepSeekResponse = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      const fallbackResponse = getFallbackResponse(message);
      return NextResponse.json({ 
        message: fallbackResponse,
        source: 'fallback'
      });
    }

    return NextResponse.json({ 
      message: aiResponse,
      source: 'deepseek'
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Provide fallback response
    const { message } = await request.json().catch(() => ({ message: '' }));
    const fallbackResponse = getFallbackResponse(message);
    
    return NextResponse.json({ 
      message: fallbackResponse,
      source: 'fallback'
    });
  }
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
    return "Hello! 👋 Welcome to Jharkhand Tourism! I'm here to help you explore the beauty of Jharkhand - from magnificent waterfalls to rich tribal culture. I can also answer questions about travel, distances, current affairs, and general topics. What would you like to know?";
  }
  
  return "I'm here to help you with information about Jharkhand tourism, culture, travel distances, and general questions! I'm currently working on connecting to my AI service for more detailed responses. In the meantime, feel free to ask about:\n\n🏞️ **Tourism**: Waterfalls, national parks, temples\n🎭 **Culture**: Festivals, tribal heritage\n📍 **Travel**: Distances, routes, best times to visit\n💬 **General**: Current affairs, science, any topic!\n\nWhat would you like to explore?";
}
