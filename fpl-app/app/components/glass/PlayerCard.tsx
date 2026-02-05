'use client';

import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { NeonText } from './NeonText';
import { StatBar } from './StatBar';
import { cn } from '@/app/lib/utils';
import { Crown, ArrowUp, ArrowDown, Minus, Shield } from 'lucide-react';

interface PlayerCardProps {
  player: {
    id: number;
    name: string;
    team: string;
    position: string;
    price: number;
    points: number;
    form?: number;
    selected?: boolean;
    captain?: boolean;
    viceCaptain?: boolean;
    image?: string;
    teamColor?: string;
    stats?: {
      goals?: number;
      assists?: number;
      cleanSheets?: number;
      minutes?: number;
    };
  };
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}

export function PlayerCard({
  player,
  className,
  onClick,
  compact = false,
}: PlayerCardProps) {
  const isHighForm = (player.form || 0) >= 7;
  const isLowForm = (player.form || 0) < 5;

  return (
    <GlassCard
      className={cn(
        'relative overflow-hidden',
        compact ? 'p-3' : 'p-4',
        player.captain && 'border-[#ffb000]',
        className
      )}
      variant={player.captain ? 'amber' : isHighForm ? 'default' : 'default'}
      onClick={onClick}
    >
      {/* Captain badge */}
      {player.captain && (
        <div className="absolute -top-1 -right-1 z-20">
          <div className="relative">
            <Crown className="w-6 h-6 text-[#ffb000] fill-[#ffb000]" />
            <div className="absolute inset-0 blur-sm bg-[#ffb000] opacity-50" />
          </div>
        </div>
      )}

      {/* Vice Captain badge */}
      {player.viceCaptain && (
        <div className="absolute -top-1 -right-1 z-20">
          <div className="relative">
            <Crown className="w-5 h-5 text-[#00d4ff] fill-[#00d4ff]" />
          </div>
        </div>
      )}

      {/* High form indicator */}
      {isHighForm && !player.captain && (
        <div className="absolute top-2 right-2 z-20">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowUp className="w-4 h-4 text-[#00ff88]" />
          </motion.div>
        </div>
      )}

      <div className={cn('flex items-center gap-3', compact && 'gap-2')}>
        {/* Player Image / Jersey placeholder */}
        <div className={cn(
          'relative rounded-xl overflow-hidden flex-shrink-0',
          compact ? 'w-12 h-12' : 'w-16 h-16',
          'bg-gradient-to-br from-white/10 to-transparent',
          'border border-white/10'
        )}>
          {player.image ? (
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className={cn(
                'font-bold text-white/30',
                compact ? 'text-lg' : 'text-2xl'
              )}>
                {player.name.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Position indicator */}
          <div className={cn(
            'absolute bottom-0 left-0 right-0',
            'bg-black/60 backdrop-blur-sm',
            'text-center text-[10px] font-mono text-white/70',
            'py-0.5'
          )}>
            {player.position.slice(0, 3).toUpperCase()}
          </div>
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={cn(
              'font-bold text-white truncate',
              compact ? 'text-sm' : 'text-base'
            )}>
              {player.name}
            </h3>
            {player.viceCaptain && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00d4ff]/20 text-[#00d4ff] font-mono">
                VC
              </span>
            )}
          </div>
          
          <p className={cn(
            'text-white/50 truncate',
            compact ? 'text-xs' : 'text-sm'
          )}>
            {player.team}
          </p>

          {/* Price and Points */}
          <div className="flex items-center gap-3 mt-1">
            <span className={cn(
              'font-mono text-[#00ff88]',
              compact ? 'text-xs' : 'text-sm'
            )}>
              £{(player.price / 10).toFixed(1)}m
            </span>
            <span className={cn(
              'font-mono text-white/70',
              compact ? 'text-xs' : 'text-sm'
            )}>
              {player.points} pts
            </span>
          </div>

          {/* Form indicator for non-compact */}
          {!compact && player.form !== undefined && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white/50 font-mono">Form</span>
                <NeonText 
                  color={isHighForm ? 'green' : isLowForm ? 'magenta' : 'white'}
                  size="xs"
                  glow={isHighForm}
                >
                  {player.form.toFixed(1)}
                </NeonText>
              </div>
              <StatBar
                value={player.form}
                max={10}
                color={isHighForm ? 'green' : isLowForm ? 'magenta' : 'cyan'}
                size="sm"
                showValue={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* Stats row for non-compact */}
      {!compact && player.stats && (
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/10">
          <StatItem label="G" value={player.stats.goals || 0} />
          <StatItem label="A" value={player.stats.assists || 0} />
          <StatItem label="CS" value={player.stats.cleanSheets || 0} />
          <StatItem label="Mins" value={player.stats.minutes || 0} format="compact" />
        </div>
      )}
    </GlassCard>
  );
}

function StatItem({ 
  label, 
  value, 
  format 
}: { 
  label: string; 
  value: number; 
  format?: 'compact' 
}) {
  const displayValue = format === 'compact' && value >= 1000 
    ? `${(value / 1000).toFixed(0)}k` 
    : value;

  return (
    <div className="text-center">
      <div className="text-xs font-bold text-white font-mono">{displayValue}</div>
      <div className="text-[10px] text-white/40 font-mono">{label}</div>
    </div>
  );
}

// Mini player card for lists
interface PlayerListItemProps {
  player: {
    id: number;
    name: string;
    team: string;
    position: string;
    price: number;
    points: number;
    form?: number;
  };
  rank?: number;
  highlight?: boolean;
  onClick?: () => void;
}

export function PlayerListItem({
  player,
  rank,
  highlight = false,
  onClick,
}: PlayerListItemProps) {
  return (
    <motion.div
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl',
        'bg-[rgba(10,15,30,0.4)] backdrop-blur-[8px]',
        'border border-white/5',
        'transition-all duration-200',
        highlight && 'border-[#00ff88]/30 bg-[rgba(0,255,136,0.05)]',
        onClick && 'cursor-pointer hover:border-white/20'
      )}
      whileHover={onClick ? { x: 4 } : undefined}
      onClick={onClick}
    >
      {/* Rank */}
      {rank !== undefined && (
        <div className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm',
          rank === 1 && 'bg-[#ffb000]/20 text-[#ffb000]',
          rank === 2 && 'bg-[#c0c0c0]/20 text-[#c0c0c0]',
          rank === 3 && 'bg-[#cd7f32]/20 text-[#cd7f32]',
          rank > 3 && 'bg-white/5 text-white/50'
        )}>
          {rank}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white text-sm truncate">
            {player.name}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-mono">
            {player.position.slice(0, 3).toUpperCase()}
          </span>
        </div>
        <span className="text-xs text-white/40">{player.team}</span>
      </div>

      {/* Stats */}
      <div className="text-right">
        <div className="text-sm font-mono text-[#00ff88]">
          {player.points} pts
        </div>
        <div className="text-xs text-white/40 font-mono">
          £{(player.price / 10).toFixed(1)}m
        </div>
      </div>
    </motion.div>
  );
}
