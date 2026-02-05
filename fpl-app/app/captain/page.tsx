'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Zap, Trophy, TrendingUp, Users, Sparkles, Crown } from 'lucide-react'
import { motion } from 'framer-motion'
import { AppShell } from '../components/layout/AppShell'
import { GlassCard, NeonText, NeonHeading, NavButton, StatBar, CircularStat } from '../components/glass'
import { useTeamStore } from '../../lib/store/teamStore'

export default function CaptainPage() {
  const router = useRouter()
  const { teamData } = useTeamStore()
  const [selectedCaptain, setSelectedCaptain] = useState<number | null>(null)
  
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
  const captainCandidates = players
    .filter((p: any) => p.position !== 'GK')
    .sort((a: any, b: any) => (b.form || 0) - (a.form || 0))
    .slice(0, 5)
  
  const aiRecommendation = captainCandidates[0]
  
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
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00ff88]" />
            <NeonText color="green" glow>AI POWERED</NeonText>
          </div>
        </div>
        
        {/* Title */}
        <div className="text-center">
          <NeonHeading as="h1" size="3xl" color="green" glow>
            AI CAPTAIN SELECTION
          </NeonHeading>
          <p className="text-white/50 mt-2 font-mono text-sm">
            Gameweek 24 • AI Analysis Complete
          </p>
        </div>
        
        {/* AI Recommendation */}
        <GlassCard variant="default" className="relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#00ff88]" />
              <NeonText color="green" size="sm" glow>
                SYSTEM RECOMMENDATION
              </NeonText>
            </div>
            
            {aiRecommendation && (
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Player Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#00ff88]/30 to-[#00ff88]/5 rounded-full flex items-center justify-center border-2 border-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                    <span className="text-4xl font-bold text-[#00ff88] font-mono">
                      {aiRecommendation.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Crown className="w-8 h-8 text-[#ffb000] fill-[#ffb000] drop-shadow-lg" />
                  </div>
                </div>
                
                {/* Player Info */}
                <div className="flex-1 text-center md:text-left">
                  <NeonHeading as="h3" size="2xl" color="white">
                    {aiRecommendation.name}
                  </NeonHeading>
                  <p className="text-white/60 font-mono">
                    {aiRecommendation.team} • {aiRecommendation.position}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start">
                    <StatBadge label="Form" value={aiRecommendation.form || 'N/A'} color="green" />
                    <StatBadge label="xG" value={aiRecommendation.xG || 'N/A'} color="cyan" />
                    <StatBadge label="vs" value={aiRecommendation.nextFixture || 'TBD'} color="amber" />
                  </div>
                </div>
                
                {/* Projected Points */}
                <div className="text-center p-4 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/30">
                  <div className="text-sm text-white/40 font-mono uppercase mb-1">Projected</div>
                  <NeonHeading as="h3" size="3xl" color="green" glow>
                    8.4
                  </NeonHeading>
                  <div className="text-sm text-white/40 font-mono">points</div>
                </div>
              </div>
            )}
            
            <NavButton
              onClick={() => setSelectedCaptain(aiRecommendation?.id)}
              icon={Trophy}
              variant="active"
              color="amber"
              size="lg"
              fullWidth
              className="mt-6"
            >
              CONFIRM AS CAPTAIN
            </NavButton>
          </div>
        </GlassCard>
        
        {/* Alternative Options */}
        <GlassCard className="p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00ff88]" />
              <NeonText size="xs" color="white">Alternative Options</NeonText>
            </div>
          </div>
          
          <div className="divide-y divide-white/5">
            {captainCandidates.slice(1).map((player: any, index: number) => (
              <motion.div 
                key={player.id}
                className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer"
                whileHover={{ x: 4 }}
                onClick={() => setSelectedCaptain(player.id)}
              >
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center font-bold text-white border border-white/10">
                  {index + 2}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white">{player.name}</div>
                  <div className="text-sm text-white/50 font-mono">{player.team} • {player.position}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#00ff88] font-mono">{player.form || 'N/A'} form</div>
                  <div className="text-xs text-white/40 font-mono">Proj: {(7.2 - index * 0.5).toFixed(1)} pts</div>
                </div>
                <NavButton
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setSelectedCaptain(player.id)
                  }}
                  variant="default"
                  color="green"
                  size="sm"
                >
                  SELECT
                </NavButton>
              </motion.div>
            ))}
          </div>
        </GlassCard>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <StatBox icon={TrendingUp} label="Top Form" value="Salah" subtext="8.4 avg" color="green" />
          <StatBox icon={Zap} label="Best Fixture" value="Saka" subtext="ARS vs BRE" color="cyan" />
          <StatBox icon={Trophy} label="Most Capped" value="Haaland" subtext="45% owners" color="amber" />
        </div>
      </div>
    </AppShell>
  )
}

function StatBadge({ label, value, color }: { label: string, value: string | number, color: 'green' | 'cyan' | 'amber' | 'magenta' }) {
  const colors = {
    green: 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30',
    cyan: 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30',
    amber: 'bg-[#ffb000]/20 text-[#ffb000] border-[#ffb000]/30',
    magenta: 'bg-[#ff0066]/20 text-[#ff0066] border-[#ff0066]/30',
  }

  return (
    <div className={`px-3 py-1.5 rounded-lg border ${colors[color]} font-mono text-sm`}>
      <span className="text-white/50">{label}:</span> <span className="font-bold">{value}</span>
    </div>
  )
}

function StatBox({ 
  icon: Icon, 
  label, 
  value, 
  subtext,
  color = 'green'
}: { 
  icon: any
  label: string
  value: string
  subtext: string
  color?: 'green' | 'cyan' | 'amber' | 'magenta'
}) {
  const iconColors = {
    green: 'text-[#00ff88]',
    cyan: 'text-[#00d4ff]',
    amber: 'text-[#ffb000]',
    magenta: 'text-[#ff0066]',
  }

  return (
    <GlassCard className="text-center p-4">
      <Icon className={`w-5 h-5 mx-auto mb-2 ${iconColors[color]}`} />
      <div className="text-xs text-white/40 uppercase font-mono mb-1">{label}</div>
      <div className="font-bold text-white">{value}</div>
      <div className="text-xs text-white/50 font-mono">{subtext}</div>
    </GlassCard>
  )
}
