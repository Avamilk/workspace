'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Users, 
  Zap, 
  ArrowUpRight,
  Target,
  Plane,
  Radar,
  Cpu,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { AppShell } from './components/layout/AppShell'
import { SplitFlapDisplay, FlightBoardRow, ScoreBoardLarge } from './components/ui/SplitFlap'
import { TeamInput } from './components/fpl/TeamInput'
import { PlayerModal } from './components/player/PlayerModal'
import { CaptainAdvisor } from './components/ai/CaptainAdvisor'
import { useTeamStore } from '../lib/store/teamStore'
import { getTeamData } from '../lib/fpl/api'

export default function Dashboard() {
  const router = useRouter()
  const { teamId, teamData, setTeam, clearTeam } = useTeamStore()
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])
  
  const loadTeam = async (id: number) => {
    const data = await getTeamData(id)
    setTeam(id, data)
  }
  
  if (!teamId || !teamData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <TeamInput onLoad={loadTeam} />
      </div>
    )
  }
  
  const gwPoints = teamData.entry?.gameweekPoints || 45
  const totalPoints = teamData.entry?.totalPoints || 1245
  const overallRank = teamData.entry?.overallRank || 125432
  const teamValue = teamData.teamValue || 100.0
  const bank = teamData.bank || 2.1
  const transfers = teamData.transfers || 1
  const transfersCost = teamData.transfersCost || 0
  
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome / Status */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">
              WELCOME BACK, MANAGER
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Last updated: {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-lg">
            <div className="w-2 h-2 bg-[#39ff14] rounded-full animate-pulse" />
            <span className="text-sm font-bold text-[#39ff14]">SYSTEM ONLINE</span>
          </div>
        </div>
        
        {/* Live Stats Grid */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Radar className="w-4 h-4 text-[#39ff14]" />
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">
              Live Telemetry
            </h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ScoreBoardLarge 
              label="GW Points"
              value={gwPoints}
              trend="up"
            />
            <ScoreBoardLarge 
              label="Overall Rank"
              value={`#${overallRank.toLocaleString()}`}
              trend="down"
            />
            <ScoreBoardLarge 
              label="Total Points"
              value={totalPoints}
            />
            <ScoreBoardLarge 
              label="Squad Value"
              value={`£${teamValue}m`}
            />
          </div>
        </section>
        
        {/* Alerts / Notifications */}
        {transfersCost > 0 && (
          <div className="bg-[#ff3333]/10 border border-[#ff3333]/30 rounded-xl p-4 flex items-center gap-4">
            <AlertCircle className="w-6 h-6 text-[#ff3333]" />
            <div className="flex-1">
              <p className="font-bold text-[#ff3333]">TRANSFER HIT ACTIVE</p>
              <p className="text-sm text-white/60">You have taken a -{transfersCost} point hit this gameweek</p>
            </div>
          </div>
        )}
        
        {/* Flight Board - Quick Actions */}
        <section className="bg-[#0f0f0f] rounded-xl border border-[#222] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-[#222]">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#39ff14]" />
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">
                Flight Board
              </h3>
            </div>
            <div className="flex gap-8 text-xs text-white/30 uppercase tracking-wider">
              <span>Gate</span>
              <span className="ml-8">Destination</span>
              <span className="ml-auto">Status</span>
            </div>
          </div>
          
          <div className="divide-y divide-[#222]">
            <FlightBoardRow 
              gate="A1"
              destination="AI CAPTAIN SELECTION"
              time="NOW"
              status="BOARDING"
              onClick={() => router.push('/captain')}
            />
            <FlightBoardRow 
              gate="A2"
              destination="TRANSFER OPTIMIZER"
              time="12:45"
              status="ON TIME"
              onClick={() => router.push('/transfers')}
            />
            <FlightBoardRow 
              gate="A3"
              destination="RIVAL INTELLIGENCE"
              time="15:20"
              status="ON TIME"
              onClick={() => router.push('/spy')}
            />
            <FlightBoardRow 
              gate="A4"
              destination="FORMATION SCANNER"
              time="18:00"
              status="ON TIME"
              onClick={() => router.push('/rescan')}
            />
          </div>
        </section>
        
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickStat 
            icon={Zap}
            label="Transfers"
            value={transfers}
            subtext={transfersCost > 0 ? `-${transfersCost} pts` : 'Free'}
            color={transfersCost > 0 ? 'red' : 'green'}
          />
          <QuickStat 
            icon={Clock}
            label="Next Deadline"
            value="Sat"
            subtext="11:30 GMT"
            color="blue"
          />
          <QuickStat 
            icon={TrendingUp}
            label="Form"
            value="WWWLD"
            subtext="Last 5 GWs"
            color="amber"
          />
          <QuickStat 
            icon={CheckCircle2}
            label="Team Set"
            value="11/11"
            subtext="Players selected"
            color="green"
          />
        </div>
        
        {/* My Team Preview */}
        <section className="bg-[#0f0f0f] rounded-xl border border-[#222] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-[#222]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#39ff14]" />
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">
                Flight Deck
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/40">
                FORMATION: 4-3-3
              </span>
              <span className="text-xs text-[#39ff14]">
                BANK: £{bank}m
              </span>
            </div>
          </div>
          
          <div className="p-6">
            {/* Mini Pitch */}
            <div className="relative bg-[#0a3d0a] rounded-xl overflow-hidden aspect-[16/10] max-w-lg mx-auto border-2 border-[#39ff14]/20">
              {/* Field markings */}
              <div className="absolute inset-4 border border-white/10 rounded-lg" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-12 border-b-2 border-x-2 border-white/10 rounded-b-full" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 border-t-2 border-x-2 border-white/10 rounded-t-full" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/10 rounded-full" />
              
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(to right, #39ff14 1px, transparent 1px), linear-gradient(to bottom, #39ff14 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />
              
              {/* Players */}
              <div className="absolute inset-0 flex flex-col justify-around items-center py-4">
                {/* GK */}
                <PlayerNode position="GK" name="Raya" team="ARS" />
                
                {/* DEF */}
                <div className="flex gap-3">
                  <PlayerNode position="DEF" name="Saliba" team="ARS" />
                  <PlayerNode position="DEF" name="Gabriel" team="ARS" />
                  <PlayerNode position="DEF" name="VVD" team="LIV" />
                  <PlayerNode position="DEF" name="TAA" team="LIV" />
                </div>
                
                {/* MID */}
                <div className="flex gap-4">
                  <PlayerNode position="MID" name="Saka" team="ARS" captain />
                  <PlayerNode position="MID" name="Salah" team="LIV" />
                  <PlayerNode position="MID" name="Palmer" team="CHE" />
                </div>
                
                {/* FWD */}
                <div className="flex gap-4">
                  <PlayerNode position="FWD" name="Haaland" team="MCI" />
                  <PlayerNode position="FWD" name="Isak" team="NEW" />
                  <PlayerNode position="FWD" name="Watkins" team="AVL" />
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/team')}
              className="w-full mt-5 py-4 bg-transparent border-2 border-[#39ff14] text-[#39ff14] font-bold rounded-xl hover:bg-[#39ff14]/10 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] flex items-center justify-center gap-2 group"
            >
              <span>VIEW FULL FLIGHT DECK</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </section>
        
        {/* AI Captain Preview */}
        <section className="bg-gradient-to-br from-[#39ff14]/5 to-transparent rounded-xl border border-[#39ff14]/20 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-[#39ff14]" />
            <h3 className="text-sm font-bold text-[#39ff14] uppercase tracking-wider">
              AI System Recommendation
            </h3>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#39ff14]/20 rounded-full flex items-center justify-center border-2 border-[#39ff14]">
              <span className="text-2xl font-bold text-[#39ff14]">S</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-lg">Bukayo Saka</p>
              <p className="text-white/60">ARS vs BRE (H) • Projected: 8.4 pts</p>
            </div>
            <button 
              onClick={() => router.push('/captain')}
              className="px-6 py-3 bg-[#39ff14] text-black font-bold rounded-xl hover:bg-[#2dd412] transition-colors"
            >
              VIEW ANALYSIS
            </button>
          </div>
        </section>
      </div>
      
      <PlayerModal 
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </AppShell>
  )
}

// Helper Components

function QuickStat({ icon: Icon, label, value, subtext, color }: { 
  icon: any
  label: string
  value: string | number
  subtext: string
  color: 'green' | 'amber' | 'blue' | 'red'
}) {
  const colors = {
    green: 'text-[#39ff14] bg-[#39ff14]/10 border-[#39ff14]/30',
    amber: 'text-[#ffb000] bg-[#ffb000]/10 border-[#ffb000]/30',
    blue: 'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/30',
    red: 'text-[#ff3333] bg-[#ff3333]/10 border-[#ff3333]/30'
  }
  
  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider opacity-60">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-60">{subtext}</div>
    </div>
  )
}

function PlayerNode({ position, name, team, captain }: { 
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  name: string
  team: string
  captain?: boolean 
}) {
  const colors = {
    GK: 'bg-[#ffb000] text-black',
    DEF: 'bg-[#00d4ff] text-black',
    MID: 'bg-[#39ff14] text-black',
    FWD: 'bg-[#ff3333] text-white'
  }
  
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`relative w-10 h-10 ${colors[position]} rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${captain ? 'ring-2 ring-[#ffb000] ring-offset-2 ring-offset-[#0a3d0a]' : ''}`}>
        {team.substring(0, 1)}
        {captain && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#ffb000] rounded-full flex items-center justify-center text-[8px] font-bold text-black shadow-lg">
            C
          </div>
        )}
      </div>
      <span className="text-[10px] font-medium text-white/90 bg-black/40 px-1.5 py-0.5 rounded whitespace-nowrap">
        {name.substring(0, 6)}
      </span>
    </div>
  )
}
