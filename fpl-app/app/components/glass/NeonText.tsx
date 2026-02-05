'use client';

import { cn } from '@/app/lib/utils';

interface NeonTextProps {
  children: React.ReactNode;
  className?: string;
  color?: 'green' | 'cyan' | 'magenta' | 'amber' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  glow?: boolean;
  pulse?: boolean;
  mono?: boolean;
}

const colorStyles = {
  green: 'text-[#00ff88]',
  cyan: 'text-[#00d4ff]',
  magenta: 'text-[#ff0066]',
  amber: 'text-[#ffb000]',
  white: 'text-white',
};

const glowStyles = {
  green: '[text-shadow:0_0_5px_rgba(0,255,136,0.5),0_0_10px_rgba(0,255,136,0.3)]',
  cyan: '[text-shadow:0_0_5px_rgba(0,212,255,0.5),0_0_10px_rgba(0,212,255,0.3)]',
  magenta: '[text-shadow:0_0_5px_rgba(255,0,102,0.5),0_0_10px_rgba(255,0,102,0.3)]',
  amber: '[text-shadow:0_0_5px_rgba(255,176,0,0.5),0_0_10px_rgba(255,176,0,0.3)]',
  white: '[text-shadow:0_0_5px_rgba(255,255,255,0.3),0_0_10px_rgba(255,255,255,0.2)]',
};

const sizeStyles = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const weightStyles = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export function NeonText({
  children,
  className,
  color = 'green',
  size = 'md',
  weight = 'medium',
  glow = false,
  pulse = false,
  mono = true,
}: NeonTextProps) {
  return (
    <span
      className={cn(
        colorStyles[color],
        sizeStyles[size],
        weightStyles[weight],
        mono ? 'font-mono' : 'font-sans',
        glow && glowStyles[color],
        pulse && 'animate-neon-pulse',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </span>
  );
}

// Heading variant
interface NeonHeadingProps extends NeonTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function NeonHeading({
  children,
  className,
  as: Component = 'h2',
  color = 'green',
  size = 'xl',
  weight = 'bold',
  glow = true,
  pulse = false,
  mono = true,
}: NeonHeadingProps) {
  return (
    <Component
      className={cn(
        colorStyles[color],
        sizeStyles[size],
        weightStyles[weight],
        mono ? 'font-mono' : 'font-sans',
        glow && glowStyles[color],
        pulse && 'animate-neon-pulse',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </Component>
  );
}
