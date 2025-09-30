import { useState, useEffect, useRef } from 'react';
import { Send, Bot, Shield, Wifi, Printer, AlertCircle, CheckCircle } from 'lucide-react';
import { ChatMessage } from '../types';

function ChatbotWidget() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hi! I'm HelpBot, your AI-powered support assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: 'Password Reset', icon: Shield, category: 'authentication' },
    { label: 'VPN Issue', icon: Wifi, category: 'network' },
    { label: 'Printer', icon: Printer, category: 'hardware' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): { response: string; confidence: number; suggestedActions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('password') || lowerMessage.includes('login')) {
      return {
        response: "I can help you with password issues! I've detected this is an authentication problem with 92% confidence. I can automatically reset your domain password or guide you through the self-service portal.",
        confidence: 0.92,
        suggestedActions: ['Reset Domain Password', 'Self-Service Guide', 'Contact IT Support']
      };
    }
    
    if (lowerMessage.includes('vpn') || lowerMessage.includes('network') || lowerMessage.includes('connection')) {
      return {
        response: "I've identified this as a VPN/Network connectivity issue with 87% confidence. Let me run some diagnostics and provide solutions from our knowledge base.",
        confidence: 0.87,
        suggestedActions: ['Check VPN Status', 'Network Diagnostics', 'KB Article #123']
      };
    }
    
    if (lowerMessage.includes('printer') && (lowerMessage.includes('setup') || lowerMessage.includes('install'))) {
      return {
        response: "I need more information to help with printer setup. Could you please specify the printer model and your operating system? Without these details, I'll need to reject this ticket.",
        confidence: 0.23,
        suggestedActions: ['Provide Printer Model', 'Specify OS Version', 'Contact IT']
      };
    }
    
    return {
      response: "I understand you're having an issue. Could you provide more specific details about the problem you're experiencing? This will help me classify and route your request properly.",
      confidence: 0.65,
      suggestedActions: ['More Details', 'Submit Ticket', 'Browse FAQ']
    };
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate bot processing time
    setTimeout(() => {
      const { response, confidence, suggestedActions } = generateBotResponse(message);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        confidence,
        suggestedActions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay for realism
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `I need help with: ${action.label}`,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const { response, confidence, suggestedActions } = generateBotResponse(action.label);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        confidence,
        suggestedActions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestedAction = (action: string) => {
    if (action === 'Reset Domain Password') {
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "✅ Password reset initiated! You should receive an email with instructions within 2-3 minutes. Ticket TCK-2025-1015 has been created and auto-resolved.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        confidence: 0.95
      };
      setMessages(prev => [...prev, botMessage]);
    } else if (action === 'Network Diagnostics') {
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "🔍 Running network diagnostics... Found: VPN client outdated. I've created ticket TCK-2025-1016 and assigned it to the Network Team for resolution.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        confidence: 0.89
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-96 flex flex-col">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">HelpBot</h2>
          <p className="text-sm text-gray-600">AI-powered support assistant</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              
              {/* Confidence and Actions for Bot Messages */}
              {msg.sender === 'bot' && msg.confidence && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                    {msg.confidence >= 0.8 ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-yellow-500" />
                    )}
                    <span>Confidence: {Math.round(msg.confidence * 100)}%</span>
                  </div>
                  
                  {msg.suggestedActions && (
                    <div className="space-y-1">
                      {msg.suggestedActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestedAction(action)}
                          className="block w-full text-left px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-xs opacity-70 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-600">HelpBot is typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
              disabled={isTyping}
            >
              <Icon className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 text-xs">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Describe your technical issue..."
          disabled={isTyping}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !message.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary hover:text-primary-dark transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ChatbotWidget;