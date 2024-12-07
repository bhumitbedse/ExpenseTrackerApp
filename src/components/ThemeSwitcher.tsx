import React from 'react';
import { Moon, Waves, Stars } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeType } from '../types/theme';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { type: ThemeType; icon: React.ReactNode; label: string }[] = [
    { type: 'midnight', icon: <Moon className="w-4 h-4" />, label: 'Midnight' },
    { type: 'galaxy', icon: <Stars className="w-4 h-4" />, label: 'Galaxy' },
    { type: 'ocean', icon: <Waves className="w-4 h-4" />, label: 'Ocean' },
  ];

  return (
    <div className={`${theme.cardBg} p-2 rounded-lg flex space-x-2`}>
      {themes.map(({ type, icon, label }) => (
        <button
          key={type}
          onClick={() => setTheme(type)}
          className={`flex items-center px-3 py-1.5 rounded ${
            theme.name === type
              ? `${theme.button.primary} ${theme.text}`
              : `${theme.cardHover} ${theme.textMuted}`
          }`}
        >
          {icon}
          <span className="ml-2 text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}