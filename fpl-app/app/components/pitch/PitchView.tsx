'use client'

import { LEDText } from '../ui/LEDText'

interface Player {
  id: string
  name: string
  team: string
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  points: number
  isCaptain?: boolean
  isVice?: boolean
}

const teamColors: Record<string, string> = {
  ARS: '#EF0107',
  MCI: '#6CABDD',
  LIV: '#C8102E',
  TOT: '#132257',
  CHE: '#034694',
  NEW: '#241F20',
  AVL: '#670E36',
  MUN: '#DA291C',
  BRI: '#0057B8',
  WHU: '#7A263A',
  CRY: '#1B458F',
  EVE: '#003399',
  FUL: '#000000',
  WOL: '#FDB913',
  BRE: '#E30613',
  NFO: '#DD0000',
  BOU: '#DA291C',
  LEI: '#003090',
  IPS: '#3A64A3',
  SOU: '#D71920',
}

function Shirt({ team, isCaptain, isVice }: { team: string, isCaptain?: boolean, isVice?: boolean }) {
  const color = teamColors[team] || '#808080'
  return (
    <div className="relative w-12 h-14 mx-auto">
      {/* Shirt body */}
      <div 
        className="w-full h-full rounded-t-lg relative" 
        style={{ 
          backgroundColor: color, 
          boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.5)' 
        }}
      >
        {/* Collar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-white/20 rounded-b-lg" />
        {/* Sleeves */}
        <div className="absolute top-2 -left-2 w-3 h-6 rounded-l-sm" style={{ backgroundColor: color }} />
        <div className="absolute top-2 -right-2 w-3 h-6 rounded-r-sm" style={{ backgroundColor: color }} />
        {/* Captain armband */}
        {isCaptain && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-[#0a0a0f] border-2 border-[#0a0a0f]" style={{ backgroundColor: '#ffb000' }}>
            C
          </div>
        )}
        {/* Vice captain */}
        {isVice && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-[#0a0a0f] border-2 border-[#0a0a0f]" style={{ backgroundColor: '#4a4a5a' }}>
            V
          </div>
        )}
      </div>
      {/* Shorts */}
      <div className="w-8 h-4 mx-auto rounded-b-sm" style={{ backgroundColor: '#1a1a24' }} />
    </div>
  )
}

function PlayerCard({ player, onClick }: { player: Player; onClick?: (player: Player) => void }) {
  return (
    <div 
      onClick={() => onClick?.(player)}
      className="flex flex-col items-center gap-1 w-20 cursor-pointer hover:scale-110 transition-transform"
    >
      <Shirt team={player.team} isCaptain={player.isCaptain} isVice={player.isVice} />
      <div className="text-center">
        <p 
          className="font-['VT323'] text-xs tracking-wider truncate w-20" 
          style={{ color: '#39ff14', textShadow: '0 0 5px currentColor' }}
        >
          {player.name.toUpperCase()}
        </p>
        <p className="font-['VT323'] text-xs" style={{ color: '#ffb000' }}>
          {player.points} PTS
        </p>
      </div>
    </div>
  )
}

interface PitchViewProps {
  players: Player[]
  onPlayerClick?: (player: Player) => void
}

export function PitchView({ players, onPlayerClick }: PitchViewProps) {
  const gk = players.filter(p => p.position === 'GK')
  const defs = players.filter(p => p.position === 'DEF')
  const mids = players.filter(p => p.position === 'MID')
  const fwds = players.filter(p => p.position === 'FWD')

  return (
    <div className="relative w-full max-w-lg mx-auto bg-[#0f2d1f] rounded-lg overflow-hidden border-2 border-[#1a4d2e]">
      {/* Field markings */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Outer border */}
        <div className="absolute inset-2 border-2 border-white/20 rounded" />
        {/* Center line */}
        <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-white/20" />
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full" />
        {/* Top penalty area */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/20 border-t-0" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-8 border-2 border-white/20 border-t-0" />
        {/* Bottom penalty area */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/20 border-b-0" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-8 border-2 border-white/20 border-b-0" />
      </div>

      {/* Players - positioned absolutely */}
      <div className="relative h-[500px] p-4">
        {/* Forwards - top */}
        <div className="absolute top-8 left-0 right-0 flex justify-center gap-4">
          {fwds.map(p => <PlayerCard key={p.id} player={p} onClick={onPlayerClick} />)}
        </div>

        {/* Midfielders */}
        <div className="absolute top-[35%] left-0 right-0 flex justify-center gap-3">
          {mids.map(p => <PlayerCard key={p.id} player={p} onClick={onPlayerClick} />)}
        </div>

        {/* Defenders */}
        <div className="absolute top-[60%] left-0 right-0 flex justify-center gap-4">
          {defs.map(p => <PlayerCard key={p.id} player={p} onClick={onPlayerClick} />)}
        </div>

        {/* Goalkeeper - bottom */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          {gk.map(p => <PlayerCard key={p.id} player={p} onClick={onPlayerClick} />)}
        </div>
      </div>
    </div>
  )
}
