# 🤖 AI-Powered Jharkhand Tourism Chatbot

This project features a comprehensive conversational AI chatbot that can answer questions about Jharkhand tourism, current affairs, general knowledge, and more.

## 🚀 Features

### ✅ Universal Conversation
- **Any topic, any question** - Not limited to tourism
- **Context awareness** - Remembers conversation history
- **Persistent memory** - Conversations saved across sessions
- **Natural flow** - Seamless topic switching

### ✅ Jharkhand Expertise
- **Tourism**: Waterfalls, temples, wildlife parks, hill stations
- **Culture**: Tribal festivals, communities, traditions
- **Government**: Current CM (Hemant Soren), Governor, politics
- **General info**: History, geography, industries, languages

### ✅ Advanced AI Integration
- **Hugging Face AI** - Free inference API
- **Multiple models** - Primary + fallback systems
- **Smart prompting** - Context-aware responses
- **Graceful fallbacks** - Always responds helpfully

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
Create a `.env.local` file in the project root:
```env
HUGGINGFACE_API_KEY=your_api_key_here
NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_api_key_here
```

Get your free API key from [Hugging Face](https://huggingface.co/settings/tokens)

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test the Chatbot
- Open `http://localhost:3000`
- Click the chatbot button in bottom-right corner
- Try questions like:
  - "Who is the CM of Jharkhand?"
  - "Best waterfalls to visit"
  - "Tell me about AI"
  - "What's the weather like?"

## 🧪 Testing

The chatbot handles various question types:
- **Tourism**: Travel planning, attractions, festivals
- **Current affairs**: Politics, government, recent news
- **Science**: Technology, physics, biology concepts
- **General**: Weather, education, culture, food

## 🛡️ Fallback System

Even without AI, the chatbot provides intelligent responses through:
- Pattern-based recognition
- Topic-specific knowledge base
- Contextual fallback responses
- Comprehensive Jharkhand information

## 🎯 Technical Details

- **Framework**: Next.js 14 with React
- **AI Models**: Google FLAN-T5, GPT-2 (via Hugging Face)
- **Storage**: localStorage for conversation history
- **Styling**: Tailwind CSS with shadcn/ui
- **Responsive**: Mobile-friendly design

## 🎉 What Makes It Special

This isn't just a tourism chatbot - it's a comprehensive AI assistant that:
- Answers **any** question you ask
- Specializes in Jharkhand knowledge
- Maintains conversation context
- Never fails to respond
- Provides helpful information on any topic

Perfect for tourism websites, educational platforms, or any application needing an intelligent conversational interface!
