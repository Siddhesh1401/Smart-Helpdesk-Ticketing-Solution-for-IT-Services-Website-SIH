import { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const typeStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-500'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: AlertCircle,
    iconColor: 'text-red-500'
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: Info,
    iconColor: 'text-blue-500'
  }
};

function NotificationToast({ 
  type, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: NotificationToastProps) {
  const styles = typeStyles[type];
  const Icon = styles.icon;

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`flex items-center space-x-3 p-4 rounded-lg border shadow-lg max-w-md ${styles.bg} ${styles.border}`}>
        <Icon className={`w-5 h-5 ${styles.iconColor} flex-shrink-0`} />
        <p className={`text-sm font-medium ${styles.text} flex-1`}>
          {message}
        </p>
        <button
          onClick={onClose}
          className={`p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors ${styles.iconColor}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default NotificationToast;