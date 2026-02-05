'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, ArrowUpRight, Zap, Trophy, Crown } from 'lucide-react'
import { motion } from 'framer-motion'
import { AppShell } from '../components/layout/AppShell'
import { GlassCard, NeonText, NeonHeading, NavButton, PlayerCard } from '../components/glass'
import { useTeamStore } from '../../lib/store/teamStore'

export default function TeamPage() {
  const router = useRouter()
  const { teamData } = useTeamStore()
  const [viewMode, setViewMode] = useState<'pitch' | 'list'>('pitch')
  
  if (!teamData) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <NeonText color="white">Loading team data...</NeonText>
        </div>
      </AppShell>
    )
  }
  
  const players = teamData.players || []
  const gk = players.filter((p: any) => p.position === 'GK')
  const def = players.filter((p: any) => p.position === 'DEF')
  const mid = players.filter((p: any) => p.position === 'MID')
  const fwd = players.filter((p: any) => p.position === 'FWD')
  const bench = players.filter((p: any) => p.multiplier === 0)
  
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <NavButton 
            icon={ArrowLeft} 
            onClick={() => router.back()}
            variant="ghost"
          >
            BACK
          </NavButton>
          
          <div className="flex items-center gap-2">
            <NavButton
              onClick={() => setViewMode('pitch')}
              variant={viewMode === 'pitch' ? 'active' : 'default'}
              color="green"
              size="sm"
            >
              PITCH
            </NavButton>
            <NavButton
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'active' : 'default'}
              color="green"
              size="sm"
            >
              LIST
            </NavButton>
          </div>
        </div>
        
        {/* Title */}
        <div className="text-center">
          <NeonHeading as="h1" size="3xl" color="green" glow>
            FLIGHT DECK
          </NeonHeading>
          <p className="text-white/50 mt-2 font-mono text-sm">
            Formation: 4-3-3 • Bank: £{teamData.bank || 0}m
          </p>
        </div>
        
        {/* View Toggle Content */}
        {viewMode === 'pitch' ? (
          <GlassCard className="p-6 overflow-hidden">
            {/* Pitch */}
            <div className="relative bg-gradient-to-b from-[#0a3d0a] to-[#052005] rounded-xl overflow-hidden aspect-[4/5] max-w-md mx-auto border border-[#00ff88]/20">
              {/* Field markings */}
              <div className="absolute inset-4 border border-white/10 rounded-lg" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-12 border-b-2 border-x-2 border-white/10 rounded-b-full" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 border-t-2 border-x-2 border-white/10 rounded-t-full" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/10 rounded-full" />
              
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(to right, #00ff88 1px, transparent 1px), linear-gradient(to bottom, #00ff88 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />
              
              {/* Players on Pitch */}
              <div className="absolute inset-0 flex flex-col justify-around items-center py-6">
                {/* GK */}
                <PitchPlayer player={gk[0]} large />
                
                {/* DEF */}
                <div className="flex gap-3">
                  {def.slice(0, 4).map((player: any) => (
                    <PitchPlayer key={player.id} player={player} />
                  ))}
                </div>
                
                {/* MID */}
                <div className="flex gap-4">
                  {mid.slice(0, 3).map((player: any) => (
                    <PitchPlayer key={player.id} player={player} />
                  ))}
                </div>
                
                {/* FWD */}
                <div className="flex gap-4">
                  {fwd.slice(0, 3).map((player: any) => (
                    <PitchPlayer key={player.id} player={player} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Bench */}
            <div className="mt-6">
              <NeonText size="xs" color="white" className="text-center block mb-3">
                RESERVE CREW
              </NeonText>
              <div className="flex justify-center gap-3">
                {bench.map((player: any) => (
                  <PitchPlayer key={player.id} player={player} small />
                ))}
              </div>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            <GlassCard className="p-0 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <NeonText size="xs" color="green">STARTING XI</NeonText>
                <span className="text-xs text-white/40 font-mono">
                  {players.filter((p: any) => p.multiplier > 0).length} Players
                </span>
              </div>
              
              <div className="divide-y divide-white/5">
                {players.filter((p: any) => p.multiplier > 0).map((player: any) => (
                  <ListPlayerRow key={player.id} player={player} />
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="p-0 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <NeonText size="xs" color="cyan">RESERVE CREW</NeonText>
                <span className="text-xs text-white/40 font-mono">{bench.length} Players</span>
              </div>
              
              <div className="divide-y divide-white/5">
                {bench.map((player: any) => (
                  <ListPlayerRow key={player.id} player={player} />
                ))}
              </div>
            </GlassCard>
          </div>
        )}
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <NavButton 
            onClick={() => router.push('/transfers')}
            icon={ArrowUpRight}
            variant="default"
            color="cyan"
            fullWidth
          >
            TRANSFERS
          </NavButton>
          <NavButton 
            onClick={() => router.push('/captain')}
            icon={Zap}
            variant="active"
            color="green"
            fullWidth
          >
            AI CAPTAIN
          </NavButton>
        </div>
      </div>
    </AppShell>
  )
}

function PitchPlayer({ player, large = false, small = false }: { player: any, large?: boolean, small?: boolean }) {
  if (!player) return null
  
  const colors = {
    GK: 'bg-[#ffb000] text-black',
    DEF: 'bg-[#00d4ff] text-black',
    MID: 'bg-[#00ff88] text-black',
    FWD: 'bg-[#ff0066] text-white'
  }
  
  const isCaptain = player.multiplier > 1
  const isVice = player.isViceCaptain
  
  const sizeClasses = large 
    ? 'w-16 h-16 text-xl' 
    : small 
      ? 'w-10 h-10 text-xs' 
      : 'w-12 h-12 text-base'
  
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`
        relative ${sizeClasses} ${colors[player.position as keyof typeof colors]} 
        rounded-full flex items-center justify-center font-bold 
        shadow-lg shadow-black/30
        ${isCaptain ? 'ring-2 ring-[#ffb000] ring-offset-2 ring-offset-[#0a3d0a]' : ''} 
        ${isVice ? 'ring-2 ring-[#00d4ff] ring-offset-2 ring-offset-[#0a3d0a]' : ''}
      `}>
        {player.team?.substring(0, 1) || '?'}
        
        {/* Captain crown */}
        {isCaptain && (
          <div className="absolute -top-2 -right-2">
            <Crown className="w-5 h-5 text-[#ffb000] fill-[#ffb000] drop-shadow-lg" />
          </div>
        )}
        
        {/* Vice indicator */}
        {isVice && !isCaptain && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00d4ff] rounded-full flex items-center justify-center text-[8px] font-bold text-black">
            V
          </div>
        )}
        
        {player.multiplier === 0 && (
          <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-[7px] text-white font-mono">BENCH</span>
          </div>
        )}
      </div>
      <div className="text-center">
        <span className={`font-medium text-white/90 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded block ${small ? 'text-[8px]' : 'text-[10px]'}`}>
          {player.name?.split(' ').pop()?.substring(0, 6) || 'Unknown'}
        </span>
        {!small && (
          <span className="text-[8px] text-white/50 font-mono">
            {player.eventPoints} pts
          </span>
        )}
      </div>
    </div>
  )
}

