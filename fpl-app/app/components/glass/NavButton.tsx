'use client';

import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  variant?: 'default' | 'active' | 'ghost';
  color?: 'green' | 'cyan' | 'magenta' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: (e: any) => void;
  href?: string;
}

const variantStyles = {
  default: `
    bg-[rgba(10,15,30,0.5)] backdrop-blur-[8px]
    border border-[rgba(0,255,136,0.15)]
    text-white/70
    hover:bg-[rgba(0,255,136,0.1)] hover:border-[#00ff88] hover:text-[#00ff88]
    hover:shadow-[0_0_15px_rgba(0,255,136,0.3),inset_0_0_10px_rgba(0,255,136,0.1)]
  `,
  active: `
    bg-[rgba(0,255,136,0.15)] backdrop-blur-[8px]
    border border-[#00ff88]
    text-[#00ff88]
    shadow-[0_0_20px_rgba(0,255,136,0.2),inset_0_0_15px_rgba(0,255,136,0.1)]
  `,
  ghost: `
    bg-transparent border-transparent
    text-white/50
    hover:text-white hover:bg-white/5
  `,
};

const colorStyles = {
  green: {
    active: 'border-[#00ff88] text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.2)]',
    hover: 'hover:border-[#00ff88] hover:text-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)]',
  },
  cyan: {
    active: 'border-[#00d4ff] text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.2)]',
    hover: 'hover:border-[#00d4ff] hover:text-[#00d4ff] hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]',
  },
  magenta: {
    active: 'border-[#ff0066] text-[#ff0066] shadow-[0_0_20px_rgba(255,0,102,0.2)]',
    hover: 'hover:border-[#ff0066] hover:text-[#ff0066] hover:shadow-[0_0_15px_rgba(255,0,102,0.3)]',
  },
  amber: {
    active: 'border-[#ffb000] text-[#ffb000] shadow-[0_0_20px_rgba(255,176,0,0.2)]',
    hover: 'hover:border-[#ffb000] hover:text-[#ffb000] hover:shadow-[0_0_15px_rgba(255,176,0,0.3)]',
  },
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function NavButton({
  children,
  icon: Icon,
  className,
  variant = 'default',
  color = 'green',
  size = 'md',
  fullWidth = false,
  onClick,
  href,
}: NavButtonProps) {
  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center gap-2',
        'rounded-xl font-mono font-medium',
        'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'cursor-pointer select-none',
        sizeStyles[size],
        fullWidth && 'w-full',
        variantStyles[variant],
        variant === 'default' && colorStyles[color].hover,
        variant === 'active' && colorStyles[color].active,
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active indicator glow */}
      {variant === 'active' && (
        <div className={cn(
          'absolute inset-0 rounded-xl opacity-30 blur-md',
          color === 'green' && 'bg-[#00ff88]',
          color === 'cyan' && 'bg-[#00d4ff]',
          color === 'magenta' && 'bg-[#ff0066]',
          color === 'amber' && 'bg-[#ffb000]',
        )} />
      )}
      
      {/* Icon */}
      {Icon && <Icon className="w-4 h-4 relative z-10" />}
      
      {/* Label */}
      <span className="relative z-10">{children}</span>
    </Component>
  );
}

// Icon-only button for mobile nav
interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  className?: string;
  variant?: 'default' | 'active' | 'ghost';
  color?: 'green' | 'cyan' | 'magenta' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
}

export function IconButton({
  icon: Icon,
  label,
  className,
  variant = 'default',
  color = 'green',
  size = 'md',
  onClick,
  href,
}: IconButtonProps) {
  const sizeStyles = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center',
        'rounded-xl font-mono',
        'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'cursor-pointer select-none',
        sizeStyles[size],
        variantStyles[variant],
        variant === 'default' && colorStyles[color].hover,
        variant === 'active' && colorStyles[color].active,
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={label}
    >
      {variant === 'active' && (
        <div className={cn(
          'absolute inset-0 rounded-xl opacity-30 blur-md',
          color === 'green' && 'bg-[#00ff88]',
          color === 'cyan' && 'bg-[#00d4ff]',
          color === 'magenta' && 'bg-[#ff0066]',
          color === 'amber' && 'bg-[#ffb000]',
        )} />
      )}
      <Icon className={cn(iconSizes[size], 'relative z-10')} />
    </Component>
  );
}
