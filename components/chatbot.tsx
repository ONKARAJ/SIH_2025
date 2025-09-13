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
  HelpCircle,
  RotateCcw,
} from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        content: "Hello! 👋 I'm your AI assistant for Jharkhand Tourism. I can help you with:\n\n🏞️ **Tourism** - Places to visit, travel tips, best times\n🎭 **Culture** - Festivals, tribal heritage, traditions\n📰 **Current Affairs** - Latest news, government updates\n💬 **General Chat** - Ask me anything!\n\nWhat would you like to explore today?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Government questions
    if (message.includes('cm') || message.includes('chief minister') || (message.includes('hemant') && message.includes('soren'))) {
      return "**Hemant Soren** is the current Chief Minister of Jharkhand. He belongs to the **Jharkhand Mukti Morcha (JMM)** party and has been serving as CM since 2019. He's known for his focus on tribal rights, employment generation, and welfare schemes.";
    }
    
    if (message.includes('governor') || (message.includes('c.p.') && message.includes('radhakrishnan'))) {
      return "**C.P. Radhakrishnan** is the current Governor of Jharkhand. He took office in July 2024 and has served in various administrative and political roles.";
    }
    
    // Tourism
    if (message.includes('waterfall') || message.includes('falls')) {
      return "Jharkhand has stunning waterfalls! **Top waterfalls**: Hundru Falls (98m), Dassam Falls (44m - 'Niagara of Jharkhand'), Lodh Falls (143m - highest), and Jonha Falls (43m). Best time to visit is during or after monsoon (July-February).";
    }
    
    if (message.includes('festival') || message.includes('culture')) {
      return "Jharkhand's tribal festivals are incredible! **Major festivals**: **Sarhul** (Spring - nature worship), **Sohrai** (Harvest - cattle celebration), **Tusu** (Winter - goddess worship), and **Karma** (Monsoon - youth blessings). Each showcases the deep connection between tribal communities and nature.";
    }
    
    if (message.includes('place') || message.includes('visit') || message.includes('destination')) {
      return "Top Jharkhand destinations: **Hundru Falls** (spectacular waterfall), **Betla National Park** (tigers & elephants), **Netarhat** (hill station), **Deoghar** (Baidyanath Jyotirlinga), **Parasnath Hill** (highest peak), and **Ranchi** (capital city). What type of experience interests you?";
    }
    
    // General knowledge
    if (message.includes('capital')) {
      return "**Ranchi** is the capital of Jharkhand. It's known for its pleasant climate, educational institutions (IIT, NIT), industries, and as MS Dhoni's hometown. Major attractions include Jagannath Temple, Rock Garden, and Tagore Hill.";
    }
    
    if (message.includes('formation') || (message.includes('when') && message.includes('formed'))) {
      return "Jharkhand was formed on **November 15, 2000**, carved out from Bihar to become India's 28th state. It was created to address the developmental needs of tribal populations and harness the region's rich mineral resources.";
    }
    
    // Science & technology
    if (message.includes('ai') || message.includes('artificial intelligence')) {
      return "Artificial Intelligence (AI) is technology that enables machines to perform tasks that typically require human intelligence - like learning, reasoning, and problem-solving. AI is used in healthcare, education, transportation, and even chatbots like me! It's transforming how we work and live.";
    }
    
    if (message.includes('science') || message.includes('physics') || message.includes('chemistry')) {
      return "I'd love to discuss science! Whether it's physics (how the universe works), chemistry (matter and reactions), biology (life sciences), or environmental science - I can help explain concepts, discoveries, and how things work. What scientific topic interests you?";
    }
    
    // Weather
    if (message.includes('weather') || message.includes('climate')) {
      return "Jharkhand has a tropical climate: **Summer** (April-June) - hot and dry, **Monsoon** (July-September) - heavy rainfall, **Winter** (October-March) - pleasant and cool. The best time to visit is October-March for most activities, though waterfalls are spectacular during monsoons!";
    }
    
    // General greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 I'm here to help with any questions you have. I'm particularly knowledgeable about Jharkhand - its tourism, culture, government, and history - but I can also discuss science, technology, current affairs, and general topics. What would you like to talk about?";
    }
    
    // Default response
    return `That's an interesting question! I can help you with information about Jharkhand tourism (waterfalls, festivals, places to visit), current affairs (government, politics), general knowledge (science, technology), and much more. Could you be more specific about what you'd like to know?`;
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

    // Simulate response delay
    setTimeout(() => {
      const botResponse = getResponse(userMessage.content);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
    setTimeout(() => {
      const welcomeMessage: ChatMessage = {
        id: "welcome-new",
        content: "Hello! 👋 I'm ready for a fresh conversation. What would you like to talk about?",
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

  const quickSuggestions = [
    "Who is the CM of Jharkhand?",
    "Best waterfalls to visit",
    "Tell me about Sarhul festival",
    "What's the capital of Jharkhand?",
    "Explain artificial intelligence",
    "Weather in Jharkhand"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: suggestion,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getResponse(suggestion);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <Card className={`fixed bottom-4 right-4 w-96 max-w-[90vw] shadow-2xl border-border bg-background z-50 transition-all duration-300 overflow-hidden ${
      isMinimized ? "h-16" : "h-[600px] max-h-[80vh]"
    }`}>
      {/* Header */}
      <CardHeader className="p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">Jharkhand Tourism Assistant</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs opacity-90">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearConversation}
              className="text-primary-foreground hover:bg-primary-foreground/20 w-8 h-8 p-0"
              title="Clear conversation"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-primary-foreground hover:bg-primary-foreground/20 w-8 h-8 p-0"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-primary-foreground hover:bg-primary-foreground/20 w-8 h-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(100%-80px)] overflow-hidden">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 overflow-x-hidden">
            <div className="space-y-4 overflow-x-hidden">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[85%] min-w-0 ${
                      message.isBot ? "flex-row" : "flex-row-reverse space-x-reverse"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isBot
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.isBot ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 min-w-0 flex-1 word-wrap ${
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
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
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
            <div className="p-4 border-t border-border">
              <div className="mb-2 text-xs text-muted-foreground font-medium">Quick Questions:</div>
              <div className="flex flex-wrap gap-1">
                {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer text-xs px-2 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                placeholder="Ask me about Jharkhand tourism..."
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
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-muted-foreground">
                Press Enter to send
              </div>
              <div className="flex items-center space-x-1">
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Ask anything about Jharkhand - tourism, current affairs, politics, culture!
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
