'use client'

interface PixelPlayerProps {
  name: string
  team: 'ARS' | 'MCI' | 'LIV' | 'TOT' | 'CHE' | 'NEW' | 'AVL' | 'MUN' | 'OTH'
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  points?: number
  isCaptain?: boolean
}

const teamColors: Record<string, { shirt: string; shorts: string }> = {
  ARS: { shirt: '#EF0107', shorts: '#FFFFFF' },
  MCI: { shirt: '#6CABDD', shorts: '#FFFFFF' },
  LIV: { shirt: '#C8102E', shorts: '#FFFFFF' },
  TOT: { shirt: '#FFFFFF', shorts: '#132257' },
  CHE: { shirt: '#034694', shorts: '#FFFFFF' },
  NEW: { shirt: '#241F20', shorts: '#FFFFFF' },
  AVL: { shirt: '#670E36', shorts: '#95BFE5' },
  MUN: { shirt: '#DA291C', shorts: '#FFFFFF' },
  OTH: { shirt: '#808080', shorts: '#404040' },
}

export function PixelPlayer({ name, team, points, isCaptain }: PixelPlayerProps) {
  const colors = teamColors[team] || teamColors.OTH

  return (
    <div className="flex flex-col items-center gap-1">
      {/* 16x16 Pixel Avatar */}
      <div className="relative">
        <div 
          className="w-8 h-8 rounded-sm relative" 
          style={{ 
            backgroundColor: colors.shirt, 
            boxShadow: `inset -2px -2px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.5)${isCaptain ? ', 0 0 10px #ffb000' : ''}` 
          }}
        >
          {/* Shorts (bottom half) */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-3 rounded-b-sm" 
            style={{ backgroundColor: colors.shorts }} 
          />
          {/* Eyes */}
          <div className="absolute top-2 left-1 w-1 h-1 bg-white" />
          <div className="absolute top-2 right-1 w-1 h-1 bg-white" />
        </div>
        {/* Captain badge */}
        {isCaptain && (
          <div className="absolute -top-1 -right-1 text-[#ffb000] text-xs">★</div>
        )}
      </div>
      {/* Name */}
      <span 
        className="font-['VT323'] text-[#39ff14] text-xs tracking-wider text-center w-16 truncate"
        style={{ textShadow: '0 0 5px currentColor' }}
      >
        {name}
      </span>
      {/* Points */}
      {points !== undefined && (
        <span className="font-['VT323'] text-[#ffb000] text-xs">
          {points} PTS
        </span>
      )}
    </div>
  )
}
