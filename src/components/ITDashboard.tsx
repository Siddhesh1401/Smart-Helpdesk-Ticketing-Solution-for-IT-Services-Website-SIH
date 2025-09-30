import { useState } from 'react';
import { Search, Filter, AlertTriangle, Settings } from 'lucide-react';
import TicketList from './TicketList';
import TicketDetailPanel from './TicketDetailPanel';
import { Ticket } from '../types';

const mockITTickets: Ticket[] = [
  {
    id: 'TCK-2025-1020',
    subject: 'Email Server Down',
    description: 'Exchange server not responding to SMTP requests',
    priority: 'critical',
    status: 'open',
    source: 'email',
    employeeName: 'Sarah Johnson',
    confidence: 0.89,
    assignee: 'Mike Chen',
    createdAt: '2025-01-20T15:30:00Z',
    updatedAt: '2025-01-20T15:30:00Z'
  },
  {
    id: 'TCK-2025-1019',
    subject: 'Software Installation Request',
    description: 'Need Adobe Creative Suite installed on workstation',
    priority: 'medium',
    status: 'in-progress',
    source: 'glpi',
    employeeName: 'David Wilson',
    confidence: 0.76,
    assignee: 'Lisa Park',
    createdAt: '2025-01-20T14:15:00Z',
    updatedAt: '2025-01-20T14:45:00Z'
  },
  {
    id: 'TCK-2025-1018',
    subject: 'Network Connectivity Issues',
    description: 'Intermittent connection drops in Building A',
    priority: 'high',
    status: 'open',
    source: 'solman',
    employeeName: 'Emily Davis',
    confidence: 0.43,
    createdAt: '2025-01-20T13:20:00Z',
    updatedAt: '2025-01-20T13:25:00Z'
  },
  {
    id: 'TCK-2025-1017',
    subject: 'Password Reset',
    description: 'User locked out of domain account',
    priority: 'medium',
    status: 'resolved',
    source: 'chatbot',
    employeeName: 'Robert Brown',
    confidence: 0.94,
    assignee: 'Alex Kim',
    createdAt: '2025-01-20T12:30:00Z',
    updatedAt: '2025-01-20T12:35:00Z'
  }
];

function ITDashboard() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(mockITTickets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTickets = mockITTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = filterSource === 'all' || ticket.source === filterSource;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    
    return matchesSearch && matchesSource && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header with Buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IT Support Dashboard</h1>
          <p className="text-gray-600">Manage and resolve support tickets efficiently</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-sm">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Left Panel - Filters and Queue */}
      <div className="xl:col-span-2 space-y-4">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-4 h-4" />
              
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Sources</option>
                <option value="chatbot">Chatbot</option>
                <option value="email">Email</option>
                <option value="glpi">GLPI</option>
                <option value="solman">Solman</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Low Confidence Warning */}
        {filteredTickets.some(t => t.confidence < 0.5) && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <p className="text-sm font-medium text-amber-800">
                Model confidence &lt;0.5 — manual triage recommended
              </p>
            </div>
          </div>
        )}

        {/* Ticket Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Ticket Queue</h2>
            <span className="text-sm text-gray-500">{filteredTickets.length} tickets</span>
          </div>
          <TicketList 
            tickets={filteredTickets} 
            onSelectTicket={setSelectedTicket}
            selectedTicket={selectedTicket}
            showAssignee={true}
          />
        </div>
      </div>

      {/* Right Panel - Ticket Detail */}
      <div className="xl:col-span-1">
        {selectedTicket && <TicketDetailPanel ticket={selectedTicket} />}
      </div>
      </div>
    </div>
  );
}

export default ITDashboard;