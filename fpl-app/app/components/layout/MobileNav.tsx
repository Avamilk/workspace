'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Trophy, Users, Swords, BarChart3, Settings, Scan } from 'lucide-react'

const navItems = [
  { name: 'Team', href: '/', icon: Trophy },
  { name: 'Rescan', href: '/rescan', icon: Scan },
  { name: 'League', href: '/league', icon: Users },
  { name: 'Spy', href: '/spy', icon: Swords },
  { name: 'Transfers', href: '/transfers', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe">
      <div className="cyber-panel mx-auto max-w-md mb-4 px-2 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive ? 'cyber-button-active' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-honey-gold' : 'text-honey-amber'}`} />
                <span className={`text-[10px] font-led ${isActive ? 'text-honey-gold' : 'text-honey-amber'}`}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
