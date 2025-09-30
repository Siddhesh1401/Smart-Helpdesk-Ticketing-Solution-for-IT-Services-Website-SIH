import { useState } from 'react';
import { MessageCircle, User, Lock, Mail, Building, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface RegisterProps {
  onRegister: (userData: {
    name: string;
    email: string;
    role: 'employee' | 'it' | 'admin';
    department: string;
    password: string;
  }) => void;
  onBackToLogin: () => void;
}

function Register({ onRegister, onBackToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee' as 'employee' | 'it' | 'admin',
    department: '',
    employeeId: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const departments = [
    'Information Technology',
    'Human Resources',
    'Finance & Accounts',
    'Operations & Maintenance',
    'Engineering',
    'Legal & Regulatory',
    'Corporate Planning',
    'Safety & Environment',
    'Construction',
    'Commercial'
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    } else if (!formData.email.includes('powergrid.com')) {
      newErrors.email = 'Must use POWERGRID corporate email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    } else if (!/^[A-Z]{2,3}\d{4,6}$/.test(formData.employeeId)) {
      newErrors.employeeId = 'Invalid Employee ID format (e.g., IT123456)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onRegister({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        password: formData.password
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Sahyog
          </p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Corporate Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="name@powergrid.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value.toUpperCase())}
                  className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.employeeId ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="IT123456"
                />
              </div>
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.department ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'employee', label: 'Employee', desc: 'Submit tickets' },
                  { value: 'it', label: 'IT Agent', desc: 'Handle tickets' },
                  { value: 'admin', label: 'Admin', desc: 'Full access' }
                ].map((role) => (
                  <label
                    key={role.value}
                    className={`cursor-pointer p-3 border rounded-lg text-center transition-colors ${
                      formData.role === role.value
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'employee' | 'it' | 'admin' }))}
                      className="sr-only"
                    />
                    <div className="text-sm font-medium text-gray-900">{role.label}</div>
                    <div className="text-xs text-gray-500">{role.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Create a strong password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`pl-10 pr-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <span className="text-primary hover:text-primary-dark cursor-pointer">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="text-primary hover:text-primary-dark cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="flex items-center justify-center space-x-2 text-sm text-primary hover:text-primary-dark font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;