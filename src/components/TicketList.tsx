
import { MessageCircle, Mail, Link, Wrench } from 'lucide-react';
import { Ticket } from '../types';

interface TicketListProps {
  tickets: Ticket[];
  compact?: boolean;
  onSelectTicket?: (ticket: Ticket) => void;
  selectedTicket?: Ticket | null;
  showAssignee?: boolean;
}

const sourceIcons = {
  chatbot: MessageCircle,
  email: Mail,
  glpi: Link,
  solman: Wrench
};

const priorityColors = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-indigo-100 text-indigo-800',
  resolved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

function TicketList({ tickets, compact = false, onSelectTicket, selectedTicket, showAssignee = false }: TicketListProps) {
  if (compact) {
    return (
      <div className="space-y-3">
        {tickets.map((ticket) => {
          const SourceIcon = sourceIcons[ticket.source];
          return (
            <div
              key={ticket.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedTicket?.id === ticket.id
                  ? 'border-primary bg-primary-light'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onSelectTicket?.(ticket)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <SourceIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate mt-1">
                      {ticket.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </span>
                  <span className="text-xs text-gray-500">{Math.round(ticket.confidence * 100)}%</span>
                </div>
              </div>
              {showAssignee && ticket.assignee && (
                <div className="mt-2 text-xs text-gray-600">
                  Assigned to: {ticket.assignee}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ticket
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Confidence
            </th>
            {showAssignee && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map((ticket) => {
            const SourceIcon = sourceIcons[ticket.source];
            return (
              <tr
                key={ticket.id}
                className={`cursor-pointer transition-colors ${
                  selectedTicket?.id === ticket.id ? 'bg-primary-light' : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelectTicket?.(ticket)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <SourceIcon className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                      <div className="text-sm text-gray-500">{ticket.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{ticket.employeeName}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className={`h-2 rounded-full ${
                          ticket.confidence >= 0.8 ? 'bg-green-500' :
                          ticket.confidence >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${ticket.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{Math.round(ticket.confidence * 100)}%</span>
                  </div>
                </td>
                {showAssignee && (
                  <td className="px-4 py-3 text-sm text-gray-900">{ticket.assignee || 'Unassigned'}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;