function ListPlayerRow({ player }: { player: any }) {
  const colors = {
    GK: 'text-[#ffb000]',
    DEF: 'text-[#00d4ff]',
    MID: 'text-[#00ff88]',
    FWD: 'text-[#ff0066]'
  }
  
  const isCaptain = player.multiplier > 1
  const isVice = player.isViceCaptain
  
  return (
    <motion.div 
      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
      whileHover={{ x: 4 }}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${colors[player.position as keyof typeof colors]} bg-white/5 border border-white/10`}>
        {player.position?.substring(0, 1)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white truncate">{player.name}</span>
          {isCaptain && (
            <span className="px-2 py-0.5 bg-[#ffb000]/20 text-[#ffb000] text-xs font-bold rounded font-mono border border-[#ffb000]/30">
              C
            </span>
          )}
          {isVice && (
            <span className="px-2 py-0.5 bg-[#00d4ff]/20 text-[#00d4ff] text-xs font-bold rounded font-mono border border-[#00d4ff]/30">
              V
            </span>
          )}
        </div>
        <span className="text-sm text-white/50 font-mono">{player.team} • £{player.price}m</span>
      </div>
      
      <div className="text-right">
        <div className="font-bold text-[#00ff88] font-mono">{player.eventPoints} pts</div>
        <div className="text-xs text-white/50 font-mono">{player.totalPoints} total</div>
      </div>
    </motion.div>
  )
}
