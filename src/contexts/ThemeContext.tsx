import React, { createContext, useContext, useState } from 'react';
import { ThemeType, Theme } from '../types/theme';

const themes: Record<ThemeType, Theme> = {
  midnight: {
    name: 'midnight',
    background: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    cardHover: 'hover:bg-gray-700',
    text: 'text-gray-100',
    textMuted: 'text-gray-400',
    border: 'border-gray-700',
    input: {
      background: 'bg-gray-700',
      border: 'border-gray-600',
      focus: 'focus:border-blue-500 focus:ring-blue-500',
    },
    button: {
      primary: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
    },
  },
  galaxy: {
    name: 'galaxy',
    background: 'bg-[#1a1b2e]',
    cardBg: 'bg-[#252942]',
    cardHover: 'hover:bg-[#2f345c]',
    text: 'text-indigo-50',
    textMuted: 'text-indigo-300',
    border: 'border-indigo-800',
    input: {
      background: 'bg-[#2f345c]',
      border: 'border-indigo-700',
      focus: 'focus:border-indigo-500 focus:ring-indigo-500',
    },
    button: {
      primary: 'bg-indigo-600',
      primaryHover: 'hover:bg-indigo-700',
    },
  },
  ocean: {
    name: 'ocean',
    background: 'bg-[#0f172a]',
    cardBg: 'bg-[#1e293b]',
    cardHover: 'hover:bg-[#334155]',
    text: 'text-cyan-50',
    textMuted: 'text-cyan-300',
    border: 'border-cyan-900',
    input: {
      background: 'bg-[#1e293b]',
      border: 'border-cyan-800',
      focus: 'focus:border-cyan-500 focus:ring-cyan-500',
    },
    button: {
      primary: 'bg-cyan-600',
      primaryHover: 'hover:bg-cyan-700',
    },
  },
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('midnight');

  const value = {
    theme: themes[currentTheme],
    setTheme: setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}