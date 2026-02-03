'use client'

import { X, TrendingUp, Clock, Target, Zap } from 'lucide-react'

interface Props {
  player: any
  isOpen: boolean
  onClose: () => void
}

export function PlayerModal({ player, isOpen, onClose }: Props) {
  if (!isOpen || !player) return null

  const stats = [
    { label: 'Form', value: player.form || 5.0, max: 10, icon: TrendingUp, color: '#f59e0b' },
    { label: 'Minutes', value: player.minutes || 0, max: 90, icon: Clock, color: '#3b82f6' },
    { label: 'Threat', value: player.ict || 50, max: 100, icon: Target, color: '#ef4444' },
    { label: 'Bonus', value: player.totalPoints || 100, max: 200, icon: Zap, color: '#22c55e' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="cyber-panel w-full max-w-md max-h-[90vh] overflow-y-auto relative z-10 animate-in slide-in-from-bottom duration-300">
        {/* Close */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cyber-dark border border-honey-gold/30 flex items-center justify-center text-honey-amber hover:text-honey-gold"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-6 border-b border-honey-gold/20">
          <p className="text-honey-amber/60 font-led text-sm tracking-widest uppercase mb-2">
            {player.position}
          </p>
          <h2 className="cyber-text text-3xl text-honey-gold mb-2">
            {player.name}
          </h2>
          <p className="text-honey-amber font-led">
            {player.team} • £{player.price}m
          </p>
        </div>

        {/* Big stats - circular */}
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="6" />
                <circle 
                  cx="48" cy="48" r="44" fill="none" 
                  stroke="#f59e0b" strokeWidth="6"
                  strokeDasharray={`${(player.points / 20) * 276} 276`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="cyber-text text-3xl text-honey-gold">{player.points}</span>
                <span className="text-[10px] text-honey-amber/60 font-led">GW PTS</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="6" />
                <circle 
                  cx="48" cy="48" r="44" fill="none" 
                  stroke="#22c55e" strokeWidth="6"
                  strokeDasharray={`${((player.totalPoints || 0) / 200) * 276} 276`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="cyber-text text-2xl text-led-green">{player.totalPoints || 0}</span>
                <span className="text-[10px] text-led-green/60 font-led">SEASON</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stat bars */}
        <div className="px-6 pb-6 space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <div className="flex-1">
                <div className="flex justify-between text-xs font-led mb-1">
                  <span className="text-honey-amber/60">{stat.label}</span>
                  <span style={{ color: stat.color }}>{stat.value}</span>
                </div>
                <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((stat.value / stat.max) * 100, 100)}%`, backgroundColor: stat.color }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex gap-3">
          <button className="cyber-button flex-1 py-3 text-sm font-bold">
            ADD TO WATCHLIST
          </button>
          <button 
            onClick={onClose}
            className="cyber-button flex-1 py-3 text-sm font-bold opacity-60"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}
