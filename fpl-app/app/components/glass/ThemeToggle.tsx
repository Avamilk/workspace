'use client';

import { motion } from 'framer-motion';
import { useThemeStore } from '@/app/lib/stores/themeStore';
import { Plane, Grid3X3 } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center gap-2 px-3 py-2 rounded-xl',
        'bg-[rgba(10,15,30,0.5)] backdrop-blur-[8px]',
        'border border-[rgba(0,255,136,0.15)]',
        'text-white/70 font-mono text-sm',
        'transition-all duration-300',
        'hover:border-[#00ff88] hover:text-[#00ff88]',
        'hover:shadow-[0_0_15px_rgba(0,255,136,0.3)]'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {theme === 'matrix' ? (
        <>
          <Grid3X3 className="w-4 h-4" />
          <span className="hidden sm:inline">Matrix</span>
        </>
      ) : (
        <>
          <Plane className="w-4 h-4" />
          <span className="hidden sm:inline">Airport</span>
        </>
      )}
    </motion.button>
  );
}
