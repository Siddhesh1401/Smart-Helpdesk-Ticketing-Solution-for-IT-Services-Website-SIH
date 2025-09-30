
import { MessageCircle, Mail, Link, Wrench, TrendingUp } from 'lucide-react';

const sources = [
  {
    id: 'chatbot',
    name: 'Chatbot',
    icon: MessageCircle,
    count: 156,
    status: 'connected',
    trend: [12, 18, 15, 22, 19, 28, 24]
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    count: 89,
    status: 'connected',
    trend: [8, 12, 10, 15, 13, 18, 16]
  },
  {
    id: 'glpi',
    name: 'GLPI',
    icon: Link,
    count: 34,
    status: 'delayed',
    trend: [5, 8, 6, 9, 7, 12, 10]
  },
  {
    id: 'solman',
    name: 'Solman',
    icon: Wrench,
    count: 23,
    status: 'offline',
    trend: [3, 6, 4, 7, 5, 8, 6]
  }
];

const statusColors = {
  connected: 'bg-green-100 text-green-800',
  delayed: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-red-100 text-red-800'
};

const statusDots = {
  connected: 'bg-green-500',
  delayed: 'bg-yellow-500',
  offline: 'bg-red-500'
};

function SourcesWidget() {
  const renderSparkline = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <svg width="60" height="20" className="inline-block">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          points={data
            .map((value, index) => {
              const x = (index / (data.length - 1)) * 55;
              const y = 18 - ((value - min) / range) * 16;
              return `${x},${y}`;
            })
            .join(' ')}
        />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Ticket Sources</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          <span>Last 7 days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sources.map((source) => {
          const Icon = source.icon;
          return (
            <div key={source.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{source.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className={`w-2 h-2 rounded-full ${statusDots[source.status as keyof typeof statusDots]}`}></div>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${statusColors[source.status as keyof typeof statusColors]}`}>
                        {source.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{source.count}</div>
                  <div className="text-xs text-gray-500">tickets today</div>
                </div>
                <div className="text-gray-400">
                  {renderSparkline(source.trend)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SourcesWidget;