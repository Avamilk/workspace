'use client'

import { useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { LEDText } from '../components/ui/LEDText'
import { Eye, Lock, TrendingUp, DollarSign, Brain, Shield, X } from 'lucide-react'

const spyOptions = [
  { 
    id: 'basic', 
    name: 'BASIC SCOUT', 
    desc: 'Current team & formation', 
    cost: 0, 
    icon: Eye, 
    color: 'text-led-green', 
    border: 'border-led-green' 
  },
  { 
    id: 'deep', 
    name: 'DEEP COVER', 
    desc: 'Transfer history & trends', 
    cost: 1, 
    icon: Lock, 
    color: 'text-led-amber', 
    border: 'border-led-amber' 
  },
  { 
    id: 'threat', 
    name: 'THREAT ANALYSIS', 
    desc: 'Differentials vs your team', 
    cost: 1, 
    icon: Shield, 
    color: 'text-led-amber', 
    border: 'border-led-amber' 
  },
  { 
    id: 'financial', 
    name: 'FINANCIAL INTEL', 
    desc: 'Team value, bank, P&L', 
    cost: 2, 
    icon: DollarSign, 
    color: 'text-led-amber', 
    border: 'border-led-amber' 
  },
  { 
    id: 'predictive', 
    name: 'PREDICTIVE MODEL', 
    desc: 'AI predicts their next move', 
    cost: 3, 
    icon: Brain, 
    color: 'text-led-red', 
    border: 'border-led-red' 
  }
]

const mockTargets = [
  { id: '1', name: 'FPL Legend', rank: 456, points: 1523, teamValue: 104.5 },
  { id: '2', name: 'Top 10k Hopeful', rank: 8942, points: 1456, teamValue: 102.1 },
  { id: '3', name: 'Differential King', rank: 2341, points: 1489, teamValue: 103.8 },
]

// Mock intel data
const mockIntel = {
  basic: {
    target: 'FPL Legend',
    formation: '3-4-3',
    players: [
      { name: 'Haaland', team: 'MCI', pos: 'FWD', pts: 13 },
      { name: 'Salah', team: 'LIV', pos: 'FWD', pts: 10 },
      { name: 'Saka', team: 'ARS', pos: 'FWD', pts: 12 },
      { name: 'De Bruyne', team: 'MCI', pos: 'MID', pts: 8 },
      { name: 'Palmer', team: 'CHE', pos: 'MID', pts: 9 },
      { name: 'Rice', team: 'ARS', pos: 'MID', pts: 6 },
      { name: 'Son', team: 'TOT', pos: 'MID', pts: 7 },
      { name: 'Trippier', team: 'NEW', pos: 'DEF', pts: 8 },
      { name: 'Van Dijk', team: 'LIV', pos: 'DEF', pts: 7 },
      { name: 'Gabriel', team: 'ARS', pos: 'DEF', pts: 6 },
      { name: 'Raya', team: 'ARS', pos: 'GK', pts: 6 },
    ],
    captain: 'Haaland',
    vice: 'Salah'
  },
  deep: {
    transfersIn: ['Palmer (GW22)', 'Watkins (GW20)', 'Trippier (GW18)'],
    transfersOut: ['Foden (GW22)', 'Darwin (GW20)', 'TAA (GW18)'],
    trend: 'Aggressive early transfers, chasing form'
  },
  threat: {
    differentials: ['Palmer (9% owned)', 'Watkins (12% owned)', 'Trippier (8% owned)'],
    yourPlayers: ['You have Salah, Haaland - same as target'],
    riskLevel: 'MEDIUM',
    advice: 'Target owns 3 differentials you dont have. Consider Palmer.'
  },
  financial: {
    teamValue: 104.5,
    bank: 0.8,
    profit: 12.3,
    topAssets: ['Haaland £14.0m', 'Salah £13.0m', 'Saka £10.5m']
  },
  predictive: {
    nextTransfer: 'Likely to sell Watkins for Solanke',
    confidence: 75,
    reasoning: 'Watkins blank fixture, Solanke good form, target aggressive'
  }
}

export default function SpyHub() {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null)
  const [activeIntel, setActiveIntel] = useState<string | null>(null)
  const [credits, setCredits] = useState(5)
  const [intelData, setIntelData] = useState<any>(null)

  const runIntel = (type: string, cost: number) => {
    if (!selectedTarget) {
      alert('Select a target first!')
      return
    }
    if (cost > credits) {
      alert('Not enough spy credits!')
      return
    }
    setCredits(c => c - cost)
    setActiveIntel(type)
    setIntelData(mockIntel[type as keyof typeof mockIntel])
  }

  const closeIntel = () => {
    setActiveIntel(null)
    setIntelData(null)
  }

  return (
    <AppShell>
      <div className="mb-6">
        <LEDText size="xl">SPY HUB</LEDText>
        <LEDText color="amber" size="md">Gather intelligence on rival managers</LEDText>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Targets */}
        <div className="lg:col-span-1 space-y-4">
          <div className="panel" style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}>
            <LEDText color="amber" size="md">TARGETS</LEDText>
            <div className="mt-4 space-y-3">
              {mockTargets.map(target => (
                <div 
                  key={target.id} 
                  onClick={() => setSelectedTarget(target.id)}
                  className={`p-3 bg-panel-dark/50 rounded border cursor-pointer transition-colors ${
                    selectedTarget === target.id ? 'border-led-amber bg-led-amber/10' : 'border-led-dim/20 hover:border-led-amber/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-led text-led-green">{target.name}</span>
                    <span className="font-led text-led-amber text-sm">#{target.rank}</span>
                  </div>
                  <div className="flex justify-between text-xs font-led text-led-dim mt-1">
                    <span>{target.points} PTS</span>
                    <span>£{target.teamValue}m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}>
            <LEDText color="green" size="sm">YOUR SPY CREDITS</LEDText>
            <div className="mt-2 flex items-center justify-between">
              <span className="led-text text-3xl text-led-green">{credits}</span>
              <span className="font-led text-led-dim text-sm">FREE TIER</span>
            </div>
            <p className="text-led-dim text-xs font-led mt-2">Resets Monday 00:00</p>
          </div>
        </div>

        {/* Intel Options */}
        <div className="lg:col-span-2">
          <div className="panel h-full relative" style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}>
            {!activeIntel ? (
              <>
                <LEDText color="amber" size="md">INTEL OPTIONS</LEDText>
                <p className="text-led-dim font-led text-sm mt-2 mb-4">
                  {selectedTarget ? `Target selected: ${mockTargets.find(t => t.id === selectedTarget)?.name}` : 'Select target manager to unlock intel'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {spyOptions.map(option => (
                    <button 
                      key={option.id} 
                      onClick={() => selectedTarget && runIntel(option.id, option.cost)}
                      disabled={!selectedTarget}
                      className={`p-4 bg-panel-dark/50 rounded-lg border-2 text-left transition-all ${
                        selectedTarget ? `${option.border} hover:bg-panel-dark cursor-pointer` : 'border-led-dim/20 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <option.icon className={`w-6 h-6 ${option.color} mt-1`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className={`font-led ${option.color} text-lg`}>{option.name}</span>
                            <span className={`font-led ${option.cost === 0 ? 'text-led-green' : 'text-led-amber'} text-sm`}>
                              {option.cost === 0 ? 'FREE' : `${option.cost} CREDIT`}
                            </span>
                          </div>
                          <p className="text-led-dim font-led text-sm mt-1">{option.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {!selectedTarget && (
                  <div className="mt-6 p-4 bg-panel-dark/30 rounded border border-led-dim/20 text-center">
                    <p className="text-led-dim font-led">Select a target to begin intelligence gathering</p>
                  </div>
                )}
              </>
            ) : (
              /* Intel Results */
              <div className="h-full">
                <div className="flex justify-between items-center mb-4">
                  <LEDText color="amber" size="md">
                    {spyOptions.find(o => o.id === activeIntel)?.name.toUpperCase()} RESULT
                  </LEDText>
                  <button 
                    onClick={closeIntel}
                    className="text-led-dim hover:text-led-red"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Render different intel types */}
                {activeIntel === 'basic' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm font-led">
                      <div className="text-led-dim">Formation: <span className="text-led-green">{intelData.formation}</span></div>
                      <div className="text-led-dim">Captain: <span className="text-led-amber">{intelData.captain}</span></div>
                    </div>
                    <div className="bg-panel-dark/50 rounded p-4 max-h-64 overflow-y-auto">
                      {intelData.players.map((p: any, i: number) => (
                        <div key={i} className="flex justify-between py-1 border-b border-led-dim/10 last:border-0">
                          <span className="text-led-green">{p.name} ({p.team})</span>
                          <span className="text-led-amber">{p.pts} PTS</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeIntel === 'deep' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-led-amber font-led mb-2">Recent Transfers In:</p>
                      {intelData.transfersIn.map((t: string, i: number) => (
                        <p key={i} className="text-led-green font-led text-sm">+ {t}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-led-red font-led mb-2">Recent Transfers Out:</p>
                      {intelData.transfersOut.map((t: string, i: number) => (
                        <p key={i} className="text-led-dim font-led text-sm">- {t}</p>
                      ))}
                    </div>
                    <p className="text-led-amber font-led mt-4">Trend: {intelData.trend}</p>
                  </div>
                )}

                {activeIntel === 'threat' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-led-dim font-led">Risk Level:</span>
                      <span className={`font-led ${
                        intelData.riskLevel === 'HIGH' ? 'text-led-red' : 'text-led-amber'
                      }`}>{intelData.riskLevel}</span>
                    </div>
                    <div>
                      <p className="text-led-amber font-led mb-2">Their Differentials:</p>
                      {intelData.differentials.map((d: string, i: number) => (
                        <p key={i} className="text-led-green font-led text-sm">• {d}</p>
                      ))}
                    </div>
                    <p className="text-led-amber font-led mt-4">{intelData.advice}</p>
                  </div>
                )}

                {activeIntel === 'financial' && (
                  <div className="space-y-4 font-led">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-led-dim">Team Value: <span className="text-led-green">£{intelData.teamValue}m</span></div>
                      <div className="text-led-dim">Bank: <span className="text-led-amber">£{intelData.bank}m</span></div>
                    </div>
                    <div className="text-led-dim">Season Profit: <span className="text-led-green">+£{intelData.profit}m</span></div>
                    <div>
                      <p className="text-led-amber mb-2">Top Assets:</p>
                      {intelData.topAssets.map((a: string, i: number) => (
                        <p key={i} className="text-led-green text-sm">• {a}</p>
                      ))}
                    </div>
                  </div>
                )}

                {activeIntel === 'predictive' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-led-dim font-led">Confidence:</span>
                      <span className="text-led-green font-led">{intelData.confidence}%</span>
                    </div>
                    <div className="bg-panel-dark/50 rounded p-4 border border-led-amber/30">
                      <p className="text-led-amber font-led text-lg mb-2">Predicted Next Transfer:</p>
                      <p className="text-led-green font-led">{intelData.nextTransfer}</p>
                    </div>
                    <p className="text-led-dim font-led text-sm">{intelData.reasoning}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
