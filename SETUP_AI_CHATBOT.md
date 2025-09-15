# Enhanced AI Chatbot Setup Guide

This guide explains how to set up and configure the enhanced AI chatbot that can answer anything from the open world while maintaining local tourism expertise.

## 🔧 Quick Setup

### 1. Environment Variables
Copy the `.env.local` file and configure your API keys:

```bash
# AI Integration - OpenAI (Primary)
OPENAI_API_KEY="your-openai-api-key-here"

# AI Integration - HuggingFace (Fallback)
HF_API_KEY="your-huggingface-api-key-here"

# AI Integration - DeepSeek (Fallback)
DEEPSEEK_API_KEY="your-deepseek-api-key-here"

# Google Services (Required for distance calculations)
GOOGLE_MAPS_API_KEY="your-google-maps-api-key-here"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

## 🤖 How It Works

### AI Provider Hierarchy
1. **OpenAI (Primary)**: If `OPENAI_API_KEY` is configured, uses GPT-3.5-turbo for responses
2. **HuggingFace (Fallback)**: If OpenAI fails, attempts HuggingFace models
3. **DeepSeek (Fallback)**: If both above fail, uses DeepSeek API
4. **Local Fallback**: If all APIs fail, uses hardcoded local responses

### Hybrid Knowledge System
- **Local Data**: Tourism data from `/data/locations.json` and `/data/pointsOfInterest.json`
- **Open-World Knowledge**: Full LLM capabilities for any topic
- **Smart Context**: Automatically detects tourism queries and enhances with local data
- **Distance Integration**: Google Maps API for real-time distance calculations

### Conversational Memory
- **Session Management**: Maintains conversation context across messages
- **Interest Tracking**: Learns user preferences and recent topics
- **Context Awareness**: Provides relevant follow-up suggestions

## 🎯 Features

### ✅ What the Chatbot Can Do
- **Tourism Questions**: Expert knowledge on Jharkhand + global destinations
- **General Knowledge**: Science, technology, history, current events
- **Distance Calculations**: Real-time distance/travel time between any locations
- **Cultural Information**: Festivals, traditions, heritage worldwide
- **Open Chat**: Any topic, creative tasks, problem-solving
- **Context Memory**: Remembers conversation flow and user interests

### 🎨 UI Enhancements
- **Source Indicators**: Shows which AI provider powered each response
- **Local Data Badges**: Indicates when local tourism data was used
- **Session Persistence**: Maintains conversation across browser sessions
- **Smart Suggestions**: Context-aware quick reply options

## 🔧 Configuration Options

### AI Model Selection
Edit `/lib/openaiClient.ts` to customize:
- Model selection (gpt-3.5-turbo, gpt-4, etc.)
- Temperature settings
- Token limits
- System prompts

### Local Data Customization
Update data files:
- `/data/locations.json`: Add new locations
- `/data/pointsOfInterest.json`: Add attractions
- System will automatically enhance responses with this data

### Memory Configuration
Modify `/lib/conversationMemory.ts`:
- Session timeout (default: 30 minutes)
- Message history limit (default: 20 messages)
- Context tracking parameters

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
```bash
# Required
OPENAI_API_KEY=your-key
GOOGLE_MAPS_API_KEY=your-key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Optional fallbacks
HF_API_KEY=your-key
DEEPSEEK_API_KEY=your-key
```

## 🧪 Testing

### Test Local Development
```bash
npm run dev
# Visit http://localhost:3000
```

### Test Production Build
```bash
npm run build
npm start
```

### Test Different Scenarios
1. **Tourism Query**: "Tell me about Hundru Falls"
2. **Distance Query**: "Distance from Ranchi to Jamshedpur"
3. **General Knowledge**: "Explain quantum computing"
4. **Follow-up**: Ask related questions to test memory
5. **API Failure**: Temporarily remove API keys to test fallbacks

## 📊 Monitoring

### Available Metrics
- Active conversation sessions
- AI provider usage statistics
- Response times and fallback rates
- User interaction patterns

### Logs
- Check browser console for client-side logs
- Check server logs for API responses
- Monitor Vercel function logs in production

## 🔍 Troubleshooting

### Common Issues
1. **No AI Response**: Check API keys in environment variables
2. **Distance Queries Fail**: Verify Google Maps API key and billing
3. **Memory Issues**: Check session cleanup in production
4. **Build Errors**: Ensure all dependencies are installed

### Debug Mode
Set `NODE_ENV=development` for detailed logging.

## 🎯 Next Steps

### Potential Enhancements
1. **Streaming Responses**: Implement real-time text streaming
2. **Voice Integration**: Add speech-to-text and text-to-speech
3. **Multi-language**: Support Hindi, Bengali, other local languages
4. **Advanced Memory**: Implement persistent user profiles
5. **Analytics**: Track user queries and improve responses

### Integration Opportunities
- Weather data integration
- Real-time news feeds
- Social media sentiment
- Travel booking APIs
- Event calendars

## 📚 API Reference

### Chat Endpoint
```
POST /api/chat
{
  "message": "Your question",
  "sessionId": "optional-session-id"
}

Response:
{
  "message": "AI response",
  "source": "openai|huggingface|deepseek|fallback",
  "sessionId": "session-id",
  "hasLocalData": boolean
}
```

### Distance Endpoint
```
POST /api/distance
{
  "origin": "Location A",
  "destination": "Location B"
}
```

This enhanced chatbot is now capable of handling any question while maintaining its tourism expertise!