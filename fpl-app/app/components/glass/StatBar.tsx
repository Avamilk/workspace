'use client';

import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';

interface StatBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'green' | 'cyan' | 'magenta' | 'amber';
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const colorStyles = {
  green: 'bg-gradient-to-r from-[#00cc6a] to-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.3)]',
  cyan: 'bg-gradient-to-r from-[#00a8cc] to-[#00d4ff] shadow-[0_0_10px_rgba(0,212,255,0.3)]',
  magenta: 'bg-gradient-to-r from-[#cc0052] to-[#ff0066] shadow-[0_0_10px_rgba(255,0,102,0.3)]',
  amber: 'bg-gradient-to-r from-[#cc8800] to-[#ffb000] shadow-[0_0_10px_rgba(255,176,0,0.3)]',
};

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function StatBar({
  value,
  max = 100,
  label,
  color = 'green',
  showValue = true,
  size = 'md',
  className,
  animated = true,
}: StatBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-white/70 font-mono">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm font-bold text-[#00ff88] font-mono">
              {value.toFixed(1)}
            </span>
          )}
        </div>
      )}
      
      <div className={cn('w-full bg-white/10 rounded-full overflow-hidden', sizeStyles[size])}>
        <motion.div
          className={cn('h-full rounded-full', colorStyles[color])}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>
    </div>
  );
}

// Multi-stat comparison bar
interface MultiStatBarProps {
  stats: {
    label: string;
    value: number;
    color?: 'green' | 'cyan' | 'magenta' | 'amber';
  }[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MultiStatBar({
  stats,
  max = 100,
  size = 'md',
  className,
}: MultiStatBarProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {stats.map((stat, index) => (
        <StatBar
          key={stat.label}
          label={stat.label}
          value={stat.value}
          max={max}
          color={stat.color || 'green'}
          size={size}
          animated
        />
      ))}
    </div>
  );
}

// Circular progress variant
interface CircularStatProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: 'green' | 'cyan' | 'magenta' | 'amber';
  label?: string;
  className?: string;
}

const circularColors = {
  green: '#00ff88',
  cyan: '#00d4ff',
  magenta: '#ff0066',
  amber: '#ffb000',
};

export function CircularStat({
  value,
  max = 100,
  size = 60,
  strokeWidth = 4,
  color = 'green',
  label,
  className,
}: CircularStatProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={circularColors[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            filter: `drop-shadow(0 0 4px ${circularColors[color]})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold font-mono" style={{ color: circularColors[color] }}>
          {Math.round(percentage)}%
        </span>
      </div>
      {label && (
        <span className="absolute -bottom-5 text-xs text-white/50 font-mono whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
