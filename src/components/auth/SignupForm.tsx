import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { AuthLayout } from './AuthLayout';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setLoading(true);
      await signup(email, password);
      toast.success('Account created! Please check your email to verify your account.');
      navigate('/verify-email');
    } catch (error) {
      toast.error('Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create an Account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`appearance-none rounded-lg relative block w-full px-3 py-2 ${theme.input.background} ${theme.border} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.input.focus}`}
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`appearance-none rounded-lg relative block w-full px-3 py-2 ${theme.input.background} ${theme.border} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.input.focus}`}
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${theme.button.primary} ${theme.button.primaryHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.input.focus}`}
          >
            <UserPlus className="w-5 h-5 mr-2" />
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </div>

        <div className="text-sm text-center">
          <Link to="/login" className={`font-medium ${theme.textMuted} hover:text-blue-400`}>
            Already have an account? Log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}