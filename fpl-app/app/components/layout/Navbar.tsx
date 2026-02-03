'use client'

import { useState } from 'react'
import { Menu, X, Trophy, Users, BarChart3, Settings, Eye } from 'lucide-react'
import { LEDText } from '../ui/LEDText'

const navItems = [
  { name: 'DASHBOARD', href: '/', icon: Trophy },
  { name: 'MY TEAM', href: '/team', icon: Users },
  { name: 'TRANSFERS', href: '/transfers', icon: BarChart3 },
  { name: 'LEAGUE', href: '/league', icon: Trophy },
  { name: 'SPY HUB', href: '/spy', icon: Users },
  { name: 'WATCHLIST', href: '/watchlist', icon: Eye },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#1a1a24] border-b-2 border-[#39ff14]/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#ffb000]" />
            <LEDText size="lg">FPL RETRO</LEDText>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-[#39ff14] hover:text-[#ffb000] hover:bg-[#0a0a0f]/50 rounded transition-colors font-['VT323'] text-sm tracking-wider"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#39ff14]"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1a24] border-t border-[#4a4a5a]/20">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-3 text-[#39ff14] hover:bg-[#0a0a0f]/50 font-['VT323']"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
