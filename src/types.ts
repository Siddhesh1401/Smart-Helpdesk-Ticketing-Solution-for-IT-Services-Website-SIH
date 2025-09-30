export interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved' | 'rejected';
  source: 'chatbot' | 'email' | 'glpi' | 'solman';
  employeeName: string;
  confidence: number;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
  }>;
}

export interface KBArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  usageCount: number;
  relevance?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'it-agent' | 'admin';
  department: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: string;
}

export interface Notification {
  id: string;
  type: 'ticket-update' | 'system-alert' | 'assignment' | 'resolution';
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  userId: string;
  ticketId?: string;
  createdAt: string;
}

export interface SystemMetrics {
  ticketsPerHour: number;
  autoResolvePercent: number;
  queueLength: number;
  slaBreaches: number;
  averageResponseTime: number;
  customerSatisfaction: number;
  uptime: number;
}

export interface EmailConfig {
  id: string;
  serverHost: string;
  port: number;
  isSecure: boolean;
  username: string;
  isEnabled: boolean;
  lastSync: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  isTyping?: boolean;
  confidence?: number;
  suggestedActions?: string[];
}