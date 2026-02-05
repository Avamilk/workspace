'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Search, ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, AlertCircle, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { AppShell } from '../components/layout/AppShell'
import { GlassCard, NeonText, NeonHeading, NavButton, StatBar } from '../components/glass'
import { useTeamStore } from '../../lib/store/teamStore'

export default function TransfersPage() {
  const router = useRouter()
  const { teamData } = useTeamStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  
  if (!teamData) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <NeonText color="white">Loading team data...</NeonText>
        </div>
      </AppShell>
    )
  }
  
  const bank = teamData.bank || 2.1
  const transfers = teamData.transfers || 1
  const transfersCost = teamData.transfersCost || 0
  
  const positions = ['GK', 'DEF', 'MID', 'FWD']
  
  const mockPlayers = [
    { id: 1, name: 'Saka', team: 'ARS', position: 'MID', price: 10.5, form: 8.4, change: 0.2 },
    { id: 2, name: 'Palmer', team: 'CHE', position: 'MID', price: 6.2, form: 7.8, change: 0.3 },
    { id: 3, name: 'Gordon', team: 'NEW', position: 'MID', price: 7.5, form: 6.9, change: -0.1 },
    { id: 4, name: 'Watkins', team: 'AVL', position: 'FWD', price: 8.8, form: 7.2, change: 0.1 },
    { id: 5, name: 'Solanke', team: 'BOU', position: 'FWD', price: 7.2, form: 6.5, change: 0.0 },
  ]
  
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <NavButton 
            icon={ArrowLeft}
            onClick={() => router.back()}
            variant="ghost"
          >
            BACK
          </NavButton>
        </div>
        
        {/* Title */}
        <div className="text-center">
          <NeonHeading as="h1" size="3xl" color="green" glow>
            TRANSFER OPTIMIZER
          </NeonHeading>
          <p className="text-white/50 mt-2 font-mono text-sm">
            Smart suggestions based on fixtures, form & value
          </p>
        </div>
        
        {/* Budget & Transfers */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard variant="cyan">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-4 h-4 text-[#00d4ff]" />
              <NeonText size="xs" color="cyan">Bank</NeonText>
            </div>
            <NeonHeading as="h3" size="2xl" color="cyan" glow>
              £{bank}m
            </NeonHeading>
            <StatBar value={bank} max={15} size="sm" showValue={false} color="cyan" className="mt-2" />
          </GlassCard>
          
          <GlassCard variant={transfersCost > 0 ? 'magenta' : 'default'}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#00ff88]" />
              <NeonText size="xs" color={transfersCost > 0 ? 'magenta' : 'green'}>
                Transfers
              </NeonText>
            </div>
            <NeonHeading as="h3" size="2xl" color={transfersCost > 0 ? 'magenta' : 'green'} glow>
              {transfers}
            </NeonHeading>
            <span className="text-xs text-white/40 font-mono">left</span>
            {transfersCost > 0 && (
              <div className="text-xs text-[#ff0066] mt-1 font-mono">-{transfersCost} pts per extra</div>
            )}
          </GlassCard>
        </div>
        
        {/* AI Suggestion Alert */}
        <GlassCard variant="amber" className="flex items-start gap-4">
          <div className="p-2 bg-[#ffb000]/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-[#ffb000]" />
          </div>
          <div>
            <NeonText size="sm" color="amber" glow>AI SUGGESTION</NeonText>
            <p className="text-white/70 text-sm mt-1">
              Sell <span className="text-[#ff0066] font-bold">Salah (£12.8m)</span> → Buy <span className="text-[#00ff88] font-bold">Saka (£10.5m)</span>. 
              Save £2.3m, better fixtures, similar expected points. 
              Use saved funds to upgrade defense.
            </p>
          </div>
        </GlassCard>
        
        {/* Search & Filter */}
        <GlassCard className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search players..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00ff88]/50 font-mono transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/40" />
            <div className="flex gap-2 flex-wrap">
              {positions.map(pos => (
                <button
                  key={pos}
                  onClick={() => setSelectedPosition(selectedPosition === pos ? null : pos)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all font-mono ${
                    selectedPosition === pos
                      ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.4)]'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
        
        {/* Player List */}
        <GlassCard className="p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <NeonText size="xs" color="green">Top Transfers In</NeonText>
            <span className="text-xs text-white/30 font-mono">Sorted by form</span>
          </div>
          
          <div className="divide-y divide-white/5">
            {mockPlayers.map((player, index) => (
              <motion.div 
                key={player.id}
                className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Position badge */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  player.position === 'GK' ? 'bg-[#ffb000] text-black' :
                  player.position === 'DEF' ? 'bg-[#00d4ff] text-black' :
                  player.position === 'MID' ? 'bg-[#00ff88] text-black' :
                  'bg-[#ff0066] text-white'
                }`}>
                  {player.position}
                </div>
                
                {/* Player info */}
                <div className="flex-1">
                  <div className="font-bold text-white">{player.name}</div>
                  <div className="text-sm text-white/50 font-mono">{player.team} • £{player.price}m</div>
                </div>
                
                {/* Stats */}
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="font-bold text-white font-mono">{player.form}</span>
                    <span className="text-xs text-white/40 font-mono">form</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-mono ${
                    player.change > 0 ? 'text-[#00ff88]' : 
                    player.change < 0 ? 'text-[#ff0066]' : 'text-white/50'
                  }`}>
                    {player.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : 
                     player.change < 0 ? <ArrowDownRight className="w-3 h-3" /> : null}
                    {player.change > 0 ? '+' : ''}{player.change}
                  </div>
                </div>
                
                {/* Buy button */}
                <NavButton
                  variant="active"
                  color="green"
                  size="sm"
                >
                  BUY
                </NavButton>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  )
}
