import React, { useState } from 'react';
import { MessageCircle, User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: { name: string; role: 'employee' | 'it' | 'admin'; email: string }) => void;
  onShowRegister: () => void;
  onShowForgotPassword: () => void;
}

function Login({ onLogin, onShowRegister, onShowForgotPassword }: LoginProps) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const mockUsers = {
    'john.doe@powergrid.com': { name: 'John Doe', role: 'employee' as const, password: 'Employee123' },
    'mike.chen@powergrid.com': { name: 'Mike Chen', role: 'it' as const, password: 'IT123456' },
    'sarah.wilson@powergrid.com': { name: 'Sarah Wilson', role: 'admin' as const, password: 'Admin123' }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!credentials.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!credentials.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = mockUsers[credentials.email as keyof typeof mockUsers];
      
      if (user && user.password === credentials.password) {
        onLogin({
          name: user.name,
          role: user.role,
          email: credentials.email
        });
      } else {
        setLoginError('Invalid email or password. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const quickLogin = (userType: keyof typeof mockUsers) => {
    const email = userType;
    const user = mockUsers[email];
    setIsLoading(true);
    
    setTimeout(() => {
      onLogin({
        name: user.name,
        role: user.role,
        email: email
      });
      setIsLoading(false);
    }, 500);
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (loginError) {
      setLoginError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to Sahyog
          </p>
        </div>

        {/* Login Error */}
        {loginError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-800">{loginError}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="button"
              onClick={onShowForgotPassword}
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              Forgot password?
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        {/* Quick Login Demo */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Demo Quick Login</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {Object.entries(mockUsers).map(([email, user]) => (
              <button
                key={email}
                onClick={() => quickLogin(email as keyof typeof mockUsers)}
                disabled={isLoading}
                className="flex flex-col items-center p-3 border border-gray-300 rounded-lg hover:border-primary hover:bg-primary-light transition-colors disabled:opacity-50"
              >
                <User className="w-5 h-5 text-gray-600 mb-1" />
                <span className="text-xs font-medium capitalize">{user.role}</span>
                <span className="text-xs text-gray-500">{user.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Demo credentials:</p>
            <p>Employee: john.doe@powergrid.com / Employee123</p>
            <p>IT: mike.chen@powergrid.com / IT123456</p>
            <p>Admin: sarah.wilson@powergrid.com / Admin123</p>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onShowRegister}
              className="text-primary hover:text-primary-dark font-medium"
            >
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;