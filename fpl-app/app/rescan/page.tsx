'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '../components/layout/AppShell'
import { LEDText } from '../components/ui/LEDText'
import { Scan, Check, X, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react'
import { useTeamStore } from '../../lib/store/teamStore'

interface OptimizationResult {
  formation: string
  startingXI: any[]
  bench: any[]
  captain: any
  viceCaptain: any
  transfers: any[]
  takeHit: boolean
  hitReasoning: string
  expectedPoints: number
  currentExpected: number
}

export default function RescanPage() {
  const router = useRouter()
  const { teamData } = useTeamStore()
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<OptimizationResult | null>(null)

  const runScan = async () => {
    setScanning(true)
    // Simulate AI analysis (replace with real API call)
    await new Promise(r => setTimeout(r, 2000))
    
    const mockResult: OptimizationResult = {
      formation: '3-5-2',
      startingXI: teamData?.players.slice(0, 11) || [],
      bench: teamData?.players.slice(11) || [],
      captain: teamData?.players.find((p: any) => p.name === 'Haaland'),
      viceCaptain: teamData?.players.find((p: any) => p.name === 'Salah'),
      transfers: [
        { out: 'Solanke', in: 'Darwin', cost: 0.5, reasoning: 'Better fixture, higher xG' }
      ],
      takeHit: true,
      hitReasoning: 'Darwin outscores Solanke by >4 points this GW',
      expectedPoints: 72,
      currentExpected: 65
    }
    
    setResult(mockResult)
    setScanning(false)
  }

  if (!teamData) {
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LEDText color="amber" size="lg">NO TEAM LOADED</LEDText>
            <button 
              onClick={() => router.push('/')} 
              className="cyber-button mt-4 px-6 py-3"
            >
              LOAD TEAM FIRST
            </button>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="mb-6 text-center">
        <LEDText size="xl">RESCAN PITCH</LEDText>
        <LEDText color="amber" size="sm">AI-POWERED TEAM OPTIMIZER</LEDText>
      </div>

      {!result && !scanning && (
        <div className="cyber-panel p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-honey-gold/20 to-honey-amber/20 flex items-center justify-center border-2 border-honey-gold/30">
            <Scan className="w-12 h-12 text-honey-gold" />
          </div>
          
          <p className="text-honey-amber/80 font-led mb-2">Current Squad: {teamData.players.length} players</p>
          <p className="text-honey-amber/80 font-led mb-2">Bank: £{teamData.bank}m</p>
          <p className="text-honey-amber/80 font-led mb-6">Team Value: £{teamData.teamValue}m</p>
          
          <button 
            onClick={runScan} 
            className="cyber-button px-8 py-4 text-lg font-bold animate-pulse"
          >
            <Sparkles className="w-5 h-5 inline mr-2" />
            INITIATE RESCAN
          </button>
          
          <p className="text-honey-amber/60 text-xs font-led mt-4">
            AI will analyze form, fixtures, and value to optimize your team
          </p>
        </div>
      )}

      {scanning && (
        <div className="cyber-panel p-8 text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-honey-gold/20 animate-ping" />
            <div className="absolute inset-4 rounded-full border-4 border-honey-gold/40 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Scan className="w-12 h-12 text-honey-gold animate-spin" />
            </div>
          </div>
          <LEDText color="amber" size="lg">ANALYZING...</LEDText>
          <div className="mt-4 space-y-2 text-honey-amber/60 font-led text-sm">
            <p>Scanning player form...</p>
            <p>Checking fixtures...</p>
            <p>Calculating optimal formation...</p>
            <p>Evaluating transfer options...</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="cyber-panel p-4" style={{ borderColor: 'rgba(245, 158, 11, 0.5)' }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <LEDText color="amber" size="md">OPTIMIZED FORMATION</LEDText>
                <p className="text-honey-gold font-led text-2xl">{result.formation}</p>
              </div>
              <div className="text-right">
                <p className="text-honey-amber/60 font-led text-sm">Expected Points</p>
                <div className="flex items-center gap-2">
                  <span className="text-honey-amber/60 font-led" style={{ textDecoration: 'line-through' }}>{result.currentExpected}</span>
                  <ArrowRight className="w-4 h-4" style={{ color: '#39ff14' }} />
                  <span className="cyber-text text-3xl" style={{ color: '#39ff14' }}>{result.expectedPoints}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full font-led text-xs border" style={{ backgroundColor: 'rgba(57, 255, 20, 0.2)', color: '#39ff14', borderColor: 'rgba(57, 255, 20, 0.3)' }}>
                +{result.expectedPoints - result.currentExpected} POINTS
              </span>
              {result.takeHit && (
                <span className="px-3 py-1 rounded-full font-led text-xs border" style={{ backgroundColor: 'rgba(255, 51, 51, 0.2)', color: '#ff3333', borderColor: 'rgba(255, 51, 51, 0.3)' }}>
                  -4 HIT RECOMMENDED
                </span>
              )}
            </div>
          </div>

          {/* Starting XI */}
          <div className="cyber-panel p-4">
            <p className="text-honey-gold font-led text-sm mb-3">STARTING XI</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {result.startingXI.map((player: any, i: number) => (
                <div 
                  key={i} 
                  className="p-2 rounded-lg border text-center"
                  style={{ 
                    backgroundColor: player.isCaptain ? 'rgba(255, 176, 0, 0.2)' : 'rgba(10, 10, 15, 0.5)',
                    borderColor: player.isCaptain ? 'rgba(255, 176, 0, 1)' : 'rgba(245, 158, 11, 0.2)'
                  }}
                >
                  <p className="text-honey-gold font-led text-xs truncate">{player.name}</p>
                  <p className="text-honey-amber/60 text-[10px]">{player.team}</p>
                  {player.isCaptain && <span className="text-honey-amber text-[10px]">★ C</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Bench */}
          <div className="cyber-panel p-4" style={{ borderColor: 'rgba(255, 51, 51, 0.3)' }}>
            <p className="font-led text-sm mb-3" style={{ color: '#ff3333' }}>BENCH</p>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {result.bench.map((player: any, i: number) => (
                <div 
                  key={i} 
                  className="flex-shrink-0 p-2 rounded-lg text-center w-20"
                  style={{ backgroundColor: 'rgba(255, 51, 51, 0.1)', border: '1px solid rgba(255, 51, 51, 0.2)' }}
                >
                  <p className="font-led text-xs truncate" style={{ color: 'rgba(255, 51, 51, 0.8)' }}>{player.name}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(255, 51, 51, 0.6)' }}>{player.team}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transfer Suggestions */}
          {result.transfers.length > 0 && (
            <div className="cyber-panel p-4" style={{ borderColor: 'rgba(255, 176, 0, 0.5)' }}>
              <p className="text-honey-gold font-led text-sm mb-3">SUGGESTED TRANSFERS</p>
              {result.transfers.map((t: any, i: number) => (
                <div key={i} className="mt-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(10, 10, 15, 0.5)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-center flex-1">
                      <p className="font-led" style={{ color: '#ff3333', textDecoration: 'line-through' }}>{t.out}</p>
                      <p className="text-xs" style={{ color: 'rgba(255, 51, 51, 0.6)' }}>SELL</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-honey-amber mx-2" />
                    <div className="text-center flex-1">
                      <p className="font-led" style={{ color: '#39ff14' }}>{t.in}</p>
                      <p className="text-xs" style={{ color: 'rgba(57, 255, 20, 0.6)' }}>BUY</p>
                    </div>
                  </div>
                  <p className="text-honey-amber/80 text-xs font-led text-center pt-2" style={{ borderTop: '1px solid rgba(245, 158, 11, 0.1)' }}>
                    {t.reasoning} • Cost: £{t.cost}m
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Hit Recommendation */}
          {result.takeHit && (
            <div className="cyber-panel p-4" style={{ borderColor: 'rgba(255, 176, 0, 0.5)', backgroundColor: 'rgba(255, 176, 0, 0.05)' }}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-honey-amber flex-shrink-0" />
                <div>
                  <p className="text-honey-gold font-led text-sm">TAKE A HIT?</p>
                  <p className="text-honey-amber/80 font-led text-sm mt-1">
                    {result.hitReasoning}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="cyber-button flex-1 py-2 text-xs">
                      <Check className="w-4 h-4 inline mr-1" /> ACCEPT -4
                    </button>
                    <button className="cyber-button flex-1 py-2 text-xs" style={{ opacity: 0.6 }}>
                      <X className="w-4 h-4 inline mr-1" /> SKIP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => setResult(null)} className="cyber-button flex-1 py-3">
              RESCAN AGAIN
            </button>
            <button onClick={() => router.push('/')} className="cyber-button flex-1 py-3" style={{ background: 'rgba(245, 158, 11, 0.3)' }}>
              APPLY TO TEAM
            </button>
          </div>
        </div>
      )}
    </AppShell>
  )
}
