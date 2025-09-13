"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Chatbot } from "./chatbot";

export function ChatbotWrapper() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isChatbotOpen && (
        <Button
          onClick={toggleChatbot}
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg hover:shadow-xl z-40 bg-primary hover:bg-primary/90"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}

      {/* Chatbot Component */}
      <Chatbot isOpen={isChatbotOpen} onToggle={toggleChatbot} />
    </>
  );
}
