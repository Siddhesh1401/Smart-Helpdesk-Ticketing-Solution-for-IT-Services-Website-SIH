import { useState } from 'react';
import { Plus, BarChart3 } from 'lucide-react';
import ChatbotWidget from './ChatbotWidget';
import TicketList from './TicketList';
import NotificationToast from './NotificationToast';
import CreateTicketModal from './CreateTicketModal';
import AnalyticsModal from './AnalyticsModal';
import { Ticket } from '../types';

const mockUserTickets: Ticket[] = [
  {
    id: 'TCK-2025-1010',
    subject: 'VPN Connection Issues',
    description: 'Cannot connect to company VPN from home',
    priority: 'high',
    status: 'resolved',
    source: 'chatbot',
    employeeName: 'John Doe',
    confidence: 0.87,
    createdAt: '2025-01-20T10:30:00Z',
    updatedAt: '2025-01-20T11:15:00Z'
  },
  {
    id: 'TCK-2025-1015',
    subject: 'Password Reset Request',
    description: 'Need to reset domain password',
    priority: 'medium',
    status: 'in-progress',
    source: 'email',
    employeeName: 'John Doe',
    confidence: 0.92,
    createdAt: '2025-01-20T14:20:00Z',
    updatedAt: '2025-01-20T14:25:00Z'
  },
  {
    id: 'TCK-2025-1099',
    subject: 'Printer Configuration',
    description: 'Incomplete request - missing printer model',
    priority: 'low',
    status: 'rejected',
    source: 'chatbot',
    employeeName: 'John Doe',
    confidence: 0.23,
    createdAt: '2025-01-20T09:45:00Z',
    updatedAt: '2025-01-20T09:47:00Z'
  }
];

function EmployeeDashboard() {
  const [showNotification, setShowNotification] = useState(true);
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [tickets, setTickets] = useState(mockUserTickets);

  const handleCreateTicket = (ticketData: { subject: string; description: string; priority: string }) => {
    const newTicket: Ticket = {
      id: `TCK-2025-${Math.floor(Math.random() * 9000) + 1000}`,
      subject: ticketData.subject,
      description: ticketData.description,
      priority: ticketData.priority as 'low' | 'medium' | 'high' | 'critical',
      status: 'open',
      source: 'email',
      employeeName: 'John Doe',
      confidence: 0.95,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTickets(prev => [newTicket, ...prev]);
    setShowNotification(false);
    
    // Show success notification
    setTimeout(() => {
      setShowNotification(true);
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header with Buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="text-gray-600">Manage your support tickets and get help</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAnalyticsOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-sm"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setIsCreateTicketOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Raise New Ticket
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chatbot Widget */}
        <div className="lg:col-span-1">
          <ChatbotWidget />
        </div>

        {/* My Tickets */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Tickets</h2>
            <TicketList tickets={tickets} compact={true} />
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateTicketOpen}
        onClose={() => setIsCreateTicketOpen(false)}
        onSubmit={handleCreateTicket}
      />

      {/* Analytics Modal */}
      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        tickets={tickets}
      />

      {/* Notification Toast */}
      {showNotification && (
        <NotificationToast
          type="success"
          message={tickets.length > mockUserTickets.length ? 
            `New ticket ${tickets[0].id} has been created successfully!` : 
            "Ticket TCK-2025-1010 auto-resolved with KB #123"
          }
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default EmployeeDashboard;