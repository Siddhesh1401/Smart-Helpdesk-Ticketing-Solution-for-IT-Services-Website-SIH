import { useState } from 'react';
import { X, TrendingUp, Calendar, Clock, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react';
import { Ticket } from '../types';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: Ticket[];
}

function AnalyticsModal({ isOpen, onClose, tickets }: AnalyticsModalProps) {
  const [timeRange, setTimeRange] = useState('30d');

  if (!isOpen) return null;

  // Calculate analytics data
  const totalTickets = tickets.length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const rejectedTickets = tickets.filter(t => t.status === 'rejected').length;

  const resolutionRate = totalTickets > 0 ? ((resolvedTickets / totalTickets) * 100).toFixed(1) : '0';
  
  // Priority distribution
  const priorityStats = {
    critical: tickets.filter(t => t.priority === 'critical').length,
    high: tickets.filter(t => t.priority === 'high').length,
    medium: tickets.filter(t => t.priority === 'medium').length,
    low: tickets.filter(t => t.priority === 'low').length,
  };

  // Source distribution
  const sourceStats = {
    chatbot: tickets.filter(t => t.source === 'chatbot').length,
    email: tickets.filter(t => t.source === 'email').length,
    glpi: tickets.filter(t => t.source === 'glpi').length,
    solman: tickets.filter(t => t.source === 'solman').length,
  };

  // Average confidence score
  const avgConfidence = tickets.length > 0 
    ? (tickets.reduce((sum, t) => sum + t.confidence, 0) / tickets.length * 100).toFixed(1)
    : '0';

  const StatCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`w-8 h-8 ${color.replace('text-', 'text-').replace('-600', '-500')}`} />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                My Ticket Analytics
              </h2>
              <p className="text-sm text-gray-600 mt-1">Insights into your support ticket patterns</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="all">All time</option>
              </select>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Tickets"
              value={totalTickets}
              subtitle="All tickets created"
              icon={Calendar}
              color="text-blue-600"
            />
            <StatCard
              title="Resolved"
              value={resolvedTickets}
              subtitle={`${resolutionRate}% resolution rate`}
              icon={CheckCircle}
              color="text-green-600"
            />
            <StatCard
              title="In Progress"
              value={inProgressTickets}
              subtitle="Being worked on"
              icon={Clock}
              color="text-yellow-600"
            />
            <StatCard
              title="Avg Confidence"
              value={`${avgConfidence}%`}
              subtitle="AI classification accuracy"
              icon={TrendingUp}
              color="text-purple-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Status Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Resolved</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">{resolvedTickets}</span>
                    <span className="text-xs text-gray-500 ml-1">({resolutionRate}%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">In Progress</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">{inProgressTickets}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({totalTickets > 0 ? ((inProgressTickets / totalTickets) * 100).toFixed(1) : '0'}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Open</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">{openTickets}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({totalTickets > 0 ? ((openTickets / totalTickets) * 100).toFixed(1) : '0'}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Rejected</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">{rejectedTickets}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({totalTickets > 0 ? ((rejectedTickets / totalTickets) * 100).toFixed(1) : '0'}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-700">Critical</span>
                  </div>
                  <span className="font-semibold text-gray-900">{priorityStats.critical}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-700">High</span>
                  </div>
                  <span className="font-semibold text-gray-900">{priorityStats.high}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">Medium</span>
                  </div>
                  <span className="font-semibold text-gray-900">{priorityStats.medium}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Low</span>
                  </div>
                  <span className="font-semibold text-gray-900">{priorityStats.low}</span>
                </div>
              </div>
            </div>

            {/* Source Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Sources</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Chatbot</span>
                  </div>
                  <span className="font-semibold text-gray-900">{sourceStats.chatbot}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Email</span>
                  </div>
                  <span className="font-semibold text-gray-900">{sourceStats.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">GLPI</span>
                  </div>
                  <span className="font-semibold text-gray-900">{sourceStats.glpi}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Solman</span>
                  </div>
                  <span className="font-semibold text-gray-900">{sourceStats.solman}</span>
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-green-800 mb-1">✅ Good Resolution Rate</h4>
                  <p className="text-xs text-green-700">
                    Your tickets have a {resolutionRate}% resolution rate, which is excellent!
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">🤖 AI Confidence</h4>
                  <p className="text-xs text-blue-700">
                    Average AI classification confidence is {avgConfidence}%, helping with faster resolution.
                  </p>
                </div>
                {priorityStats.critical > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-red-800 mb-1">⚠️ Critical Tickets</h4>
                    <p className="text-xs text-red-700">
                      You have {priorityStats.critical} critical ticket(s). Please follow up promptly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsModal;