import { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Users, CheckCircle, AlertTriangle, Calendar, Download } from 'lucide-react';

interface ReportingDashboardProps {
  userRole: 'admin' | 'it';
}

function ReportingDashboard({ userRole }: ReportingDashboardProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('tickets');

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ];

  const metrics = [
    { id: 'tickets', label: 'Ticket Volume', icon: BarChart3, value: '1,234', change: '+12%', color: 'text-blue-600' },
    { id: 'resolution', label: 'Resolution Rate', icon: CheckCircle, value: '87%', change: '+5%', color: 'text-green-600' },
    { id: 'response', label: 'Avg Response Time', icon: Clock, value: '2.4h', change: '-15%', color: 'text-orange-600' },
    { id: 'satisfaction', label: 'Customer Satisfaction', icon: Users, value: '4.2/5', change: '+0.3', color: 'text-purple-600' }
  ];

  const ticketsBySource = [
    { source: 'Chatbot', count: 156, percentage: 45, trend: 'up' },
    { source: 'Email', count: 89, percentage: 26, trend: 'stable' },
    { source: 'GLPI', count: 67, percentage: 19, trend: 'down' },
    { source: 'Solman', count: 34, percentage: 10, trend: 'up' }
  ];

  const ticketsByPriority = [
    { priority: 'Critical', count: 12, color: 'bg-red-500' },
    { priority: 'High', count: 45, color: 'bg-orange-500' },
    { priority: 'Medium', count: 123, color: 'bg-yellow-500' },
    { priority: 'Low', count: 89, color: 'bg-green-500' }
  ];

  const aiPerformance = [
    { model: 'Classification Model', accuracy: 94.2, lastTrained: '2025-09-20' },
    { model: 'Routing Engine', accuracy: 89.7, lastTrained: '2025-09-22' },
    { model: 'Priority Classifier', accuracy: 91.3, lastTrained: '2025-09-21' },
    { model: 'Sentiment Analysis', accuracy: 86.5, lastTrained: '2025-09-19' }
  ];

  const exportReport = () => {
    // Simulate report export
    alert(`Exporting ${selectedMetric} report for ${timeRange}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Analytics & Reporting</h2>
          <p className="text-gray-600 mt-1">Performance insights and system metrics</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.change.startsWith('+');
          const changeColor = isPositive 
            ? (metric.id === 'response' ? 'text-red-500' : 'text-green-500')
            : (metric.id === 'response' ? 'text-green-500' : 'text-red-500');
          
          return (
            <div
              key={metric.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transition-all ${
                selectedMetric === metric.id ? 'ring-2 ring-primary border-primary' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${changeColor}`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{metric.change}</span>
                </div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tickets by Source */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tickets by Source</h3>
          <div className="space-y-4">
            {ticketsBySource.map((item) => (
              <div key={item.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">{item.source}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                  <div className={`w-4 h-4 flex items-center justify-center ${
                    item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
          <div className="space-y-4">
            {ticketsByPriority.map((item) => (
              <div key={item.priority} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.priority}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${(item.count / 269) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Performance */}
      {userRole === 'admin' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">AI Model Performance</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Real-time monitoring</span>
            </div>
          </div>
          
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Model</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Accuracy</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Last Trained</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {aiPerformance.map((model) => (
                  <tr key={model.model} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{model.model}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              model.accuracy >= 90 ? 'bg-green-500' : 
                              model.accuracy >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${model.accuracy}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{model.accuracy}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{model.lastTrained}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportingDashboard;