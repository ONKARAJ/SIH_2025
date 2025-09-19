"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Send, MapPin, Bot, User, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  source?: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  isMinimized: boolean;
  onMinimize: () => void;
}

export function Chatbot({ isOpen, onToggle, isMinimized, onMinimize }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        content: "👋 Johar! I'm your Jharkhand Tourism Specialist\n\nI ONLY help with Jharkhand tourism:\n• 🏞️ Places to visit in Jharkhand\n• 📍 Distances within Jharkhand\n• 🎭 Jharkhand culture & festivals\n• 🚌 Travel within Jharkhand\n\nWhat would you like to know about Jharkhand?",
        isBot: true,
        timestamp: new Date(),
        source: 'system'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          sessionId: 'chatbot-session-' + Date.now() // Simple session management
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: data.message || "Sorry, I couldn't process your request right now.",
          isBot: true,
          timestamp: new Date(),
          source: data.source
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback response
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting to my AI service right now. Please try asking again in a moment!",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 pointer-events-auto max-w-[calc(100vw-2rem)] transition-all duration-300 ${
      isMinimized ? 'w-80 sm:w-96 h-16' : 'w-80 sm:w-96 h-[500px] sm:h-[600px]'
    }`}>
      <Card className={`h-full flex flex-col shadow-2xl border-0 bg-gray-50 overflow-hidden rounded-t-lg ${
        isMinimized ? 'animate-pulse hover:animate-none' : ''
      }`}>
        <CardHeader 
          className={`flex-row items-center justify-between space-y-0 py-2 px-3 sm:px-4 bg-green-600 text-white flex-shrink-0 rounded-t-lg ${
            isMinimized ? 'cursor-pointer hover:bg-green-700 transition-colors' : ''
          }`}
          onClick={isMinimized ? onMinimize : undefined}
        >
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="truncate">Jharkhand Travel Assistant</span>
            {isMinimized && <span className="text-xs opacity-75 ml-2">(Click to expand)</span>}
          </CardTitle>
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="text-white hover:bg-white/20 hover:text-white h-7 w-7 p-0 rounded-full transition-all duration-200"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="text-white hover:bg-white/20 hover:text-white h-7 w-7 p-0 rounded-full transition-all duration-200"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden border-t-0 -mt-1">
            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-3 sm:px-4 pt-0 pb-3 space-y-3 sm:space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              style={{ maxHeight: 'calc(100% - 80px)' }}
            >
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 sm:gap-3 animate-fadeIn",
                  message.isBot ? "justify-start" : "justify-end",
                  index === 0 ? "mt-1" : "" // Minimal spacing for first message only
                )}
              >
                {message.isBot && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                )}
                
                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 text-xs sm:text-sm",
                    message.isBot
                      ? "bg-white text-gray-900 shadow-sm border"
                      : "bg-green-600 text-white ml-auto"
                  )}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                  <div className={cn(
                    "text-xs mt-1 opacity-70",
                    message.isBot ? "text-gray-500" : "text-white/70"
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {!message.isBot && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 sm:gap-3 animate-pulse">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                </div>
                <div className="bg-white rounded-lg px-3 py-2 text-xs sm:text-sm shadow-sm border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t bg-white px-3 sm:px-4 py-2">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Jharkhand tourism..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="px-3 bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-2 mt-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("Best waterfalls in Jharkhand")}
                className="text-xs h-7 border-green-200 text-green-700 hover:bg-green-50"
              >
                Waterfalls
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("Jharkhand festivals")}
                className="text-xs h-7 border-green-200 text-green-700 hover:bg-green-50"
              >
                Festivals
              </Button>
            </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
