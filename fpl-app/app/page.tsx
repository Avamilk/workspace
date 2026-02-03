'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from './components/layout/AppShell'
import { LEDText } from './components/ui/LEDText'
import { PitchView } from './components/pitch/PitchView'
import { CaptainAdvisor } from './components/ai/CaptainAdvisor'
import { TeamInput } from './components/fpl/TeamInput'
import { PlayerModal } from './components/player/PlayerModal'
import { Scan } from 'lucide-react'
import { getTeamData } from '../lib/fpl/api'
import { useTeamStore } from '../lib/store/teamStore'

export default function Dashboard() {
  const router = useRouter()
  const { teamId, teamData, setTeam, clearTeam } = useTeamStore()
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)

  const loadTeam = async (id: number) => {
    const data = await getTeamData(id)
    setTeam(id, data)
  }

  if (!teamId || !teamData) {
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center">
          <TeamInput onLoad={loadTeam} />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="mb-6">
        <LEDText size="xl">{teamData.entry.name.toUpperCase()}</LEDText>
        <LEDText color="amber" size="md">
          GW {teamData.entry.gameweek} • Rank: #{teamData.entry.overallRank?.toLocaleString()}
        </LEDText>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="cyber-panel">
            <p className="text-honey-gold font-led text-sm">MY TEAM</p>
            <div className="mt-4 flex justify-center">
              <PitchView 
                players={teamData.players} 
                onPlayerClick={setSelectedPlayer}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CaptainAdvisor teamData={teamData.players} />

          {/* AI Optimizer */}
          <div className="cyber-panel p-4 text-center" style={{ borderColor: 'rgba(245, 158, 11, 0.5)' }}>
            <p className="text-honey-gold font-led text-sm">AI OPTIMIZER</p>
            <p className="text-honey-amber/60 font-led text-xs mt-2 mb-3">
              Let AI optimize your formation & transfers
            </p>
            <button 
              onClick={() => router.push('/rescan')} 
              className="cyber-button w-full py-3 animate-pulse"
            >
              <Scan className="w-4 h-4 inline mr-2" />
              RESCAN PITCH
            </button>
          </div>
          
          <div className="cyber-panel" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <p className="text-honey-gold font-led text-sm">SQUAD VALUE</p>
            <div className="mt-4 space-y-2 font-led text-sm">
              <div className="flex justify-between">
                <span className="text-honey-amber/60">Team Value</span>
                <span className="text-honey-gold">£{teamData.teamValue}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-honey-amber/60">Bank</span>
                <span className="text-honey-gold">£{teamData.bank}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-honey-amber/60">Total Points</span>
                <span className="text-honey-gold">{teamData.entry.totalPoints}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={clearTeam}
            className="cyber-button w-full text-sm"
            style={{ background: 'rgba(255, 51, 51, 0.2)', borderColor: 'rgba(255, 51, 51, 0.3)', color: '#ff3333' }}
          >
            LOAD DIFFERENT TEAM
          </button>
        </div>
      </div>

      <PlayerModal 
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </AppShell>
  )
}
