interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Function to check if DeepSeek is available
function isDeepSeekAvailable(): boolean {
  return !!process.env.DEEPSEEK_API_KEY;
}

// Helper function for DeepSeek API
async function tryDeepSeekAPI(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  // Using the correct DeepSeek API endpoint
  const baseUrl = 'https://api.deepseek.com';

  if (!apiKey) {
    throw new Error('DeepSeek API key not configured');
  }

  console.log('Attempting DeepSeek API call...');

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
        model: 'deepseek-chat',
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
      console.error('DeepSeek API Error Response:', errorText);

      if (response.status === 401) {
        throw new Error('DeepSeek API: Invalid API key');
      } else if (response.status === 429) {
        throw new Error('DeepSeek API: Rate limit exceeded');
      } else if (response.status >= 500) {
        throw new Error('DeepSeek API: Server error');
      }

      throw new Error(`DeepSeek API Error: ${response.status} - ${response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    console.log('DeepSeek API response received successfully');

    const aiResponse = data.choices[0]?.message?.content;
    if (!aiResponse) {
      throw new Error('No response content from DeepSeek API');
    }

    return aiResponse;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('DeepSeek API request timed out');
    }
    throw error;
  }
}

// Response handling (DeepSeek first, then fallback)
let aiResponse: string;
let source: string;

try {
  if (isDeepSeekAvailable()) {
    aiResponse = await tryDeepSeekAPI(messages);
    source = 'deepseek';
  } else {
    // Use intelligent pattern-based responses as fallback
    aiResponse = getIntelligentResponse(message);
    source = 'intelligent_fallback';
  }
} catch (error) {
  console.error('All AI providers failed:', error);
  aiResponse = getFallbackResponse(message);
  source = 'fallback';
}
