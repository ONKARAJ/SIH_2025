// Inside useEffect (welcome message init)
useEffect(() => {
  if (isOpen && messages.length === 0) {
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      content: "👋 **Hi! I'm your Jharkhand Travel Assistant**\n\nI help with:\n• 📍 Distance & travel routes\n• 🎯 Tourist spots & attractions  \n• 🚌 Transport options & booking\n• 💬 General questions\n• 📍 Location-based recommendations\n\n**Try asking:**\n• \"Distance from Ranchi to Deoghar\"\n• \"Best places in Jharkhand\"\n• \"Who is power star Pawan Singh?\"\n\n📍 **Tip**: Click the location button 📍 for personalized recommendations!\n\nWhat can I help you with?",
      isBot: true,
      timestamp: new Date(),
      source: 'system'
    };
    setMessages([welcomeMessage]);
  }
}, [isOpen, messages.length]);
