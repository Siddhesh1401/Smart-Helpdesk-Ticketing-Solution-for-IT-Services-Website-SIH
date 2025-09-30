import { useState } from 'react';
import { MessageCircle, Mail, ArrowLeft, CheckCircle, Clock } from 'lucide-react';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    } else if (!email.includes('powergrid.com')) {
      newErrors.email = 'Please use your POWERGRID corporate email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Check Your Email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Password reset instructions have been sent
            </p>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-green-800">
                <Mail className="w-5 h-5" />
                <span className="font-medium">Email sent successfully!</span>
              </div>
              
              <p className="text-sm text-green-700">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              
              <div className="bg-green-100 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-green-800 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">What to do next:</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>• Check your email inbox (and spam folder)</li>
                  <li>• Click the reset link within 15 minutes</li>
                  <li>• Create a new secure password</li>
                  <li>• Sign in with your new password</li>
                </ul>
              </div>

              <p className="text-xs text-green-600">
                Didn't receive the email? Check your spam folder or contact IT support.
              </p>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <button
              onClick={onBackToLogin}
              className="flex items-center justify-center space-x-2 text-sm text-primary hover:text-primary-dark font-medium mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">Password Reset Process</h3>
              <p className="text-sm text-blue-800 mt-1">
                We'll send you a secure link to reset your password. The link will expire in 15 minutes for security.
              </p>
            </div>
          </div>
        </div>

        {/* Reset Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Corporate Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e.target.value)}
                className={`pl-10 w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="name@powergrid.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
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
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>
        </form>

        {/* Security Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Security Note:</span> For your protection, password reset links expire after 15 minutes. If you don't receive the email, please contact IT support at{' '}
              <span className="font-medium">it-support@powergrid.com</span>
            </p>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <button
            onClick={onBackToLogin}
            className="flex items-center justify-center space-x-2 text-sm text-primary hover:text-primary-dark font-medium mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;