import { useState } from 'react';
import ChatbotWidget from './ChatbotWidget';
import TicketList from './TicketList';
import NotificationToast from './NotificationToast';
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chatbot Widget */}
        <div className="lg:col-span-1">
          <ChatbotWidget />
        </div>

        {/* My Tickets */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Tickets</h2>
            <TicketList tickets={mockUserTickets} compact={true} />
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <NotificationToast
          type="success"
          message="Ticket TCK-2025-1010 auto-resolved with KB #123"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default EmployeeDashboard;