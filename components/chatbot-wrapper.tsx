"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Chatbot } from "./chatbot";

export function ChatbotWrapper() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    setIsMinimized(false); // Reset minimize state when opening/closing
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isChatbotOpen && (
        <Button
          onClick={toggleChatbot}
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg hover:shadow-xl z-40 bg-primary hover:bg-primary/90 pointer-events-auto"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}

      {/* Chatbot Component */}
      <Chatbot 
        isOpen={isChatbotOpen} 
        onToggle={toggleChatbot} 
        isMinimized={isMinimized}
        onMinimize={toggleMinimize}
      />
    </>
  );
}
