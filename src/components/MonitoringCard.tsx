
import { Activity, Clock, Users, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const metrics = [
  {
    label: 'Tickets/Hour',
    value: '12.4',
    change: '+2.1',
    trend: 'up',
    color: 'text-blue-600',
    icon: Activity
  },
  {
    label: 'Auto-resolve %',
    value: '68%',
    change: '+5%',
    trend: 'up',
    color: 'text-green-600',
    icon: Users
  },
  {
    label: 'Queue Length',
    value: '23',
    change: '-4',
    trend: 'down',
    color: 'text-orange-600',
    icon: Clock
  },
  {
    label: 'SLA Breaches',
    value: '2',
    change: '+1',
    trend: 'up',
    color: 'text-red-600',
    icon: AlertTriangle
  }
];

function MonitoringCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">System Monitoring</h2>
        <div className="text-xs text-gray-500">Real-time</div>
      </div>

      <div className="space-y-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor = metric.trend === 'up' 
            ? metric.label === 'SLA Breaches' ? 'text-red-500' : 'text-green-500'
            : metric.label === 'SLA Breaches' ? 'text-green-500' : 'text-red-500';

          return (
            <div key={metric.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                    <div className={`flex items-center space-x-1 ${trendColor}`}>
                      <TrendIcon className="w-3 h-3" />
                      <span className="text-xs font-medium">{metric.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini Chart Placeholder */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Ticket Volume (24h)</div>
        <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-center space-x-1 p-2">
          {Array.from({ length: 24 }, (_, i) => (
            <div
              key={i}
              className="bg-primary rounded-t flex-1"
              style={{
                height: `${Math.random() * 80 + 20}%`,
                opacity: 0.7
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MonitoringCard;