
import { User, Clock, ArrowUp, CheckCircle, Key, Info } from 'lucide-react';
import { Ticket } from '../types';

interface TicketDetailPanelProps {
  ticket: Ticket;
}

const priorityColors = {
  critical: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const kbSuggestions = [
  {
    id: 'KB-123',
    title: 'VPN Connection Troubleshooting Guide',
    relevance: 0.94
  },
  {
    id: 'KB-089',
    title: 'Network Connectivity Issues',
    relevance: 0.78
  },
  {
    id: 'KB-156',
    title: 'Common Windows Network Problems',
    relevance: 0.65
  }
];

function TicketDetailPanel({ ticket }: TicketDetailPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{ticket.id}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
            <ArrowUp className="w-3 h-3 mr-1" />
            {ticket.priority}
          </span>
        </div>
        
        <h4 className="text-base font-medium text-gray-900 mb-3">{ticket.subject}</h4>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Employee:</span>
            <span className="text-gray-900">{ticket.employeeName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Created:</span>
            <span className="text-gray-900">{new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm">
            <option value="">{ticket.assignee || 'Select assignee...'}</option>
            <option value="mike-chen">Mike Chen</option>
            <option value="lisa-park">Lisa Park</option>
            <option value="alex-kim">Alex Kim</option>
            <option value="sarah-wilson">Sarah Wilson</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-gray-900 mb-2">Description</h5>
        <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
      </div>

      {/* Attachments */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-gray-900 mb-3">Attachments</h5>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
              <span className="text-xs font-medium text-blue-600">PNG</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">error-screenshot.png</p>
              <p className="text-xs text-gray-500">234 KB</p>
            </div>
          </div>
        </div>
      </div>

      {/* KB Suggestions */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-gray-900 mb-3">Knowledge Base Suggestions</h5>
        <div className="space-y-2">
          {kbSuggestions.map((kb) => (
            <div key={kb.id} className="p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <h6 className="text-sm font-medium text-gray-900">{kb.title}</h6>
                <span className="text-xs text-gray-500">{Math.round(kb.relevance * 100)}%</span>
              </div>
              <p className="text-xs text-gray-600">{kb.id}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex flex-col space-y-2">
          <button className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors">
            <Key className="w-4 h-4" />
            <span>Run Auto-Fix</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Info className="w-4 h-4" />
            <span>Request Info</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-success text-white rounded-lg hover:bg-success-dark transition-colors">
            <CheckCircle className="w-4 h-4" />
            <span>Resolve</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailPanel;