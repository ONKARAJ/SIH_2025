// Simple in-memory conversation storage (for production, use Redis or database)
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ConversationSession {
  sessionId: string;
  messages: ChatMessage[];
  lastActivity: number;
  context?: {
    userInterests?: string[];
    lastTopic?: string;
    preferredLocations?: string[];
  };
}

// In-memory storage (use Redis or database for production)
const conversationStore = new Map<string, ConversationSession>();

// Session cleanup interval (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;
const MAX_MESSAGES_PER_SESSION = 20;

export class ConversationMemory {
  static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getSession(sessionId: string): ConversationSession | null {
    const session = conversationStore.get(sessionId);
    if (!session) return null;

    // Check if session has expired
    if (Date.now() - session.lastActivity > SESSION_TIMEOUT) {
      conversationStore.delete(sessionId);
      return null;
    }

    return session;
  }

  static createSession(sessionId: string): ConversationSession {
    const session: ConversationSession = {
      sessionId,
      messages: [],
      lastActivity: Date.now(),
      context: {
        userInterests: [],
        preferredLocations: []
      }
    };

    conversationStore.set(sessionId, session);
    return session;
  }

  static addMessage(sessionId: string, message: ChatMessage): void {
    let session = this.getSession(sessionId);
    if (!session) {
      session = this.createSession(sessionId);
    }

    session.messages.push({
      ...message,
      timestamp: Date.now()
    });

    // Keep only the last N messages to prevent memory bloat
    if (session.messages.length > MAX_MESSAGES_PER_SESSION) {
      session.messages = session.messages.slice(-MAX_MESSAGES_PER_SESSION);
    }

    session.lastActivity = Date.now();

    // Update context based on message content
    this.updateContext(session, message);
  }

  static getConversationHistory(sessionId: string, maxMessages?: number): ChatMessage[] {
    const session = this.getSession(sessionId);
    if (!session) return [];

    const messages = session.messages;
    if (maxMessages && maxMessages > 0) {
      return messages.slice(-maxMessages);
    }

    return messages;
  }

  static getContextualMessages(sessionId: string): ChatMessage[] {
    const history = this.getConversationHistory(sessionId, 10); // Last 10 messages
    
    // Filter out system messages from history (they'll be added fresh each time)
    const contextMessages = history.filter(msg => msg.role !== 'system');
    
    // Keep the conversation flow but limit to essential context
    if (contextMessages.length > 6) {
      // Keep first and last few messages to maintain context
      return [
        ...contextMessages.slice(0, 2),
        ...contextMessages.slice(-4)
      ];
    }

    return contextMessages;
  }

  static updateContext(session: ConversationSession, message: ChatMessage): void {
    if (message.role !== 'user') return;

    const content = message.content.toLowerCase();
    
    // Extract interests
    const tourismKeywords = ['waterfall', 'temple', 'park', 'hill station', 'wildlife', 'trekking', 'photography'];
    const locationKeywords = ['ranchi', 'jamshedpur', 'deoghar', 'netarhat', 'hazaribagh', 'giridih'];

    // Update user interests
    tourismKeywords.forEach(keyword => {
      if (content.includes(keyword) && !session.context!.userInterests!.includes(keyword)) {
        session.context!.userInterests!.push(keyword);
      }
    });

    // Update preferred locations
    locationKeywords.forEach(location => {
      if (content.includes(location) && !session.context!.preferredLocations!.includes(location)) {
        session.context!.preferredLocations!.push(location);
      }
    });

    // Keep lists manageable
    if (session.context!.userInterests!.length > 5) {
      session.context!.userInterests = session.context!.userInterests!.slice(-5);
    }
    if (session.context!.preferredLocations!.length > 3) {
      session.context!.preferredLocations = session.context!.preferredLocations!.slice(-3);
    }

    // Update last topic
    if (content.includes('waterfall')) session.context!.lastTopic = 'waterfalls';
    else if (content.includes('temple')) session.context!.lastTopic = 'temples';
    else if (content.includes('park')) session.context!.lastTopic = 'parks';
    else if (content.includes('wildlife')) session.context!.lastTopic = 'wildlife';
  }

  static getContextSummary(sessionId: string): string {
    const session = this.getSession(sessionId);
    if (!session || !session.context) return '';

    let summary = '';
    
    if (session.context.userInterests && session.context.userInterests.length > 0) {
      summary += `User has shown interest in: ${session.context.userInterests.join(', ')}. `;
    }

    if (session.context.preferredLocations && session.context.preferredLocations.length > 0) {
      summary += `User has asked about: ${session.context.preferredLocations.join(', ')}. `;
    }

    if (session.context.lastTopic) {
      summary += `Recent topic: ${session.context.lastTopic}. `;
    }

    return summary;
  }

  static clearSession(sessionId: string): void {
    conversationStore.delete(sessionId);
  }

  // Cleanup expired sessions (call periodically)
  static cleanupExpiredSessions(): void {
    const now = Date.now();
    for (const [sessionId, session] of conversationStore.entries()) {
      if (now - session.lastActivity > SESSION_TIMEOUT) {
        conversationStore.delete(sessionId);
      }
    }
  }

  // Get active session count (for monitoring)
  static getActiveSessionCount(): number {
    return conversationStore.size;
  }

  // Format conversation for LLM context
  static formatConversationForLLM(sessionId: string): string {
    const history = this.getContextualMessages(sessionId);
    const contextSummary = this.getContextSummary(sessionId);

    let formatted = '';
    
    if (contextSummary) {
      formatted += `Previous conversation context: ${contextSummary}\n\n`;
    }

    if (history.length > 0) {
      formatted += 'Recent conversation:\n';
      history.forEach((msg, index) => {
        const role = msg.role === 'user' ? 'User' : 'Assistant';
        formatted += `${role}: ${msg.content}\n`;
      });
    }

    return formatted;
  }
}

// Auto-cleanup function that runs every 15 minutes
setInterval(() => {
  ConversationMemory.cleanupExpiredSessions();
}, 15 * 60 * 1000);