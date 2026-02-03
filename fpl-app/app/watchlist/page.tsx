'use client'

import { useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { LEDText } from '../components/ui/LEDText'
import { Trash2, Plus, Brain, User } from 'lucide-react'

type WatchlistItem = {
  id: number
  type: 'MANUAL' | 'AI'
  playerIn: string
  playerOut?: string
  team: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  cost?: number
  reason?: string
  form?: number
  fixture?: string
  addedAt: string
  notes?: string
}

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([
    // Mock AI suggestions
    {
      id: 1,
      type: 'AI',
      playerOut: 'Solanke',
      playerIn: 'Darwin',
      team: 'LIV',
      priority: 'HIGH',
      cost: 0.5,
      reason: 'Better fixture, higher form, differential',
      form: 7.0,
      fixture: 'BUR (H)',
      addedAt: '02/02/2026'
    },
    {
      id: 2,
      type: 'AI',
      playerOut: 'De Bruyne',
      playerIn: 'Foden',
      team: 'MCI',
      priority: 'MEDIUM',
      cost: -2.0,
      reason: 'Save £2m, similar returns',
      form: 7.5,
      fixture: 'EVE (H)',
      addedAt: '02/02/2026'
    }
  ])

  const [newPlayer, setNewPlayer] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const addManual = () => {
    if (!newPlayer) return
    const item: WatchlistItem = {
      id: Date.now(),
      type: 'MANUAL',
      playerIn: newPlayer,
      team: 'TBD',
      priority: 'MEDIUM',
      addedAt: new Date().toLocaleDateString(),
      notes: ''
    }
    setItems([...items, item])
    setNewPlayer('')
    setShowAdd(false)
  }

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id))
  }

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'HIGH': return 'text-led-red border-led-red'
      case 'MEDIUM': return 'text-led-amber border-led-amber'
      case 'LOW': return 'text-led-dim border-led-dim'
      default: return 'text-led-dim'
    }
  }

  // Sort by priority: HIGH first, then MEDIUM, then LOW
  const sortedItems = [...items].sort((a, b) => {
    const priorityOrder: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <AppShell>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <LEDText size="xl">WATCHLIST</LEDText>
          <LEDText color="amber" size="md">Track transfers - AI suggestions & manual targets</LEDText>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="led-button text-sm py-2 px-4"
        >
          <Plus className="w-4 h-4 inline mr-2" /> ADD PLAYER
        </button>
      </div>

      {/* Add manual player */}
      {showAdd && (
        <div className="panel mb-6" style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}>
          <div className="flex gap-3">
            <input
              type="text"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              placeholder="Player name..."
              className="flex-1 px-3 py-2 text-led-green font-led focus:outline-none"
              style={{ 
                backgroundColor: '#0a0a0f', 
                border: '1px solid rgba(74, 74, 90, 0.3)',
                borderRadius: '0.25rem'
              }}
            />
            <button onClick={addManual} className="led-button text-sm px-4">ADD</button>
            <button onClick={() => setShowAdd(false)} className="led-button-amber text-sm px-4">CANCEL</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="panel text-center" style={{ borderColor: 'rgba(255, 51, 51, 0.3)' }}>
          <LEDText color="red" size="xl">{items.filter(i => i.priority === 'HIGH').length}</LEDText>
          <p className="text-led-dim font-led text-sm">HIGH PRIORITY</p>
        </div>
        <div className="panel text-center" style={{ borderColor: 'rgba(255, 176, 0, 0.3)' }}>
          <LEDText color="amber" size="xl">{items.filter(i => i.priority === 'MEDIUM').length}</LEDText>
          <p className="text-led-dim font-led text-sm">MEDIUM</p>
        </div>
        <div className="panel text-center" style={{ borderColor: 'rgba(74, 74, 90, 0.3)' }}>
          <LEDText color="dim" size="xl">{items.filter(i => i.priority === 'LOW').length}</LEDText>
          <p className="text-led-dim font-led text-sm">LOW</p>
        </div>
      </div>

      {/* Watchlist */}
      <div className="space-y-3">
        {sortedItems.length === 0 ? (
          <div className="panel text-center py-12" style={{ borderColor: 'rgba(74, 74, 90, 0.3)' }}>
            <p className="text-led-dim font-led">Watchlist empty. Add players manually or from AI suggestions.</p>
          </div>
        ) : (
          sortedItems.map(item => (
            <div 
              key={item.id}
              className={`panel ${
                item.priority === 'HIGH' ? 'border-l-led-red' : 
                item.priority === 'MEDIUM' ? 'border-l-led-amber' : 
                'border-l-led-dim'
              }`}
              style={{ 
                borderLeftWidth: '4px',
                borderColor: item.priority === 'HIGH' ? 'rgba(255, 51, 51, 0.5)' : 
                            item.priority === 'MEDIUM' ? 'rgba(255, 176, 0, 0.5)' : 
                            'rgba(74, 74, 90, 0.5)'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    {item.type === 'AI' ? (
                      <Brain className="w-5 h-5 text-led-amber" />
                    ) : (
                      <User className="w-5 h-5 text-led-green" />
                    )}
                    <span className={`px-2 py-0.5 rounded text-xs font-led border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    <span className="text-led-dim text-xs font-led">
                      {item.type === 'AI' ? 'AI SUGGESTION' : 'MANUAL'}
                    </span>
                  </div>

                  {/* Player info */}
                  <div className="flex items-center gap-4">
                    {item.type === 'AI' && item.playerOut ? (
                      <>
                        <div className="text-center">
                          <p className="text-led-dim font-led line-through text-sm">{item.playerOut}</p>
                          <p className="text-led-amber font-led text-xs">OUT</p>
                        </div>
                        <span className="text-led-amber">→</span>
                      </>
                    ) : null}
                    <div>
                      <p className="text-led-green font-led text-lg">{item.playerIn}</p>
                      <p className="text-led-amber font-led text-sm">{item.team}</p>
                    </div>
                  </div>

                  {/* Reason */}
                  {item.reason && (
                    <p className="text-led-dim font-led text-sm mt-2 italic">"{item.reason}"</p>
                  )}

                  {/* Details */}
                  <div className="mt-3 flex flex-wrap gap-4 text-sm font-led">
                    {item.form && (
                      <span className="text-led-dim">Form: <span className="text-led-green">{item.form}</span></span>
                    )}
                    {item.fixture && (
                      <span className="text-led-dim">Next: <span className="text-led-amber">{item.fixture}</span></span>
                    )}
                    {item.cost !== undefined && (
                      <span className={item.cost > 0 ? 'text-led-red' : 'text-led-green'}>
                        {item.cost > 0 ? `+£${item.cost}m` : `Save £${Math.abs(item.cost)}m`}
                      </span>
                    )}
                    <span className="text-led-dim">Added: {item.addedAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-led-dim hover:text-led-red transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  )
}
