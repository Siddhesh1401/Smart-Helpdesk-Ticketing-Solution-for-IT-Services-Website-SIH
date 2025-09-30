import { useState } from 'react';
import { MessageCircle, Bell, BarChart3, Mail, LogOut } from 'lucide-react';
import EmployeeDashboard from './components/EmployeeDashboard';
import ITDashboard from './components/ITDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import NotificationPanel from './components/NotificationPanel';
import ReportingDashboard from './components/ReportingDashboard';
import EmailIntegration from './components/EmailIntegration';
import NotificationToast from './components/NotificationToast';
import { User, Notification } from './types';

type AuthState = 'login' | 'register' | 'forgot-password';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>('login');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports' | 'email' | 'settings'>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'ticket-update',
      title: 'Ticket Resolved',
      message: 'Your VPN connection issue has been resolved automatically',
      isRead: false,
      priority: 'medium',
      userId: 'user1',
      ticketId: 'TCK-2025-1010',
      createdAt: new Date(Date.now() - 30 * 60000).toISOString()
    },
    {
      id: '2',
      type: 'system-alert',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 2:00 AM - 4:00 AM',
      isRead: false,
      priority: 'high',
      userId: 'user1',
      createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString()
    },
    {
      id: '3',
      type: 'assignment',
      title: 'New Assignment',
      message: 'You have been assigned ticket TCK-2025-1020',
      isRead: true,
      priority: 'medium',
      userId: 'user1',
      ticketId: 'TCK-2025-1020',
      createdAt: new Date(Date.now() - 24 * 60 * 60000).toISOString()
    }
  ]);

  const handleLogin = (userData: { name: string; role: 'employee' | 'it' | 'admin'; email: string }) => {
    setCurrentUser({
      id: '1',
      name: userData.name,
      email: userData.email,
      role: userData.role === 'it' ? 'it-agent' : userData.role,
      department: userData.role === 'admin' ? 'IT Administration' : userData.role === 'it' ? 'IT Support' : 'General',
      isOnline: true,
      lastSeen: new Date().toISOString()
    });
    setShowWelcomeToast(true);
  };

  const handleRegister = (userData: {
    name: string;
    email: string;
    role: 'employee' | 'it' | 'admin';
    department: string;
    password: string;
  }) => {
    // In a real app, this would make an API call
    // For demo, just log them in after successful registration
    handleLogin({
      name: userData.name,
      email: userData.email,
      role: userData.role
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
    setAuthState('login');
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Authentication screens
  if (!currentUser) {
    switch (authState) {
      case 'register':
        return (
          <Register
            onRegister={handleRegister}
            onBackToLogin={() => setAuthState('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPassword
            onBackToLogin={() => setAuthState('login')}
          />
        );
      default:
        return (
          <Login
            onLogin={handleLogin}
            onShowRegister={() => setAuthState('register')}
            onShowForgotPassword={() => setAuthState('forgot-password')}
          />
        );
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: MessageCircle },
    ...(currentUser.role === 'admin' ? [
      { id: 'reports' as const, label: 'Analytics', icon: BarChart3 }
    ] : []),
    ...(currentUser.role === 'admin' ? [
      { id: 'email' as const, label: 'Email Config', icon: Mail }
    ] : [])
  ];

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentUser.role === 'employee') return <EmployeeDashboard />;
        if (currentUser.role === 'it-agent') return <ITDashboard />;
        if (currentUser.role === 'admin') return <AdminDashboard />;
        break;
      case 'reports':
        return <ReportingDashboard userRole={currentUser.role as 'admin' | 'it'} />;
      case 'email':
        return <EmailIntegration />;
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Sahyog</h1>
                <p className="text-sm text-gray-600">Smart Support System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Tab Navigation */}
              <nav className="flex space-x-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === id 
                        ? 'bg-primary text-white' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>

              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{currentUser.role.replace('-', ' ')}</p>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {renderMainContent()}
      </main>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={markNotificationAsRead}
        onMarkAllAsRead={markAllNotificationsAsRead}
      />

      {/* Welcome Toast */}
      {showWelcomeToast && (
        <NotificationToast
          type="success"
          message={`Welcome back, ${currentUser.name}! You have ${unreadCount} unread notifications.`}
          onClose={() => setShowWelcomeToast(false)}
        />
      )}
    </div>
  );
}

export default App;