import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`max-w-md w-full space-y-8 ${theme.cardBg} p-8 rounded-lg shadow-xl`}>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}