'use client'

import { useState } from 'react'
import { LEDText } from '../ui/LEDText'

export function TeamInput({ onLoad }: { onLoad: (teamId: number) => void }) {
  const [teamId, setTeamId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const id = parseInt(teamId)
      if (!id || id < 1) throw new Error('Invalid team ID')

      // Test if team exists (via proxy)
      const res = await fetch(`/api/fpl/entry/${id}/`)
      if (!res.ok) throw new Error('Team not found')

      onLoad(id)
    } catch (err: any) {
      setError(err.message || 'Failed to load team')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel max-w-md mx-auto" style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}>
      <LEDText color="amber" size="lg">ENTER FPL TEAM ID</LEDText>
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="number"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          placeholder="e.g. 123456"
          className="w-full px-4 py-3 text-led-green font-led text-xl text-center focus:outline-none"
          style={{ 
            backgroundColor: '#0a0a0f', 
            border: '2px solid rgba(74, 74, 90, 0.3)',
            borderRadius: '0.25rem'
          }}
        />
        
        {error && (
          <p className="text-led-red font-led text-sm text-center">{error}</p>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          className="led-button w-full py-3"
        >
          {loading ? 'LOADING...' : 'LOAD MY TEAM'}
        </button>
      </form>
      
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(74, 74, 90, 0.2)' }}>
        <p className="text-led-dim font-led text-xs text-center">
          Find your ID in FPL URL:<br/>
          fantasy.premierleague.com/entry/<span className="text-led-amber">123456</span>
        </p>
      </div>
    </div>
  )
}
