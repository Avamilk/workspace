'use client';

import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'cyan' | 'magenta' | 'amber';
  hover?: boolean;
  onClick?: () => void;
  glowOnHover?: boolean;
}

const variantStyles = {
  default: 'border-[rgba(0,255,136,0.15)] hover:border-[rgba(0,255,136,0.35)]',
  cyan: 'border-[rgba(0,212,255,0.15)] hover:border-[rgba(0,212,255,0.35)]',
  magenta: 'border-[rgba(255,0,102,0.15)] hover:border-[rgba(255,0,102,0.35)]',
  amber: 'border-[rgba(255,176,0,0.15)] hover:border-[rgba(255,176,0,0.35)]',
};

const glowStyles = {
  default: 'hover:shadow-[0_0_20px_rgba(0,255,136,0.1),0_0_40px_rgba(0,255,136,0.05),inset_0_1px_0_rgba(255,255,255,0.05)]',
  cyan: 'hover:shadow-[0_0_20px_rgba(0,212,255,0.1),0_0_40px_rgba(0,212,255,0.05),inset_0_1px_0_rgba(255,255,255,0.05)]',
  magenta: 'hover:shadow-[0_0_20px_rgba(255,0,102,0.1),0_0_40px_rgba(255,0,102,0.05),inset_0_1px_0_rgba(255,255,255,0.05)]',
  amber: 'hover:shadow-[0_0_20px_rgba(255,176,0,0.1),0_0_40px_rgba(255,176,0,0.05),inset_0_1px_0_rgba(255,255,255,0.05)]',
};

export function GlassCard({
  children,
  className,
  variant = 'default',
  hover = true,
  onClick,
  glowOnHover = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-2xl p-6',
        'bg-[rgba(10,15,30,0.65)] backdrop-blur-[16px]',
        'border',
        variantStyles[variant],
        glowOnHover && glowStyles[variant],
        hover && 'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={onClick ? { scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      onClick={onClick}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
