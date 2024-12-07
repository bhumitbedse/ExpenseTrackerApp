import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { KeyRound } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { AuthLayout } from './AuthLayout';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await resetPassword(email);
      toast.success('Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (error) {
      toast.error('Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <p className={`text-sm ${theme.textMuted} text-center mb-4`}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 ${theme.input.background} ${theme.border} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.input.focus}`}
                placeholder="Email address"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${theme.button.primary} ${theme.button.primaryHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.input.focus}`}
          >
            <KeyRound className="w-5 h-5 mr-2" />
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>

        <div className="text-sm text-center space-y-2">
          <Link to="/login" className={`block font-medium ${theme.textMuted} hover:text-blue-400`}>
            Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}