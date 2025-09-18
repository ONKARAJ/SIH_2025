import { NextRequest, NextResponse } from 'next/server';

// Language code mapping for better user experience
const languageNames: { [key: string]: string } = {
  'en': 'English',
  'hi': 'Hindi',
  'bn': 'Bengali', 
  'te': 'Telugu',
  'ta': 'Tamil',
  'ur': 'Urdu',
  'gu': 'Gujarati',
  'kn': 'Kannada',
  'ml': 'Malayalam',
  'pa': 'Punjabi',
  'or': 'Odia',
  'as': 'Assamese',
  'mr': 'Marathi',
  'ne': 'Nepali',
  'si': 'Sinhala',
  'my': 'Myanmar',
  'km': 'Khmer',
  'lo': 'Lao',
  'th': 'Thai',
  'vi': 'Vietnamese',
  'zh': 'Chinese',
  'ja': 'Japanese',
  'ko': 'Korean',
  'ar': 'Arabic',
  'fa': 'Persian',
  'fr': 'French',
  'es': 'Spanish',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian'
};

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage = 'hi' } = await request.json();

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 5000 characters allowed.' },
        { status: 400 }
      );
    }

    // Check if Google Translate API key is available
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
      // Fallback response when API key is not configured
      return NextResponse.json(
        { 
          error: 'Translation service temporarily unavailable. Please configure Google Translate API key.' 
        },
        { status: 503 }
      );
    }

    // Call Google Translate API
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          format: 'text'
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Google Translate API error:', errorData);
      
      return NextResponse.json(
        { error: 'Translation service failed. Please try again later.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract translation and detected language
    const translation = data.data.translations[0];
    const translatedText = translation.translatedText;
    const detectedLanguageCode = translation.detectedSourceLanguage;
    const detectedLanguage = languageNames[detectedLanguageCode] || detectedLanguageCode?.toUpperCase();

    return NextResponse.json({
      translatedText,
      detectedLanguage: detectedLanguage || undefined,
      originalText: text,
      targetLanguage: languageNames[targetLanguage] || targetLanguage.toUpperCase()
    });

  } catch (error) {
    console.error('Translation error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle GET requests with helpful information
export async function GET() {
  return NextResponse.json({
    message: 'Translation API endpoint',
    usage: {
      method: 'POST',
      body: {
        text: 'Text to translate (required, max 5000 characters)',
        targetLanguage: 'Target language code (optional, defaults to "hi" for Hindi)'
      }
    },
    supportedLanguages: Object.entries(languageNames).map(([code, name]) => ({
      code,
      name
    })),
    note: 'This endpoint requires Google Translate API key to be configured.'
  });
}