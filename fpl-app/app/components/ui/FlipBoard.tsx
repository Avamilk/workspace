'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface FlipBoardProps {
  value: number | string
  digits?: number
  className?: string
}

export function FlipBoard({ value, digits = 3, className = '' }: FlipBoardProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)
  
  // Format value to have leading zeros
  const formattedValue = String(value).padStart(digits, '0')
  
  useEffect(() => {
    if (value !== displayValue) {
      setIsFlipping(true)
      const timeout = setTimeout(() => {
        setDisplayValue(value)
        setIsFlipping(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [value, displayValue])
  
  return (
    <div className={`inline-flex bg-[#1a1a1a] rounded-lg p-2 border border-[#2a2a2a] ${className}`}>
      {formattedValue.split('').map((digit, index) => (
        <motion.div
          key={index}
          className="relative w-10 h-14 mx-0.5"
          initial={false}
          animate={isFlipping ? { rotateX: [0, -90, 0] } : { rotateX: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.05,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front face */}
          <div 
            className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[#fbbf24] font-mono rounded"
            style={{
              background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
              border: '1px solid #333',
              textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.4)',
              backfaceVisibility: 'hidden'
            }}
          >
            {digit}
            {/* Horizontal line for split-flap effect */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-black shadow-[0_1px_0_rgba(255,255,255,0.05)]" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

interface ScoreBoardProps {
  label: string
  value: number
  suffix?: string
  trend?: 'up' | 'down' | 'neutral'
}

export function ScoreBoard({ label, value, suffix = '', trend = 'neutral' }: ScoreBoardProps) {
  const trendColor = {
    up: 'text-emerald-500',
    down: 'text-red-500',
    neutral: 'text-slate-400'
  }[trend]
  
  const trendIcon = {
    up: '▲',
    down: '▼',
    neutral: '•'
  }[trend]
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-5 border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <span className={`text-xs ${trendColor}`}>
          {trendIcon}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <FlipBoard value={value} digits={String(value).length} />
        {suffix && (
          <span className="text-lg font-medium text-slate-400 ml-2">{suffix}</span>
        )}
      </div>
    </div>
  )
}

interface FlightInfoProps {
  flight: string
  destination: string
  status: 'ON TIME' | 'DELAYED' | 'BOARDING' | 'DEPARTED'
  time: string
}

export function FlightInfo({ flight, destination, status, time }: FlightInfoProps) {
  const statusColors = {
    'ON TIME': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'DELAYED': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'BOARDING': 'bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse',
    'DEPARTED': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  }
  
  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
          <span className="text-2xl font-bold text-slate-300 font-mono">{flight}</span>
        </div>
        <div>
          <p className="text-sm text-slate-400 uppercase tracking-wider">Destination</p>
          <p className="text-lg font-semibold text-slate-200">{destination}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-slate-400 uppercase tracking-wider">Status</p>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="text-right">
        <p className="text-sm text-slate-400 uppercase tracking-wider">Time</p>
        <FlipBoard value={time.replace(':', '')} digits={4} />
      </div>
    </div>
  )
}
