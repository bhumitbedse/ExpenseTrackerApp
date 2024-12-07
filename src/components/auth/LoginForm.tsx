import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { AuthLayout } from './AuthLayout';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back">
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
        </div>

        <div className="flex items-center justify-end">
          <Link
            to="/forgot-password"
            className={`text-sm font-medium ${theme.textMuted} hover:text-blue-400`}
          >
            Forgot your password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${theme.button.primary} ${theme.button.primaryHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.input.focus}`}
          >
            <LogIn className="w-5 h-5 mr-2" />
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </div>

        <div className="text-sm text-center">
          <Link to="/signup" className={`font-medium ${theme.textMuted} hover:text-blue-400`}>
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}