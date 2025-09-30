import { Bell, X, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { Notification } from '../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}

const typeIcons = {
  'ticket-update': CheckCircle,
  'system-alert': AlertTriangle,
  'assignment': User,
  'resolution': CheckCircle
};

const typeColors = {
  'ticket-update': 'text-blue-500',
  'system-alert': 'text-red-500',
  'assignment': 'text-green-500',
  'resolution': 'text-purple-500'
};

const priorityColors = {
  'low': 'bg-gray-100 text-gray-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'high': 'bg-orange-100 text-orange-800',
  'critical': 'bg-red-100 text-red-800'
};

function NotificationPanel({ 
  isOpen, 
  onClose, 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationPanelProps) {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="px-6 py-3 border-b border-gray-200">
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Bell className="w-12 h-12 mb-4 text-gray-300" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => {
                const Icon = typeIcons[notification.type];
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.isRead ? 'bg-blue-50 border-l-4 border-l-primary' : ''
                    }`}
                    onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${typeColors[notification.type]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`text-sm font-medium text-gray-900 ${!notification.isRead ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[notification.priority]}`}>
                            {notification.priority}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(notification.createdAt).toLocaleString()}</span>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </div>

                        {notification.ticketId && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              Ticket: {notification.ticketId}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NotificationPanel;