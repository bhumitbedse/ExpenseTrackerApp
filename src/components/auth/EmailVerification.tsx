import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { AuthLayout } from './AuthLayout';

export function EmailVerification() {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { currentUser, sendVerificationEmail, logout } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (currentUser.emailVerified) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(c => c - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0) return;
    
    try {
      setLoading(true);
      await sendVerificationEmail();
      setCountdown(60);
      toast.success('Verification email sent! Check your inbox.');
    } catch (error) {
      toast.error('Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  if (!currentUser) return null;

  return (
    <AuthLayout title="Verify Your Email">
      <div className="mt-8 space-y-6">
        <div className={`text-center ${theme.textMuted}`}>
          <Mail className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <p className="text-lg mb-2">
            We've sent a verification email to:
          </p>
          <p className="font-medium text-lg text-blue-400 mb-4">
            {currentUser.email}
          </p>
          <p className="text-sm">
            Please check your email and click the verification link to continue.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleResendEmail}
            disabled={loading || countdown > 0}
            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
              countdown > 0
                ? 'bg-gray-600 cursor-not-allowed'
                : `${theme.button.primary} ${theme.button.primaryHover}`
            } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.input.focus}`}
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading
              ? 'Sending...'
              : countdown > 0
              ? `Resend in ${countdown}s`
              : 'Resend Email'}
          </button>

          <button
            onClick={handleLogout}
            className={`w-full px-4 py-2 text-sm font-medium ${theme.textMuted} hover:text-blue-400`}
          >
            Log out and try again
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}