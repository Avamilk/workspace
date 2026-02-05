'use client'

import { useState } from 'react'
import { Sparkles, Crown, Shield, AlertCircle } from 'lucide-react'
import { GlassCard, NeonText, NeonHeading, NavButton } from '../glass'

interface Props {
  teamData: any
}

interface Recommendation {
  captain: string
  viceCaptain: string
  reasoning: string
  confidence: number
  meta?: {
    gameweek: number | null
    aiPowered: boolean
    fallback: boolean
    timestamp: string
    error?: boolean
  }
}

export function CaptainAdvisor({ teamData }: Props) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Recommendation | null>(null)

  async function getAdvice() {
    setLoading(true)
    try {
      const res = await fetch('/api/ai/captain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamData })
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error('Failed to get advice:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard variant="amber" className="w-full h-full">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#ffb000]" />
        <NeonText color="amber" size="lg" glow>AI CAPTAIN</NeonText>
      </div>

      {!result && !loading && (
        <div className="space-y-4">
          <p className="text-white/60 text-sm font-mono">
            Get AI-powered captain recommendations based on form, fixtures, and player stats.
          </p>
          <NavButton 
            onClick={getAdvice} 
            variant="active" 
            color="amber" 
            fullWidth
            icon={Sparkles}
          >
            GET RECOMMENDATION
          </NavButton>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="animate-pulse text-[#ffb000] font-mono">ANALYZING...</div>
          <div className="mt-2 text-white/40 text-xs font-mono">
            Consulting Gemini Flash...
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Captain Pick */}
          <div className="bg-[#ffb000]/10 rounded-xl p-4 border border-[#ffb000]/30">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-[#ffb000]" />
              <NeonText color="amber" size="xl" glow>{result.captain}</NeonText>
            </div>
            <div className="flex items-center gap-2 text-white/60 font-mono text-sm">
              <span>Confidence:</span>
              <NeonText color="green">{Math.round(result.confidence * 100)}%</NeonText>
            </div>
            {result.meta?.fallback && (
              <div className="flex items-center gap-2 mt-2 text-[#ffb000]/70 text-xs font-mono">
                <AlertCircle className="w-3 h-3" />
                <span>Fallback mode (API not configured)</span>
              </div>
            )}
          </div>

          {/* Vice Captain */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-white/60 text-xs font-mono uppercase">Vice Captain</span>
            </div>
            <NeonText color="cyan" size="lg" className="mt-1">
              {result.viceCaptain}
            </NeonText>
          </div>

          {/* Reasoning */}
          <div className="bg-black/20 rounded-xl p-3 border border-white/5">
            <div className="text-white/40 text-xs font-mono uppercase mb-2">Analysis</div>
            <p className="text-white/80 font-mono text-sm leading-relaxed">
              {result.reasoning}
            </p>
          </div>

          <NavButton 
            onClick={getAdvice} 
            variant="default" 
            color="amber" 
            fullWidth
            size="sm"
          >
            REFRESH
          </NavButton>
        </div>
      )}
    </GlassCard>
  )
}
