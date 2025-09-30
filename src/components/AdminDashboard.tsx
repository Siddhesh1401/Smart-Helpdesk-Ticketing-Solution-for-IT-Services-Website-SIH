import { useState } from 'react';
import { CreditCard as Edit, Trash2, Plus, TrendingUp } from 'lucide-react';
import SourcesWidget from './SourcesWidget';
import MonitoringCard from './MonitoringCard';
import KBModal from './KBModal';

interface KBArticle {
  id: string;
  title: string;
  category: string;
  usageCount: number;
  lastUpdated: string;
}

const mockKBArticles: KBArticle[] = [
  {
    id: 'KB-001',
    title: 'VPN Connection Troubleshooting',
    category: 'Network',
    usageCount: 156,
    lastUpdated: '2025-01-15'
  },
  {
    id: 'KB-002',
    title: 'Password Reset Procedures',
    category: 'Authentication',
    usageCount: 203,
    lastUpdated: '2025-01-18'
  },
  {
    id: 'KB-003',
    title: 'Email Client Configuration',
    category: 'Email',
    usageCount: 89,
    lastUpdated: '2025-01-12'
  },
  {
    id: 'KB-004',
    title: 'Printer Setup Guide',
    category: 'Hardware',
    usageCount: 67,
    lastUpdated: '2025-01-10'
  }
];

function AdminDashboard() {
  const [showKBModal, setShowKBModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<KBArticle | null>(null);

  const handleEditArticle = (article: KBArticle) => {
    setEditingArticle(article);
    setShowKBModal(true);
  };

  const handleAddArticle = () => {
    setEditingArticle(null);
    setShowKBModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Row - Sources */}
      <SourcesWidget />

      {/* Middle Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Knowledge Base Manager */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Knowledge Base Manager</h2>
              <button
                onClick={handleAddArticle}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Article</span>
              </button>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockKBArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{article.title}</div>
                        <div className="text-sm text-gray-500">{article.id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm text-gray-900">{article.usageCount}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {article.lastUpdated}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditArticle(article)}
                            className="p-1 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Monitoring */}
        <div className="xl:col-span-1">
          <MonitoringCard />
        </div>
      </div>

      {/* KB Modal */}
      {showKBModal && (
        <KBModal
          article={editingArticle}
          onClose={() => setShowKBModal(false)}
        />
      )}
    </div>
  );
}

export default AdminDashboard;