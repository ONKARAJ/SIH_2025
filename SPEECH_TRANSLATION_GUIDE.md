# Speech-to-Text and Translation System Guide

## Overview
This guide explains how to use the integrated speech recognition and translation system for the Jharkhand Tourism website.

## System Components

### 1. Translation API (`/api/translate`)
- **Location**: `app/api/translate/route.ts`
- **Function**: Handles text translation using Google Translate API
- **API Key**: Configured in `.env.local` as `GOOGLE_TRANSLATE_API_KEY`

### 2. Translation Service (`lib/translationService.ts`)
- **Purpose**: Client-side utility for interacting with the translation API
- **Features**: 
  - Translation requests
  - Language detection
  - Error handling
  - Supported language management

### 3. Voice Input Component (`components/voice-input.tsx`)
- **Purpose**: Basic speech recognition component
- **Features**:
  - Real-time speech-to-text
  - Language selection (English/Hindi)
  - Error handling

### 4. Voice Translator Component (`components/voice-translator.tsx`)
- **Purpose**: Enhanced component combining speech recognition with translation
- **Features**:
  - Speech recognition in multiple languages
  - Automatic or manual translation
  - Copy functionality
  - Real-time feedback

### 5. Demo Page (`/voice-translator-demo`)
- **Purpose**: Interactive demonstration of the system
- **URL**: `http://localhost:3000/voice-translator-demo`

## Setup Instructions

### 1. Environment Configuration
Ensure your `.env.local` file contains:
```bash
GOOGLE_TRANSLATE_API_KEY="AIzaSyAJGggwEKUT5RTcHcRPBif9z3vsanwF3ks"
```

### 2. Starting the Development Server
```bash
npm run dev
```

### 3. Access the Demo
Navigate to: `http://localhost:3000/voice-translator-demo`

## Usage Examples

### Basic Voice Input (Speech-to-Text Only)
```tsx
import VoiceInput from '@/components/voice-input';

function MyComponent() {
  const handleTranscript = (text: string) => {
    console.log('Speech recognized:', text);
  };

  return (
    <VoiceInput
      onTranscript={handleTranscript}
      initialLanguage="en-US"
      className="w-full"
    />
  );
}
```

### Voice Translator (Speech-to-Text + Translation)
```tsx
import VoiceTranslator from '@/components/voice-translator';
import { type TranslationResponse } from '@/lib/translationService';

function MyComponent() {
  const handleTranscript = (text: string) => {
    console.log('Speech recognized:', text);
  };

  const handleTranslation = (translation: TranslationResponse) => {
    console.log('Translation:', translation.translatedText);
  };

  return (
    <VoiceTranslator
      onTranscript={handleTranscript}
      onTranslation={handleTranslation}
      initialSpeechLanguage="en-US"
      initialTargetLanguage="hi"
      autoTranslate={true}
      className="w-full"
    />
  );
}
```

### Direct API Usage
```javascript
// GET: Get supported languages
fetch('/api/translate')
  .then(response => response.json())
  .then(data => console.log(data.supportedLanguages));

// POST: Translate text
fetch('/api/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Hello, welcome to Jharkhand!',
    targetLanguage: 'hi'
  })
})
.then(response => response.json())
.then(data => console.log(data.translatedText));
```

## Supported Languages

The system supports the following languages for translation:
- English (en)
- Hindi (hi)
- Bengali (bn)
- Telugu (te)
- Tamil (ta)
- Urdu (ur)
- Gujarati (gu)
- Kannada (kn)
- Malayalam (ml)
- Punjabi (pa)
- Odia (or)
- Assamese (as)
- Marathi (mr)
- Nepali (ne)

Speech recognition currently supports:
- English (en-US)
- Hindi (hi-IN)

## Features

### Real-time Speech Recognition
- Uses browser's Web Speech API
- Works in Chrome, Safari, and Edge
- Continuous listening mode
- Interim results for real-time feedback

### Instant Translation
- Powered by Google Translate API
- Auto-detection of source language
- Support for 13+ Indian languages
- Error handling and retry mechanisms

### User-Friendly Interface
- Visual feedback during recording
- Copy-to-clipboard functionality
- Language selection dropdowns
- Error messages with recovery suggestions

## Troubleshooting

### Common Issues

1. **Microphone Permission Denied**
   - Solution: Allow microphone access in browser settings
   - Chrome: Settings > Privacy & Security > Site Settings > Microphone

2. **Speech Recognition Not Working**
   - Ensure you're using Chrome, Safari, or Edge
   - Check microphone permissions
   - Try refreshing the page

3. **Translation Fails**
   - Check internet connection
   - Verify API key is configured
   - Check API quotas and limits

4. **No Audio Input Detected**
   - Check microphone is connected and working
   - Speak clearly and close to microphone
   - Check system audio settings

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Safari
- ✅ Edge
- ❌ Firefox (limited speech recognition support)

## API Response Examples

### Successful Translation
```json
{
  "translatedText": "नमस्ते, झारखंड में आपका स्वागत है!",
  "detectedLanguage": "English",
  "originalText": "Hello, welcome to Jharkhand!",
  "targetLanguage": "Hindi (हिंदी)",
  "sourceLanguage": "English"
}
```

### API Info Response
```json
{
  "message": "Translation API endpoint",
  "usage": {
    "method": "POST",
    "body": {
      "text": "Text to translate (required, max 5000 characters)",
      "targetLanguage": "Target language code (optional, defaults to \"hi\" for Hindi)"
    }
  },
  "supportedLanguages": [
    {"code": "en", "name": "English"},
    {"code": "hi", "name": "Hindi"}
    // ... more languages
  ]
}
```

## Integration Tips

1. **For Tourism Applications**: Use tourism-specific phrases in the example translations
2. **For Multi-language Support**: Implement language switching based on user preferences
3. **For Offline Scenarios**: Add fallback mechanisms when translation services are unavailable
4. **For Performance**: Implement caching for frequently translated phrases

## Testing

To test the complete system:
1. Open the demo page: `http://localhost:3000/voice-translator-demo`
2. Click the microphone button
3. Say "Hello, welcome to Jharkhand"
4. Verify both transcription and translation appear
5. Test copying functionality
6. Try different languages and phrases

The system is now ready for integration into tourism applications, customer service interfaces, and multilingual communication tools.