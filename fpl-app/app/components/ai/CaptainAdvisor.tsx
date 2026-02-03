'use client'

import { useState } from 'react'
import { Sparkles, Crown, TrendingUp } from 'lucide-react'
import { LEDText } from '../ui/LEDText'

interface Props {
  teamData: any
}

export function CaptainAdvisor({ teamData }: Props) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function getAdvice() {
    setLoading(true)
    const res = await fetch('/api/ai/captain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamData })
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="panel border-led-amber/30 w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-led-amber" />
        <LEDText color="amber" size="lg">AI CAPTAIN</LEDText>
      </div>

      {!result && !loading && (
        <button onClick={getAdvice} className="led-button-amber w-full">
          GET RECOMMENDATION
        </button>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="animate-pulse led-text text-led-amber">ANALYZING...</div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="bg-panel-dark rounded-lg p-4 border-2 border-led-green">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-led-amber" />
              <LEDText color="green" size="xl">{result.recommendation}</LEDText>
            </div>
            <div className="text-led-dim font-led text-sm">
              Confidence: {Math.round(result.confidence * 100)}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-panel-dark/50 rounded p-3">
              <div className="text-led-dim text-xs font-led mb-1">ALTERNATIVE</div>
              <div className="text-led-amber font-led">{result.alternative}</div>
            </div>
            <div className="bg-panel-dark/50 rounded p-3">
              <div className="text-led-dim text-xs font-led mb-1">DIFFERENTIAL</div>
              <div className="text-led-amber font-led">{result.differential}</div>
            </div>
          </div>

          <div className="bg-panel-dark/30 rounded p-3 border border-led-dim/20">
            <div className="text-led-dim text-xs font-led mb-2">REASONING</div>
            <p className="text-led-green/80 font-led text-sm leading-relaxed">
              {result.reasoning}
            </p>
          </div>

          <button onClick={getAdvice} className="led-button w-full text-sm">
            REFRESH
          </button>
        </div>
      )}
    </div>
  )
}
