'use client'

import { useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { LEDText } from '../components/ui/LEDText'
import { Trophy, Users, TrendingUp, Star, Shield, Zap, Target } from 'lucide-react'

// Mock league data
const leagueData = {
  name: 'The Nightstalkers',
  gameweek: 24,
  standings: [
    {
      rank: 1,
      lastRank: 2,
      team: 'FPL Legend',
      manager: 'Alex',
      gwPts: 78,
      total: 1567,
      value: 104.5,
      bank: 0.8,
      captain: 'Haaland',
      chips: ['WC', 'TC']
    },
    {
      rank: 2,
      lastRank: 1,
      team: 'Top 10k Hopeful',
      manager: 'Sam',
      gwPts: 65,
      total: 1545,
      value: 102.1,
      bank: 2.3,
      captain: 'Salah',
      chips: ['BB']
    },
    {
      rank: 3,
      lastRank: 4,
      team: 'Differential King',
      manager: 'Jordan',
      gwPts: 82,
      total: 1523,
      value: 103.8,
      bank: 1.5,
      captain: 'Palmer',
      chips: ['FH']
    },
    {
      rank: 4,
      lastRank: 3,
      team: 'Your Team',
      manager: 'You',
      gwPts: 71,
      total: 1512,
      value: 104.2,
      bank: 2.1,
      captain: 'Saka',
      chips: []
    },
    {
      rank: 5,
      lastRank: 5,
      team: 'Casual FC',
      manager: 'Mike',
      gwPts: 58,
      total: 1489,
      value: 101.2,
      bank: 3.5,
      captain: 'Haaland',
      chips: ['WC', 'BB', 'TC', 'FH']
    },
  ]
}

// Mock GW story data
const gwStory = {
  topCaptain: { player: 'Haaland', owners: 3, points: 26 },
  differential: { player: 'Palmer', owners: 1, points: 19 },
  biggestRiser: { team: 'Differential King', gwPts: 82, rankChange: '+1' },
  biggestFaller: { team: 'Top 10k Hopeful', gwPts: 65, rankChange: '-1' },
  chipUsage: [
    { manager: 'FPL Legend', chip: 'Triple Captain', player: 'Haaland', points: 52 }
  ],
  benchHappiness: [
    { manager: 'Casual FC', player: 'Watkins', points: 13, onBench: true }
  ]
}

// Mock team ownership data
const teamOwnership: Record<string, { manager: string; players: string[]; count: number }[]> = {
  ARS: [
    { manager: 'FPL Legend', players: ['Saka', 'Havertz', 'Raya'], count: 3 },
    { manager: 'You', players: ['Saka', 'Gabriel', 'Raya'], count: 3 },
    { manager: 'Top 10k Hopeful', players: ['Saka'], count: 1 },
    { manager: 'Differential King', players: ['Gabriel'], count: 1 },
  ],
  MCI: [
    { manager: 'FPL Legend', players: ['Haaland', 'Foden'], count: 2 },
    { manager: 'You', players: ['Haaland', 'De Bruyne'], count: 2 },
    { manager: 'Top 10k Hopeful', players: ['Haaland', 'Foden', 'Ake'], count: 3 },
    { manager: 'Casual FC', players: ['Haaland'], count: 1 },
  ]
}

type View = 'table' | 'story' | 'rivals'

export default function LeaguePage() {
  const [view, setView] = useState<View>('table')
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const getRankChange = (current: number, last: number) => {
    const diff = last - current
    if (diff > 0) return { arrow: '▲', color: 'text-led-green', text: `+${diff}` }
    if (diff < 0) return { arrow: '▼', color: 'text-led-red', text: `${diff}` }
    return { arrow: '-', color: 'text-led-dim', text: '' }
  }

  const getChipIcon = (chip: string) => {
    switch(chip) {
      case 'WC': return <span className="text-led-amber text-xs font-led" title="Wild Card">WC</span>
      case 'TC': return <Zap className="w-3 h-3 text-led-amber" title="Triple Captain" />
      case 'BB': return <Shield className="w-3 h-3 text-led-amber" title="Bench Boost" />
      case 'FH': return <Target className="w-3 h-3 text-led-amber" title="Free Hit" />
      default: return null
    }
  }

  return (
    <AppShell>
      <div className="mb-6">
        <LEDText size="xl">{leagueData.name.toUpperCase()}</LEDText>
        <LEDText color="amber" size="md">Gameweek {leagueData.gameweek}</LEDText>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setView('table')} 
          className={`led-button text-sm py-2 px-4 ${view === 'table' ? 'bg-led-green text-panel-dark' : ''}`}
        >
          <Trophy className="w-4 h-4 inline mr-2" /> TABLE
        </button>
        <button 
          onClick={() => setView('story')} 
          className={`led-button text-sm py-2 px-4 ${view === 'story' ? 'bg-led-green text-panel-dark' : ''}`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" /> GW STORY
        </button>
        <button 
          onClick={() => setView('rivals')} 
          className={`led-button text-sm py-2 px-4 ${view === 'rivals' ? 'bg-led-green text-panel-dark' : ''}`}
        >
          <Users className="w-4 h-4 inline mr-2" /> RIVALS
        </button>
      </div>

      {/* TABLE VIEW */}
      {view === 'table' && (
        <div className="panel" style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-led-dim/20">
                  <th className="text-left py-3 px-2 font-led text-led-dim text-sm">RANK</th>
                  <th className="text-left py-3 px-2 font-led text-led-dim text-sm">TEAM</th>
                  <th className="text-center py-3 px-2 font-led text-led-dim text-sm">GW</th>
                  <th className="text-center py-3 px-2 font-led text-led-dim text-sm">TOTAL</th>
                  <th className="text-center py-3 px-2 font-led text-led-dim text-sm">VALUE</th>
                  <th className="text-center py-3 px-2 font-led text-led-dim text-sm">CAPTAIN</th>
                  <th className="text-center py-3 px-2 font-led text-led-dim text-sm">CHIPS</th>
                </tr>
              </thead>
              <tbody>
                {leagueData.standings.map((team) => {
                  const change = getRankChange(team.rank, team.lastRank)
                  const isYou = team.manager === 'You'
                  return (
                    <tr 
                      key={team.rank} 
                      className={`border-b border-led-dim/10 hover:bg-panel-dark/30 ${isYou ? 'bg-led-green/5' : ''}`}
                    >
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-led text-led-green text-lg">{team.rank}</span>
                          <span className={`text-xs ${change.color}`}>{change.arrow} {change.text}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div>
                          <p className={`font-led ${isYou ? 'text-led-amber' : 'text-led-green'}`}>{team.team}</p>
                          <p className="text-led-dim text-xs font-led">{team.manager}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="font-led text-led-amber">{team.gwPts}</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="font-led text-led-green">{team.total}</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="font-led text-led-dim text-sm">£{team.value}m</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="font-led text-led-amber text-sm">{team.captain}</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex justify-center gap-1">
                          {team.chips.map((chip, i) => (
                            <span key={i}>{getChipIcon(chip)}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GW STORY VIEW */}
      {view === 'story' && (
        <div className="space-y-4">
          {/* Top Captain */}
          <div className="panel" style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}>
            <LEDText color="green" size="md">TOP CAPTAIN</LEDText>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="led-text text-2xl text-led-green">{gwStory.topCaptain.player}</p>
                <p className="text-led-amber font-led">{gwStory.topCaptain.points} points</p>
              </div>
              <div className="text-right">
                <p className="text-led-dim font-led text-sm">Owned by</p>
                <p className="led-text text-xl text-led-amber">{gwStory.topCaptain.owners} managers</p>
              </div>
            </div>
          </div>

          {/* Differential */}
          <div className="panel" style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}>
            <LEDText color="amber" size="md">DIFFERENTIAL OF THE WEEK</LEDText>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="led-text text-2xl text-led-amber">{gwStory.differential.player}</p>
                <p className="text-led-green font-led">{gwStory.differential.points} points</p>
              </div>
              <div className="text-right">
                <p className="text-led-dim font-led text-sm">Only owned by</p>
                <p className="led-text text-xl text-led-red">{gwStory.differential.owners} manager</p>
              </div>
            </div>
          </div>

          {/* Biggest Moves */}
          <div className="grid grid-cols-2 gap-4">
            <div className="panel" style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}>
              <LEDText color="green" size="sm">BIGGEST RISER</LEDText>
              <p className="font-led text-led-green mt-2">{gwStory.biggestRiser.team}</p>
              <p className="text-led-amber font-led">{gwStory.biggestRiser.gwPts} pts</p>
              <p className="text-led-green font-led text-sm">{gwStory.biggestRiser.rankChange}</p>
            </div>
            <div className="panel" style={{ borderColor: 'rgba(255, 51, 51, 0.3)' }}>
              <LEDText color="red" size="sm">BIGGEST FALLER</LEDText>
              <p className="font-led text-led-green mt-2">{gwStory.biggestFaller.team}</p>
              <p className="text-led-amber font-led">{gwStory.biggestFaller.gwPts} pts</p>
              <p className="text-led-red font-led text-sm">{gwStory.biggestFaller.rankChange}</p>
            </div>
          </div>

          {/* Chip Usage */}
          {gwStory.chipUsage.length > 0 && (
            <div className="panel" style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}>
              <LEDText color="amber" size="md">CHIP USAGE</LEDText>
              {gwStory.chipUsage.map((chip, i) => (
                <div key={i} className="mt-2 p-2 bg-panel-dark/50 rounded">
                  <p className="font-led text-led-green">{chip.manager} used <span className="text-led-amber">{chip.chip}</span></p>
                  <p className="text-led-dim font-led text-sm">on {chip.player} = {chip.points} points</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RIVALS VIEW */}
      {view === 'rivals' && (
        <div className="space-y-4">
          {!selectedTeam ? (
            <>
              <p className="text-led-dim font-led mb-4">Select a team to see ownership breakdown</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(teamOwnership).map(team => (
                  <button 
                    key={team} 
                    onClick={() => setSelectedTeam(team)}
                    className="panel text-center py-8 transition-colors"
                    style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}
                  >
                    <LEDText size="xl">{team}</LEDText>
                    <p className="text-led-amber font-led mt-2">
                      {teamOwnership[team].reduce((acc, m) => acc + m.count, 0)} players owned
                    </p>
                    <p className="text-led-dim font-led text-sm mt-1">
                      by {teamOwnership[team].length} managers
                    </p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div>
              <button 
                onClick={() => setSelectedTeam(null)} 
                className="led-button-amber text-sm mb-4"
              >
                ← BACK TO TEAMS
              </button>
              <div className="panel" style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}>
                <LEDText color="amber" size="xl">{selectedTeam} OWNERSHIP</LEDText>
                <div className="mt-6 space-y-4">
                  {teamOwnership[selectedTeam].map((manager, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-panel-dark/50 rounded">
                      <div>
                        <p className="font-led text-led-green">{manager.manager}</p>
                        <p className="text-led-dim font-led text-sm">
                          {manager.players.join(', ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="led-text text-xl text-led-amber">{manager.count}</span>
                        <p className="text-led-dim font-led text-xs">players</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(74, 74, 90, 0.2)' }}>
                  <p className="text-led-dim font-led text-center">
                    Total: {teamOwnership[selectedTeam].reduce((acc, m) => acc + m.count, 0)} {selectedTeam} players across league
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AppShell>
  )
}
