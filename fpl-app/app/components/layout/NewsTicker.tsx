'use client'

import { useState } from 'react'
import { BadgeCheck, Users, Newspaper } from 'lucide-react'

const newsItems = [
  { source: 'OFFICIAL', type: 'INJURY', text: 'Haaland trained fully - available for GW25', time: '10m ago', verified: true },
  { source: 'JOURNALIST', type: 'TRANSFER', text: 'Romano: Gordon to Liverpool, here we go', time: '25m ago', verified: true },
  { source: 'REDDIT', type: 'LINEUP', text: 'r/FantasyPL: Saka spotted in training', time: '1h ago', verified: false },
  { source: 'OFFICIAL', type: 'PRICE', text: 'Palmer rises to £6.2m', time: '2h ago', verified: true },
  { source: 'X/TWITTER', type: 'RUMOUR', text: 'Isak to Arsenal links intensify', time: '3h ago', verified: false },
  { source: 'REDDIT', type: 'DIFFERENTIAL', text: 'r/FantasyPL: "Why I\'m captaining Isak"', time: '4h ago', verified: false },
]

const sourceConfig = {
  OFFICIAL: { color: 'bg-honey-gold', icon: BadgeCheck, label: 'PL' },
  JOURNALIST: { color: 'bg-honey-amber', icon: Newspaper, label: 'PRESS' },
  REDDIT: { color: 'bg-orange-500', icon: Users, label: 'REDDIT' },
  'X/TWITTER': { color: 'bg-blue-500', icon: Users, label: 'X' },
}

const typeColors: Record<string, string> = {
  INJURY: 'text-led-red',
  TRANSFER: 'text-honey-amber',
  PRICE: 'text-led-green',
  LINEUP: 'text-blue-400',
  RUMOUR: 'text-purple-400',
  DIFFERENTIAL: 'text-pink-400',
}

export function NewsTicker() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div 
      className="overflow-hidden"
      style={{ backgroundColor: 'rgba(13, 17, 23, 0.95)', borderBottom: '1px solid rgba(251, 191, 36, 0.2)' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header row with source legend */}
      <div className="flex items-center justify-between px-4 py-1" style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.1)' }}>
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded" style={{ backgroundColor: '#f59e0b' }}>
            <span className="font-led text-xs font-bold" style={{ color: '#0a0a0f' }}>LIVE</span>
          </div>
          <span className="text-xs font-led" style={{ color: 'rgba(251, 191, 36, 0.5)' }}>NEWS</span>
        </div>
        
        {/* Source legend - simplified for mobile */}
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
          <span className="font-led" style={{ color: 'rgba(251, 191, 36, 0.5)' }}>NEWS</span>
        </div>
      </div>
      
      {/* Scrolling news */}
      <div className="overflow-hidden py-2 relative">
        <div 
          className="flex gap-6 whitespace-nowrap"
          style={{ animation: isPaused ? 'none' : 'marquee 30s linear infinite' }}
        >
          {[...newsItems, ...newsItems].map((item, i) => {
            const source = sourceConfig[item.source as keyof typeof sourceConfig]
            const Icon = source.icon
            const typeColor = typeColors[item.type] || 'text-honey-amber/50'
            
            return (
              <div key={i} className="flex items-center gap-2 shrink-0">
                {/* Type tag */}
                <span className={`text-xs font-led ${typeColor}`}>
                  {item.type}
                </span>
                
                {/* News text */}
                <span className="font-led text-sm" style={{ color: '#fbbf24' }}>{item.text}</span>
                
                {/* Time */}
                <span className="text-xs font-led" style={{ color: 'rgba(251, 191, 36, 0.4)' }}>• {item.time}</span>
              </div>
            )
          })}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
