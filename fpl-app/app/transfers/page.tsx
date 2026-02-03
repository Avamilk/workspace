'use client'

import { useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { LEDText } from '../components/ui/LEDText'
import { ArrowRightLeft, TrendingUp, AlertCircle, Check, Eye } from 'lucide-react'

const myTeam = [
  { id: 1, name: 'Raya', team: 'ARS', pos: 'GK', price: 5.0, points: 6, form: 6.5 },
  { id: 2, name: 'Trippier', team: 'NEW', pos: 'DEF', price: 6.5, points: 8, form: 7.0 },
  { id: 3, name: 'Van Dijk', team: 'LIV', pos: 'DEF', price: 6.0, points: 7, form: 6.0 },
  { id: 4, name: 'Gabriel', team: 'ARS', pos: 'DEF', price: 5.0, points: 6, form: 5.5 },
  { id: 5, name: 'Saka', team: 'ARS', pos: 'MID', price: 10.5, points: 12, form: 8.5 },
  { id: 6, name: 'Salah', team: 'LIV', pos: 'MID', price: 13.0, points: 10, form: 8.0 },
  { id: 7, name: 'De Bruyne', team: 'MCI', pos: 'MID', price: 10.5, points: 8, form: 6.0 },
  { id: 8, name: 'Palmer', team: 'CHE', pos: 'MID', price: 6.0, points: 9, form: 7.5 },
  { id: 9, name: 'Haaland', team: 'MCI', pos: 'FWD', price: 14.0, points: 13, form: 9.0 },
  { id: 10, name: 'Watkins', team: 'AVL', pos: 'FWD', price: 8.5, points: 7, form: 6.5 },
  { id: 11, name: 'Solanke', team: 'BOU', pos: 'FWD', price: 7.0, points: 5, form: 5.0 },
]

const suggestions = [
  {
    out: { name: 'Solanke', price: 7.0 },
    in: { name: 'Darwin', team: 'LIV', price: 7.5, pos: 'FWD', form: 7.0, fixture: 'BUR (H)' },
    reason: 'Better fixture, higher form, differential',
    priority: 'HIGH',
    cost: 0.5
  },
  {
    out: { name: 'De Bruyne', price: 10.5 },
    in: { name: 'Foden', team: 'MCI', price: 8.5, pos: 'MID', form: 7.5, fixture: 'EVE (H)' },
    reason: 'Save £2m, similar returns, better value',
    priority: 'MEDIUM',
    cost: -2.0
  },
  {
    out: { name: 'Watkins', price: 8.5 },
    in: { name: 'Isak', team: 'NEW', price: 8.0, pos: 'FWD', form: 7.0, fixture: 'LUT (H)' },
    reason: 'Better fixture, lower ownership, form rising',
    priority: 'LOW',
    cost: -0.5
  }
]

export default function TransfersPage() {
  const [budget] = useState(2.1)
  const [freeTransfers] = useState(1)
  const [selected, setSelected] = useState<number | null>(null)
  const [watchlist, setWatchlist] = useState<any[]>([])

  const addToWatchlist = (suggestion: any) => {
    const item = {
      id: Date.now(),
      type: 'AI',
      playerOut: suggestion.out.name,
      playerIn: suggestion.in.name,
      team: suggestion.in.team,
      priority: suggestion.priority,
      cost: suggestion.cost,
      reason: suggestion.reason,
      form: suggestion.in.form,
      fixture: suggestion.in.fixture,
      addedAt: new Date().toLocaleDateString()
    }
    setWatchlist([...watchlist, item])
    setSelected(null)
  }

  return (
    <AppShell>
      <div className="mb-6">
        <LEDText size="xl">TRANSFER OPTIMIZER</LEDText>
        <LEDText color="amber" size="md">AI-powered transfer recommendations</LEDText>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Team */}
        <div className="panel" style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}>
          <LEDText color="green" size="md">MY TEAM</LEDText>
          <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
            {myTeam.map(player => (
              <div key={player.id} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(10, 10, 15, 0.5)' }}>
                <div>
                  <span className="font-led text-led-green">{player.name}</span>
                  <span className="text-led-dim text-xs font-led ml-2">{player.pos} • {player.team}</span>
                </div>
                <span className="font-led text-led-amber">£{player.price}m</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(74, 74, 90, 0.2)' }}>
            <div className="flex justify-between font-led text-sm">
              <span className="text-led-dim">Bank:</span>
              <span className="text-led-green">£{budget}m</span>
            </div>
            <div className="flex justify-between font-led text-sm mt-1">
              <span className="text-led-dim">Free Transfers:</span>
              <span style={{ color: freeTransfers === 0 ? '#ff3333' : '#39ff14' }}>{freeTransfers}</span>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="lg:col-span-2 panel" style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}>
          <LEDText color="amber" size="md">AI SUGGESTIONS</LEDText>
          <p className="text-led-dim font-led text-sm mt-2 mb-4">Based on form, fixtures, and value</p>

          <div className="space-y-4">
            {suggestions.map((sug, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelected(idx)}
                className="p-4 rounded-lg border-2 cursor-pointer transition-all"
                style={{
                  backgroundColor: selected === idx ? 'rgba(255, 176, 0, 0.1)' : 'transparent',
                  borderColor: selected === idx ? 'rgba(255, 176, 0, 1)' : sug.priority === 'HIGH' ? 'rgba(255, 51, 51, 0.5)' : 'rgba(74, 74, 90, 0.2)'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-1 rounded text-xs font-led"
                      style={{ 
                        backgroundColor: sug.priority === 'HIGH' ? '#ff3333' : sug.priority === 'MEDIUM' ? '#ffb000' : '#4a4a5a',
                        color: '#0a0a0f'
                      }}
                    >
                      {sug.priority}
                    </span>
                    {sug.cost > 0 && <span className="text-led-red font-led text-sm">+£{sug.cost}m</span>}
                    {sug.cost < 0 && <span className="text-led-green font-led text-sm">Save £{Math.abs(sug.cost)}m</span>}
                  </div>
                  <ArrowRightLeft className="w-5 h-5 text-led-amber" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="font-led text-led-dim" style={{ textDecoration: 'line-through' }}>{sug.out.name}</p>
                    <p className="text-led-dim font-led text-sm">£{sug.out.price}m</p>
                  </div>
                  <div className="px-4">
                    <ArrowRightLeft className="w-6 h-6 text-led-amber" />
                  </div>
                  <div className="text-center flex-1">
                    <p className="font-led text-led-green">{sug.in.name}</p>
                    <p className="text-led-amber font-led text-sm">{sug.in.team} • £{sug.in.price}m</p>
                  </div>
                </div>

                <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(74, 74, 90, 0.2)' }}>
                  <div className="flex items-center gap-4 text-sm font-led">
                    <span className="text-led-dim">Form: <span className="text-led-green">{sug.in.form}</span></span>
                    <span className="text-led-dim">Fixture: <span className="text-led-amber">{sug.in.fixture}</span></span>
                  </div>
                  <p className="text-led-dim font-led text-sm mt-2">{sug.reason}</p>
                </div>

                {selected === idx && (
                  <div className="mt-4 space-y-2">
                    <button 
                      onClick={() => addToWatchlist(sug)}
                      className="led-button w-full text-sm py-2"
                    >
                      <Eye className="w-4 h-4 inline mr-2" /> ADD TO WATCHLIST
                    </button>
                    <p className="text-led-dim text-xs font-led text-center">
                      Track this transfer for later
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selected === null && (
            <div className="mt-6 p-4 rounded text-center" style={{ backgroundColor: 'rgba(10, 10, 15, 0.3)', border: '1px solid rgba(74, 74, 90, 0.2)' }}>
              <p className="text-led-dim font-led">Click a suggestion to view details and confirm</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
