# Google Translate API Setup Guide

The language guide translator is currently not working because the Google Translate API key is missing. Follow these steps to fix it:

## Problem
- The language translator shows "Try Again" button and "No speech detected" error
- Translation API returns 503 error: "Translation service temporarily unavailable"
- Missing `GOOGLE_TRANSLATE_API_KEY` in environment variables

## Solution Steps

### Step 1: Get Google Translate API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Cloud Translation API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Cloud Translation API"
   - Click on it and click "Enable"

4. Create API credentials:
   - Go to "APIs & Services" > "Credentials" 
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

5. (Optional) Restrict the API key:
   - Click on your API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Cloud Translation API" from the list

### Step 2: Configure the API Key

1. Open your `.env.local` file in the project root
2. Replace `your_google_translate_api_key_here` with your actual API key:

```bash
GOOGLE_TRANSLATE_API_KEY=AIzaSyABC123-your-actual-key-here
```

### Step 3: Restart Your Development Server

```bash
npm run dev
# or
yarn dev
```

### Step 4: Test the Translation

1. Go to `/language-guide` page
2. Try typing some English text and clicking "Translate to हिंदी (Hindi)"
3. Try using the voice input feature by clicking the microphone button

## Voice Input Troubleshooting

If voice input still doesn't work after fixing the API key:

1. **Check browser compatibility**: 
   - Chrome, Safari, and Edge are recommended
   - Firefox has limited support

2. **Allow microphone permissions**:
   - Click the microphone icon in your browser's address bar
   - Set to "Allow" for this site

3. **Test microphone access**:
   - Go to your browser settings
   - Check Privacy & Security > Microphone settings
   - Make sure your site is allowed

## Features That Will Work After Setup

✅ Text translation (English ↔ Hindi)
✅ Voice input in both languages  
✅ Text-to-speech pronunciation
✅ Language detection
✅ Common phrases section with audio

## Cost Information

- Google Translate API charges per character translated
- First 500,000 characters per month are free
- After that: $20 per 1 million characters
- For a tourism site, this should be well within free limits

## Security Note

- Keep your API key secure
- Don't commit it to version control
- For production, consider using Google Cloud IAM for better security
- Consider adding HTTP referrer restrictions in Google Cloud Console

## Test Commands

After setup, you can test the API directly:

```bash
# Test the translate API endpoint
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello, how are you?", "targetLanguage": "hi"}'
```

Expected response:
```json
{
  "translatedText": "नमस्ते, आप कैसे हैं?",
  "detectedLanguage": "English",
  "originalText": "Hello, how are you?",
  "targetLanguage": "Hindi"
}
```