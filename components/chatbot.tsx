"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Minimize2,
  RotateCcw,
  MapPin,
} from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  source?: string;
  hasLocalData?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Geolocation hook
  const {
    position,
    error: locationError,
    loading: locationLoading,
    supported: locationSupported,
    requestLocation,
    clearLocation,
    getCurrentLocationName
  } = useGeolocation();

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",

        content: "👋 **Johar Jharkhand! I'm your Jharkhand Travel Assistant**\n\nI help with:\n• 📍 Distance & travel routes\n• 🎯 Tourist spots & attractions  \n• 🚌 Transport options & booking\n• 💬 General questions\n• 📍 Location-based recommendations\n\n**Try asking:**\n• \"Distance from Ranchi to Deoghar\"\n• \"Best places in Jharkhand\"\n• \"Who is power star Pawan Singh?\"\n\n📍 **Tip**: Click the location button 📍 for personalized recommendations!\n\nWhat can I help you with?",
        main
        isBot: true,
        timestamp: new Date(),
        source: 'system'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Check if message is asking for distance between two places
  const extractDistanceQuery = (message: string): { origin: string; destination: string } | null => {
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
  };

  // Get AI response from enhanced API
  const getAIResponse = async (userMessage: string): Promise<{content: string, source: string, sessionId: string, hasLocalData?: boolean}> => {
    try {
      // Get AI response from enhanced API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle the response structure safely
        return {
          content: data.message || 'No response received',
          source: data.source || 'fallback',
          sessionId: data.sessionId || sessionId || `session_${Date.now()}`,
          hasLocalData: data.hasLocalData || false
        };
      } else {
        console.error(`API request failed with status: ${response.status}`);
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API request failed: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('AI response error:', error);
      // Fallback to local responses with safe error handling
      try {
        const fallbackContent = getFallbackResponse(userMessage);
        return {
          content: fallbackContent,
          source: 'fallback',
          sessionId: sessionId || `fallback_${Date.now()}`,
          hasLocalData: true
        };
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        return {
          content: "I'm having trouble processing your request right now. Please try again!",
          source: 'error',
          sessionId: sessionId || `error_${Date.now()}`,
          hasLocalData: false
        };
      }
    }
  };

  // Fallback responses when APIs are unavailable
  const getFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Distance queries fallback
    if (message.includes('distance') || message.includes('how far')) {
      return "📍 **Distance Information:**\n\nI can help you with distances between places! I'm currently working on getting the precise distance calculation for you. In the meantime, here are some common distances from Ranchi:\n\n• **Jamshedpur**: ~130 km (3 hours by road)\n• **Deoghar**: ~250 km (5-6 hours)\n• **Netarhat**: ~156 km (4 hours)\n• **Hundru Falls**: ~45 km (1.5 hours)\n\nWhich specific route would you like to know about?";
    }
    
    // Tourism fallbacks
    if (message.includes('waterfall') || message.includes('falls')) {
      return "🏞️ **Jharkhand's Beautiful Waterfalls:**\n\n• **Hundru Falls** (98m) - Near Ranchi, spectacular cascade\n• **Dassam Falls** (44m) - Called 'Niagara of Jharkhand'\n• **Lodh Falls** (143m) - Highest waterfall in the state\n• **Jonha Falls** (43m) - Also known as Gautamdhara\n\n**Best time to visit**: During/after monsoon (July-February) for maximum water flow!";
    }
    
    if (message.includes('festival') || message.includes('culture')) {
      return "🎭 **Jharkhand's Rich Tribal Culture:**\n\n• **Sarhul** - Spring festival celebrating nature\n• **Sohrai** - Harvest festival honoring cattle\n• **Tusu** - Winter festival dedicated to goddess Tusu\n• **Karma** - Monsoon festival for youth blessings\n\nThese festivals showcase the deep connection between tribal communities and nature! Would you like to know more about any specific festival?";
    }
    
    if (message.includes('place') || message.includes('visit') || message.includes('destination')) {
      return "🌟 **Top Jharkhand Destinations:**\n\n• **Hundru Falls** - Spectacular 98m waterfall\n• **Betla National Park** - Tigers, elephants, wildlife\n• **Netarhat** - 'Queen of Chotanagpur', hill station\n• **Deoghar** - Sacred Baidyanath Jyotirlinga temple\n• **Parasnath Hill** - Highest peak, Jain pilgrimage\n• **Ranchi** - Capital city, Rock Garden, Tagore Hill\n\nWhat type of experience are you looking for - adventure, spirituality, or nature?";
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
    
    return "I'm here to help you with information about Jharkhand tourism, culture, travel distances, and general questions! I can provide details about:\n\n🏞️ **Tourism**: Waterfalls, national parks, temples\n🎭 **Culture**: Festivals, tribal heritage\n📍 **Travel**: Distances, routes, best times to visit\n💬 **General**: Current affairs, science, any topic!\n\nWhat would you like to explore?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Get AI response with error handling
      const aiResponse = await getAIResponse(userMessage.content);
      
      // Validate response structure
      if (!aiResponse || typeof aiResponse !== 'object') {
        throw new Error('Invalid response format received');
      }
      
      // Update session ID if we got a new one
      if (aiResponse.sessionId && aiResponse.sessionId !== sessionId) {
        setSessionId(aiResponse.sessionId);
      }
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: aiResponse.content || 'Sorry, I couldn\'t process that request.',
        isBot: true,
        timestamp: new Date(),
        source: aiResponse.source || 'fallback',
        hasLocalData: aiResponse.hasLocalData || false
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Try to provide a more helpful error message
      let errorContent = "I'm having trouble connecting right now. Please try again in a moment!";
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorContent = "🔧 The AI service needs configuration. Using local knowledge for now!\n\n" + getFallbackResponse(userMessage.content);
        } else if (error.message.includes('network')) {
          errorContent = "🌐 Network issue detected. Please check your internet connection and try again.";
        }
      }
      
      const errorMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: errorContent,
        isBot: true,
        timestamp: new Date(),
        source: 'fallback',
        hasLocalData: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLocationRequest = async () => {
    if (position) {
      // If location is already available, show current location info
      try {
        const locationName = await getCurrentLocationName(position);
        const locationMessage: ChatMessage = {
          id: `location-${Date.now()}`,
          content: `📍 **Current Location**: ${locationName}\n\nCoordinates: ${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}\n\nI can now provide better recommendations based on your location! Try asking:\n• \"Places near me\"\n• \"Distance to Ranchi from here\"\n• \"Nearest tourist attractions\"`,
          isBot: true,
          timestamp: new Date(),
          source: 'location'
        };
        setMessages(prev => [...prev, locationMessage]);
      } catch (error) {
        console.error('Error getting location name:', error);
      }
    } else {
      // Request location permission
      const success = await requestLocation();
      if (success && position) {
        try {
          const locationName = await getCurrentLocationName(position);
          const successMessage: ChatMessage = {
            id: `location-success-${Date.now()}`,
            content: `✅ **Location enabled!** 📍\n\nCurrent location: ${locationName}\n\nI can now help you with:\n• Nearby attractions and places\n• Distance calculations from your location\n• Local travel recommendations\n\nWhat would you like to explore?`,
            isBot: true,
            timestamp: new Date(),
            source: 'location'
          };
          setMessages(prev => [...prev, successMessage]);
        } catch (error) {
          console.error('Error getting location name:', error);
        }
      } else if (locationError) {
        const errorMessage: ChatMessage = {
          id: `location-error-${Date.now()}`,
          content: `❌ **Location Error**\n\n${locationError}\n\n💡 **To enable location:**\n1. Click the location icon 📍 in your browser address bar\n2. Select \"Allow\" for location access\n3. Click the location button again\n\nDon\'t worry - I can still help with travel questions using place names!`,
          isBot: true,
          timestamp: new Date(),
          source: 'location_error'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
    setSessionId("");
    setTimeout(() => {
      const welcomeMessage: ChatMessage = {
        id: "welcome-new",
        content: "Johar Jharkhand! 👋 I'm ready for a fresh conversation. What would you like to talk about?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }, 100);
  };


  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={index} className="font-semibold text-foreground mb-1 break-words whitespace-normal">
            {line.slice(2, -2)}
          </div>
        );
      }
      return line ? (
        <div key={index} className="text-muted-foreground mb-1 break-words whitespace-normal">
          {line}
        </div>
      ) : (
        <div key={index} className="mb-2" />
      );
    });
  };

  const quickSuggestions = position ? [
    "Places near me",
    "Distance to Ranchi from here", 
    "Tourist spots nearby",
    "Best waterfalls to visit",
    "Who is power star Pawan Singh?",
    "Transport options near me"
  ] : [
    "Distance Ranchi to Deoghar",
    "Tourist spots in Jharkhand",
    "Festivals in Jharkhand",
    "Best waterfalls to visit",
    "Who is power star Pawan Singh?",
    "CM of Jharkhand"
  ];

  const handleSuggestionClick = async (suggestion: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: suggestion,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(suggestion);
      
      // Validate response structure
      if (!aiResponse || typeof aiResponse !== 'object') {
        throw new Error('Invalid response format received');
      }
      
      // Update session ID if we got a new one
      if (aiResponse.sessionId && aiResponse.sessionId !== sessionId) {
        setSessionId(aiResponse.sessionId);
      }
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: aiResponse.content || getFallbackResponse(suggestion),
        isBot: true,
        timestamp: new Date(),
        source: aiResponse.source || 'fallback',
        hasLocalData: aiResponse.hasLocalData || false
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting suggestion response:', error);
      
      // Provide helpful fallback response
      const errorMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: getFallbackResponse(suggestion),
        isBot: true,
        timestamp: new Date(),
        source: 'fallback',
        hasLocalData: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Card className={`fixed bottom-4 right-4 w-[380px] max-w-[calc(100vw-2rem)] shadow-2xl border-border bg-background z-50 transition-all duration-300 overflow-hidden ${
      isMinimized ? "h-12" : "h-[580px] max-h-[85vh]"
    }`}>
      {/* Header */}
      <CardHeader className="px-2 py-1 border-b border-border bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between min-w-0">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className="w-7 h-7 bg-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm font-semibold truncate leading-tight">
                Travel Assistant
              </CardTitle>
              <div className="flex items-center space-x-1.5 mt-0">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="text-xs opacity-90 font-medium leading-tight">AI • Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-0.5 ml-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLocationRequest()}
              className={`text-primary-foreground hover:bg-primary-foreground/20 w-7 h-7 p-0 rounded-md transition-colors ${
                position ? 'bg-green-500/20' : ''
              }`}
              title={position ? 'Location enabled' : 'Enable location for better recommendations'}
              disabled={locationLoading}
            >
              <MapPin className={`h-3 w-3 ${
                locationLoading ? 'animate-pulse' : ''
              } ${
                position ? 'text-green-300' : ''
              }`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearConversation}
              className="text-primary-foreground hover:bg-primary-foreground/20 w-7 h-7 p-0 rounded-md transition-colors"
              title="Clear conversation"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-primary-foreground hover:bg-primary-foreground/20 w-7 h-7 p-0 rounded-md transition-colors"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-primary-foreground hover:bg-primary-foreground/20 w-7 h-7 p-0 rounded-md transition-colors"
              title="Close chat"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(100%-46px)] overflow-hidden">
          {/* Messages Area */}
          <ScrollArea className="flex-1 px-2 pt-1 pb-2 overflow-x-hidden">
            <div className="space-y-2 overflow-x-hidden">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex items-start space-x-1.5 max-w-[85%] min-w-0 ${
                      message.isBot ? "flex-row" : "flex-row-reverse space-x-reverse"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isBot
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.isBot ? (
                        <Bot className="h-3.5 w-3.5" />
                      ) : (
                        <User className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-2 min-w-0 flex-1 word-wrap ${
                        message.isBot
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                      style={{ wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}
                    >
                      <div className="text-sm overflow-hidden break-words whitespace-normal">
                        {message.isBot ? (
                          <div className="overflow-hidden break-words whitespace-normal">{formatMessageContent(message.content)}</div>
                        ) : (
                          <div className="overflow-hidden break-words whitespace-normal">{message.content}</div>
                        )}
                      </div>
                      
                      
                      <div
                        className={`text-xs mt-1 opacity-70 ${
                          message.isBot ? "text-muted-foreground" : "text-primary-foreground/70"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-1.5">
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="bg-muted rounded-lg p-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="px-2 py-1.5 border-t border-border">
              <div className="mb-1 text-xs text-muted-foreground font-medium">Try asking:</div>
              <div className="flex flex-wrap gap-1">
                {quickSuggestions.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer text-xs px-2 py-0.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-2 border-t border-border">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                placeholder="Ask anything - tourism, distances, general questions..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center mt-1">
              <span className="text-xs text-muted-foreground">
                Press Enter to send • Ask about tourism, distances, or any topic!
              </span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
