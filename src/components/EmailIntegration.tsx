import { useState } from 'react';
import { Mail, Settings, RefreshCw, CheckCircle, AlertCircle, Clock, Plus } from 'lucide-react';
import { EmailConfig } from '../types';

function EmailIntegration() {
  const [emailConfigs, setEmailConfigs] = useState<EmailConfig[]>([
    {
      id: '1',
      serverHost: 'mail.powergrid.com',
      port: 993,
      isSecure: true,
      username: 'helpdesk@powergrid.com',
      isEnabled: true,
      lastSync: '2025-09-27T14:30:00Z',
      unreadCount: 23
    },
    {
      id: '2', 
      serverHost: 'exchange.powergrid.com',
      port: 587,
      isSecure: true,
      username: 'support@powergrid.com',
      isEnabled: false,
      lastSync: '2025-09-26T18:45:00Z',
      unreadCount: 0
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newConfig, setNewConfig] = useState({
    serverHost: '',
    port: 993,
    username: '',
    password: '',
    isSecure: true
  });

  const [syncStatus, setSyncStatus] = useState<{ [key: string]: 'idle' | 'syncing' | 'success' | 'error' }>({});

  const handleSync = async (configId: string) => {
    setSyncStatus(prev => ({ ...prev, [configId]: 'syncing' }));
    
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus(prev => ({ ...prev, [configId]: 'success' }));
      setEmailConfigs(prev => prev.map(config => 
        config.id === configId 
          ? { ...config, lastSync: new Date().toISOString(), unreadCount: Math.floor(Math.random() * 50) }
          : config
      ));
      
      setTimeout(() => {
        setSyncStatus(prev => ({ ...prev, [configId]: 'idle' }));
      }, 2000);
    }, 3000);
  };

  const toggleConfig = (configId: string) => {
    setEmailConfigs(prev => prev.map(config =>
      config.id === configId ? { ...config, isEnabled: !config.isEnabled } : config
    ));
  };

  const handleAddConfig = () => {
    if (newConfig.serverHost && newConfig.username) {
      const newEmailConfig: EmailConfig = {
        id: Date.now().toString(),
        ...newConfig,
        isEnabled: true,
        lastSync: new Date().toISOString(),
        unreadCount: 0
      };
      
      setEmailConfigs(prev => [...prev, newEmailConfig]);
      setNewConfig({ serverHost: '', port: 993, username: '', password: '', isSecure: true });
      setShowAddForm(false);
    }
  };

  const getSyncIcon = (configId: string) => {
    const status = syncStatus[configId] || 'idle';
    switch (status) {
      case 'syncing':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <RefreshCw className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Email Integration</h2>
          <p className="text-gray-600 mt-1">Manage email servers for ticket ingestion</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Email Server</span>
        </button>
      </div>

      {/* Email Configs */}
      <div className="grid gap-6">
        {emailConfigs.map((config) => (
          <div key={config.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  config.isEnabled ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Mail className={`w-5 h-5 ${config.isEnabled ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{config.serverHost}</h3>
                  <p className="text-sm text-gray-600">{config.username}</p>
                </div>
                
                {config.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {config.unreadCount} unread
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleSync(config.id)}
                  disabled={syncStatus[config.id] === 'syncing'}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  title="Sync emails"
                >
                  {getSyncIcon(config.id)}
                </button>
                
                <button
                  onClick={() => toggleConfig(config.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.isEnabled ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.isEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Server:</span>
                <p className="font-medium text-gray-900">{config.serverHost}:{config.port}</p>
              </div>
              
              <div>
                <span className="text-gray-500">Security:</span>
                <p className="font-medium text-gray-900">{config.isSecure ? 'SSL/TLS' : 'None'}</p>
              </div>
              
              <div>
                <span className="text-gray-500">Status:</span>
                <p className={`font-medium ${config.isEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                  {config.isEnabled ? 'Active' : 'Disabled'}
                </p>
              </div>
              
              <div>
                <span className="text-gray-500">Last Sync:</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <p className="font-medium text-gray-900 text-xs">
                    {new Date(config.lastSync).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Sync Status Message */}
            {syncStatus[config.id] && syncStatus[config.id] !== 'idle' && (
              <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center space-x-2">
                  {getSyncIcon(config.id)}
                  <span className="text-sm text-blue-800">
                    {syncStatus[config.id] === 'syncing' && 'Syncing emails...'}
                    {syncStatus[config.id] === 'success' && 'Sync completed successfully'}
                    {syncStatus[config.id] === 'error' && 'Sync failed - please check configuration'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Config Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Email Server</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Server Host
                </label>
                <input
                  type="text"
                  value={newConfig.serverHost}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, serverHost: e.target.value }))}
                  placeholder="mail.company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Port
                  </label>
                  <input
                    type="number"
                    value={newConfig.port}
                    onChange={(e) => setNewConfig(prev => ({ ...prev, port: parseInt(e.target.value) || 993 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newConfig.isSecure}
                      onChange={(e) => setNewConfig(prev => ({ ...prev, isSecure: e.target.checked }))}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">SSL/TLS</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={newConfig.username}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="support@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={newConfig.password}
                  onChange={(e) => setNewConfig(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddConfig}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Add Server
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailIntegration;