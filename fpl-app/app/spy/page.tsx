'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, Users, Trophy, TrendingUp, AlertTriangle, Target } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { SplitFlapDisplay } from '../components/ui/SplitFlap'
import { useTeamStore } from '../../lib/store/teamStore'

export default function SpyPage() {
  const router = useRouter()
  const { teamData } = useTeamStore()
  const [selectedRival, setSelectedRival] = useState<number | null>(null)
  
  if (!teamData) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-white/50">Loading intelligence data...</p>
        </div>
      </AppShell>
    )
  }
  
  const mockRivals = [
    { 
      id: 1, 
      name: 'FPL Legend', 
      rank: 5234, 
      totalPoints: 1456,
      gwPoints: 67,
      captain: 'Haaland',
      transfers: 2,
      trend: 'up'
    },
    { 
      id: 2, 
      name: 'Pep Guardiola', 
      rank: 8921, 
      totalPoints: 1389,
      gwPoints: 45,
      captain: 'Salah',
      transfers: 1,
      trend: 'down'
    },
    { 
      id: 3, 
      name: 'Klopps Army', 
      rank: 12456, 
      totalPoints: 1321,
      gwPoints: 72,
      captain: 'Saka',
      transfers: 3,
      trend: 'up'
    },
  ]
  
  const yourRank = teamData.entry?.overallRank || 125432
  
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/60 hover:text-[#39ff14] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>BACK TO TERMINAL</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#39ff14]" />
            <span className="text-[#39ff14] font-bold">LIVE INTEL</span>
          </div>
        </div>
        
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">
            RIVAL INTELLIGENCE
          </h1>
          <p className="text-white/50 mt-2">Track your competition • Analyze their moves</p>
        </div>
        
        {/* Your Position */}
        <div className="bg-[#0f0f0f] rounded-xl border border-[#39ff14]/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white/40 uppercase mb-1">Your Position</div>
              <SplitFlapDisplay value={`#${yourRank.toLocaleString()}`} className="text-4xl" />
            </div>
            <div className="text-right">
              <div className="text-xs text-white/40 uppercase mb-1">League Rank</div>
              <div className="text-2xl font-bold text-[#39ff14]">#4</div>
              <div className="text-xs text-white/50">of 12 managers</div>
            </div>
          </div>
        </div>
        
        {/* Threat Analysis */}
        <div className="bg-[#ff3333]/10 border border-[#ff3333]/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ff3333] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#ff3333]">THREAT DETECTED</div>
              <p className="text-white/70 text-sm mt-1">
                <strong>Klopps Army</strong> is on a hot streak (72 pts this GW). 
                They captain differential Saka while most captained Salah. 
                If Saka outscores Salah, they could jump 3 spots ahead of you.
              </p>
            </div>
          </div>
        </div>
        
        {/* Rivals List */}
        <section className="bg-[#0f0f0f] rounded-xl border border-[#222] overflow-hidden">
          <div className="px-4 py-3 bg-[#111] border-b border-[#222]">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#39ff14]" />
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">Tracked Rivals</h3>
            </div>
          </div>
          
          <div className="divide-y divide-[#222]">
            {mockRivals.map((rival) => (
              <div 
                key={rival.id}
                className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => setSelectedRival(selectedRival === rival.id ? null : rival.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    rival.trend === 'up' ? 'bg-[#39ff14] text-black' : 'bg-[#ff3333] text-white'
                  }`}>
                    {rival.trend === 'up' ? '↑' : '↓'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-bold text-white">{rival.name}</div>
                    <div className="text-sm text-white/50">Rank: #{rival.rank.toLocaleString()}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-[#39ff14]">{rival.gwPoints} pts</div>
                    <div className="text-xs text-white/40">GW 24</div>
                  </div>
                </div>
                
                {selectedRival === rival.id && (
                  <div className="mt-4 pt-4 border-t border-[#222] grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-white/40 uppercase">Captain</div>
                      <div className="font-bold text-white">{rival.captain}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase">Transfers</div>
                      <div className="font-bold text-white">{rival.transfers}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase">Total</div>
                      <div className="font-bold text-white">{rival.totalPoints}</div>
                    </div>
                    
                    <div className="col-span-3 mt-2">
                      <button className="w-full py-2 bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] rounded-lg text-sm font-bold hover:bg-[#39ff14]/20 transition-colors">
                        VIEW FULL TEAM
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        {/* League Insights */}
        <div className="grid grid-cols-3 gap-4">
          <InsightBox icon={Trophy} label="Top Captain" value="Haaland" subtext="65% captained" />
          <InsightBox icon={TrendingUp} label="Most Transferred In" value="Palmer" subtext="+2.3m owners" />
          <InsightBox icon={Users} label="Active Managers" value="10.2M" subtext="94% played chip" />
        </div>
      </div>
    </AppShell>
  )
}

function InsightBox({ icon: Icon, label, value, subtext }: { icon: any, label: string, value: string, subtext: string }) {
  return (
    <div className="bg-[#0f0f0f] rounded-xl border border-[#222] p-4 text-center">
      <Icon className="w-5 h-5 text-[#39ff14] mx-auto mb-2" />
      <div className="text-xs text-white/40 uppercase mb-1">{label}</div>
      <div className="font-bold text-white">{value}</div>
      <div className="text-xs text-white/50">{subtext}</div>
    </div>
  )
}
