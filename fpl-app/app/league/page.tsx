'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Trophy, Users, TrendingUp, Medal, Target, Crown, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { AppShell } from '../components/layout/AppShell'
import { GlassCard, NeonText, NeonHeading, NavButton } from '../components/glass'
import { useTeamStore } from '../../lib/store/teamStore'

export default function LeaguePage() {
  const router = useRouter()
  const { teamData } = useTeamStore()
  const [activeTab, setActiveTab] = useState<'classic' | 'h2h' | 'cup'>('classic')
  
  if (!teamData) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <NeonText color="white">Loading leagues...</NeonText>
        </div>
      </AppShell>
    )
  }
  
  const mockLeagues = [
    { id: 1, name: 'Work League', rank: 4, total: 12, points: 1245, trend: 'up', gap: -45 },
    { id: 2, name: 'Family FPL', rank: 2, total: 8, points: 1245, trend: 'same', gap: -12 },
    { id: 3, name: 'Global', rank: 125432, total: 10000000, points: 1245, trend: 'down', gap: null },
  ]
  
  const mockH2H = [
    { gameweek: 24, opponent: 'FPL Legend', result: 'W', score: '45-32', points: 3 },
    { gameweek: 23, opponent: 'Pep Guardiola', result: 'L', score: '28-51', points: 0 },
    { gameweek: 22, opponent: 'Klopps Army', result: 'W', score: '67-45', points: 3 },
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
            LEAGUES & CUPS
          </NeonHeading>
          <p className="text-white/50 mt-2 font-mono text-sm">
            Track your rankings across all competitions
          </p>
        </div>
        
        {/* Total Points Card */}
        <GlassCard variant="default" className="text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ff88]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <NeonText size="xs" color="green" glow className="uppercase">Total Points</NeonText>
            <NeonHeading as="h2" size="3xl" color="green" glow className="my-2">
              1,245
            </NeonHeading>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00ff88]" />
              <span className="text-sm text-[#00ff88] font-mono">+45 from last GW</span>
            </div>
          </div>
        </GlassCard>
        
        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: 'classic', label: 'Classic', icon: Trophy },
            { id: 'h2h', label: 'Head to Head', icon: Target },
            { id: 'cup', label: 'Cup', icon: Medal },
          ].map((tab) => (
            <NavButton
              key={tab.id}
              icon={tab.icon}
              onClick={() => setActiveTab(tab.id as any)}
              variant={activeTab === tab.id ? 'active' : 'default'}
              color="green"
              fullWidth
              size="sm"
            >
              {tab.label}
            </NavButton>
          ))}
        </div>
        
        {/* Classic Leagues */}
        {activeTab === 'classic' && (
          <div className="space-y-3">
            {mockLeagues.map((league, index) => (
              <motion.div
                key={league.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard 
                  className={`p-4 ${index === 0 ? 'border-l-[#ffb000]' : index === 1 ? 'border-l-[#c0c0c0]' : index === 2 ? 'border-l-[#cd7f32]' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Rank badge */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono ${
                        league.rank === 1 ? 'bg-[#ffb000]/20 text-[#ffb000] border border-[#ffb000]/30' :
                        league.rank === 2 ? 'bg-[#c0c0c0]/20 text-[#c0c0c0] border border-[#c0c0c0]/30' :
                        league.rank === 3 ? 'bg-[#cd7f32]/20 text-[#cd7f32] border border-[#cd7f32]/30' :
                        'bg-white/5 text-white/50'
                      }`}>
                        {league.rank <= 3 && league.total <= 100 ? (
                          <Crown className={`w-5 h-5 ${
                            league.rank === 1 ? 'text-[#ffb000]' :
                            league.rank === 2 ? 'text-[#c0c0c0]' :
                            'text-[#cd7f32]'
                          }`} />
                        ) : (
                          league.rank
                        )}
                      </div>
                      
                      <div>
                        <div className="font-bold text-white">{league.name}</div>
                        <div className="text-sm text-white/50 font-mono">
                          Rank {league.rank} of {league.total.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <div className={`w-2 h-2 rounded-full ${
                          league.trend === 'up' ? 'bg-[#00ff88] shadow-[0_0_8px_#00ff88]' :
                          league.trend === 'down' ? 'bg-[#ff0066] shadow-[0_0_8px_#ff0066]' : 'bg-[#ffb000]'
                        }`} />
                        <NeonText color={league.rank <= 3 ? 'amber' : 'green'} glow={league.rank <= 3}>
                          #{league.rank.toLocaleString()}
                        </NeonText>
                      </div>
                      {league.gap !== null && (
                        <div className={`text-xs font-mono ${league.gap < 0 ? 'text-[#00ff88]' : 'text-[#ff0066]'}`}>
                          {league.gap < 0 ? '↑' : '↓'} {Math.abs(league.gap)} pts to 1st
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <NavButton variant="default" color="cyan" fullWidth size="sm">
                      VIEW TABLE
                    </NavButton>
                    <NavButton variant="default" color="green" fullWidth size="sm">
                      RIVALS
                    </NavButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Head to Head */}
        {activeTab === 'h2h' && (
          <GlassCard className="p-0 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10">
              <NeonText size="xs" color="cyan">Recent Matches</NeonText>
            </div>
            
            <div className="divide-y divide-white/5">
              {mockH2H.map((match, idx) => (
                <motion.div 
                  key={idx} 
                  className="p-4 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/40 font-mono">GW {match.gameweek}</div>
                      <div className="font-bold text-white">{match.opponent}</div>
                    </div>
                    
                    <div className="text-center">
                      <NeonText 
                        color={match.result === 'W' ? 'green' : 'magenta'} 
                        glow
                      >
                        {match.score}
                      </NeonText>
                      <div className={`text-sm font-mono ${
                        match.result === 'W' ? 'text-[#00ff88]' : 'text-[#ff0066]'
                      }`}>
                        {match.result === 'W' ? 'WIN' : 'LOSS'}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-white/40 font-mono">Points</div>
                      <div className="font-bold text-[#00ff88] font-mono">+{match.points}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/60 font-mono">Season Record</span>
                <span className="font-bold text-white font-mono">14W - 6L - 4D</span>
              </div>
            </div>
          </GlassCard>
        )}
        
        {/* Cup */}
        {activeTab === 'cup' && (
          <GlassCard className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#ffb000]/20 flex items-center justify-center border border-[#ffb000]/30">
              <Medal className="w-10 h-10 text-[#ffb000]" />
            </div>
            <NeonHeading as="h3" size="xl" color="amber" glow className="mb-2">
              FPL Cup
            </NeonHeading>
            <p className="text-white/60 mb-4 font-mono">You were eliminated in Round 5</p>
            <NeonHeading as="h3" size="3xl" color="amber" glow>
              #4,567
            </NeonHeading>
            <p className="text-sm text-white/40 mt-1 font-mono">Final Rank</p>
            
            <NavButton
              variant="default"
              color="amber"
              fullWidth
              className="mt-6"
            >
              VIEW CUP HISTORY
            </NavButton>
          </GlassCard>
        )}
      </div>
    </AppShell>
  )
}
