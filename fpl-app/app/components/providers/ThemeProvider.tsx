'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/app/lib/stores/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update body classes based on theme
    if (theme === 'airport') {
      document.body.className = 'bg-[#0a0a0f] text-[#39ff14] font-[\'VT323\'] min-h-screen';
    } else {
      document.body.className = 'bg-[#050a14] text-white font-sans min-h-screen';
    }
  }, [theme]);

  return <>{children}</>;
}
