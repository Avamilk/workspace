'use client'

import { useState } from 'react'
import { PlayerModal } from './PlayerModal'

interface Player {
  id: number
  name: string
  team: string
  position: string
  price: number
  points: number
  form?: number
  totalPoints?: number
  goals?: number
  assists?: number
  minutes?: number
  ict?: number
}

interface Props {
  player: Player
  variant?: 'pitch' | 'list'
}

export function MobilePlayerCard({ player, variant = 'list' }: Props) {
  const [showModal, setShowModal] = useState(false)

  const teamColors: Record<string, string> = {
    ARS: '#EF0107',
    MCI: '#6CABDD',
    LIV: '#C8102E',
    TOT: '#132257',
    CHE: '#034694',
    NEW: '#241F20',
    MUN: '#DA291C',
    AVL: '#670E36',
    BRI: '#0057B8',
  }

  const color = teamColors[player.team] || '#808080'

  if (variant === 'pitch') {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
        >
          {/* Hexagon avatar */}
          <div
            className="w-12 h-14 relative flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              boxShadow: `0 0 20px ${color}40`
            }}
          >
            <span className="text-white font-bold text-xs">{player.team}</span>
          </div>
          <div className="text-center">
            <p className="cyber-text text-honey-gold text-xs truncate w-16">{player.name}</p>
            <p className="text-honey-amber text-[10px] font-led">{player.points} pts</p>
          </div>
        </button>
        <PlayerModal player={player} isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    )
  }

  // List variant for transfers/watchlist
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="cyber-panel w-full p-4 flex items-center gap-4 active:scale-[0.98] transition-transform"
      >
        {/* Circular progress indicator */}
        <div className="relative w-14 h-14">
          <svg className="w-full h-full -rotate-90">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="4" />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeDasharray={`${(player.form || 5) * 15} 150`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="cyber-text text-honey-gold text-sm">{player.form || '-'}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-left">
          <p className="cyber-text text-honey-gold text-lg">{player.name}</p>
          <div className="flex items-center gap-3 text-xs font-led text-honey-amber/70">
            <span>{player.team}</span>
            <span>•</span>
            <span>£{player.price}m</span>
            <span>•</span>
            <span className={player.points > 5 ? 'text-led-green' : 'text-honey-amber'}>
              {player.points} pts
            </span>
          </div>
        </div>

        {/* Arrow */}
        <svg className="w-5 h-5 text-honey-amber/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <PlayerModal player={player} isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
