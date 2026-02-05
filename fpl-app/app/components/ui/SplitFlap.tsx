'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplitFlapProps {
  character: string
  className?: string
  color?: 'green' | 'amber' | 'red' | 'blue' | 'white'
}

export function SplitFlap({ character, className = '', color = 'green' }: SplitFlapProps) {
  const [currentChar, setCurrentChar] = useState(character)
  const [isFlipping, setIsFlipping] = useState(false)
  const prevCharRef = useRef(character)
  
  useEffect(() => {
    if (character !== prevCharRef.current) {
      setIsFlipping(true)
      const timeout = setTimeout(() => {
        setCurrentChar(character)
        prevCharRef.current = character
        setIsFlipping(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [character])
  
  const colorClasses = {
    green: 'text-[#39ff14]',
    amber: 'text-[#ffb000]',
    red: 'text-[#ff3333]',
    blue: 'text-[#00d4ff]',
    white: 'text-white'
  }
  
  return (
    <div className={`relative w-10 h-14 perspective-500 ${className}`}>
      {/* Glassmorphism base */}
      <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-lg border border-white/[0.1] shadow-lg">
        {/* Top half - lighter */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent rounded-t-lg" />
        {/* Bottom half - darker */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black/20 rounded-b-lg" />
        
        {/* Split line with glow */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/50 z-10" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 z-10 translate-y-px" />
      </div>
      
      {/* Character with flip animation */}
      <div className={`absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold ${colorClasses[color]}`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentChar}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
            style={{ 
              textShadow: color === 'green' 
                ? '0 0 10px rgba(57,255,20,0.8)' 
                : undefined 
            }}
          >
            {currentChar}
          </motion.span>
        </AnimatePresence>
      </div>
      
      {/* Side shading for depth */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-black/30 to-transparent rounded-l-lg" />
      <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-l from-black/30 to-transparent rounded-r-lg" />
      
      {/* Top highlight */}
      <div className="absolute top-0 left-2 right-2 h-px bg-white/20 rounded-full" />
    </div>
  )
}

interface SplitFlapDisplayProps {
  value: string | number
  length?: number
  className?: string
  color?: 'green' | 'amber' | 'red' | 'blue' | 'white'
  prefix?: string
  suffix?: string
}

export function SplitFlapDisplay({ 
  value, 
  length = 6, 
  className = '', 
  color = 'green',
  prefix = '',
  suffix = ''
}: SplitFlapDisplayProps) {
  const strValue = String(value).toUpperCase()
  const paddedValue = strValue.padStart(length, ' ').slice(-length)
  
  return (
    <div className={`inline-flex items-center gap-1 backdrop-blur-md bg-white/[0.03] p-2 rounded-xl border border-white/[0.08] ${className}`}>
      {prefix && (
        <span className="text-[#39ff14] font-mono text-lg font-bold mr-1 opacity-70">{prefix}</span>
      )}
      {paddedValue.split('').map((char, index) => (
        <SplitFlap key={index} character={char} color={color} />
      ))}
      {suffix && (
        <span className="text-[#39ff14] font-mono text-lg font-bold ml-1 opacity-70">{suffix}</span>
      )}
    </div>
  )
}

interface FlightBoardProps {
  gate: string
  destination: string
  time: string
  status: 'ON TIME' | 'DELAYED' | 'BOARDING' | 'CANCELLED' | 'ARRIVED'
  onClick?: () => void
}

export function FlightBoardRow({ gate, destination, time, status, onClick }: FlightBoardProps) {
  const statusColors = {
    'ON TIME': 'text-[#39ff14] border-[#39ff14]/30 bg-[#39ff14]/10',
    'DELAYED': 'text-[#ffb000] border-[#ffb000]/30 bg-[#ffb000]/10',
    'BOARDING': 'text-[#00d4ff] border-[#00d4ff]/30 bg-[#00d4ff]/10 animate-pulse',
    'CANCELLED': 'text-[#ff3333] border-[#ff3333]/30 bg-[#ff3333]/10',
    'ARRIVED': 'text-white border-white/30 bg-white/10'
  }
  
  return (
    <button 
      onClick={onClick}
      className="w-full text-left group"
    >
      <div className="flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors border-b border-white/[0.05]">
        {/* Gate */}
        <div className="w-16 flex-shrink-0">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Gate</span>
          <div className="font-mono text-xl font-bold text-white tracking-tight">{gate}</div>
        </div>
        
        {/* Destination */}
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] block mb-1">Destination</span>
          <div className="font-mono text-lg font-bold text-[#39ff14] truncate tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.6)] transition-all">
            {destination}
          </div>
        </div>
        
        {/* Time */}
        <div className="w-20 flex-shrink-0 text-right">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] block mb-1">Time</span>
          <div className="font-mono text-xl font-bold text-white tracking-tight">{time}</div>
        </div>
        
        {/* Status */}
        <div className="w-28 flex-shrink-0 text-right">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] block mb-1">Status</span>
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border tracking-wider ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </div>
    </button>
  )
}

interface ScoreBoardLargeProps {
  label: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function ScoreBoardLarge({ label, value, trend = 'neutral', className = '' }: ScoreBoardLargeProps) {
  const strValue = String(value)
  
  return (
    <div className={`backdrop-blur-md bg-white/[0.03] rounded-2xl p-5 border border-white/[0.08] relative overflow-hidden group ${className}`}>
      {/* Gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39ff14]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-white/40 uppercase tracking-[0.25em] font-bold">{label}</span>
        {trend !== 'neutral' && (
          <span className={`text-sm ${trend === 'up' ? 'text-[#39ff14]' : 'text-[#ff3333]'}`}>
            {trend === 'up' ? '▲' : '▼'}
          </span>
        )}
      </div>
      
      <SplitFlapDisplay 
        value={strValue} 
        length={strValue.length}
        color="green"
        className="scale-110 origin-left"
      />
    </div>
  )
}

// New: Animated number counter for live stats
interface LiveCounterProps {
  value: number
  label: string
  className?: string
}

export function LiveCounter({ value, label, className = '' }: LiveCounterProps) {
  const [displayValue, setDisplayValue] = useState(value)
  
  useEffect(() => {
    if (value !== displayValue) {
      const timer = setTimeout(() => setDisplayValue(value), 100)
      return () => clearTimeout(timer)
    }
  }, [value, displayValue])
  
  return (
    <div className={`backdrop-blur-md bg-white/[0.03] rounded-2xl p-5 border border-white/[0.08] relative overflow-hidden ${className}`}>
      <div className="text-[10px] text-white/40 uppercase tracking-[0.25em] font-bold mb-2">{label}</div>
      <div className="flex gap-1">
        {String(displayValue).split('').map((char, i) => (
          <motion.div
            key={`${i}-${char}`}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="w-12 h-16 backdrop-blur-sm bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-lg border border-white/[0.1] flex items-center justify-center"
          >
            <span className="text-3xl font-bold text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]">
              {char}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
