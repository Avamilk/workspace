'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, 
  Users, 
  Zap, 
  ArrowUpRight,
  Target,
  Plane,
  Radar,
  Cpu,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Grid3X3
} from 'lucide-react'
import { ThemeToggle } from '../glass/ThemeToggle'
import { useThemeStore } from '@/app/lib/stores/themeStore'
import { MatrixBackgroundStatic } from '../glass/MatrixBackground'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme } = useThemeStore()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [menuOpen, setMenuOpen] = useState(false)
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])
  
  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  const navigation = [
    { id: '', label: 'DASHBOARD', icon: Grid3X3, path: '/' },
    { id: 'team', label: 'FLIGHT DECK', icon: Users, path: '/team' },
    { id: 'league', label: 'LEAGUES', icon: Trophy, path: '/league' },
    { id: 'transfers', label: 'TRANSFERS', icon: ArrowUpRight, path: '/transfers' },
    { id: 'captain', label: 'AI CAPTAIN', icon: Cpu, path: '/captain' },
    { id: 'spy', label: 'SPY HUB', icon: Radar, path: '/spy' },
    { id: 'watchlist', label: 'WATCHLIST', icon: Target, path: '/watchlist' },
  ]
  
  const activePage = navigation.find(n => n.path === pathname) || navigation[0]
  
  const isMatrixTheme = theme === 'matrix'
  
  return (
    <div className={`min-h-screen pb-24 overflow-x-hidden relative ${
      isMatrixTheme ? 'bg-[#050a14] text-white' : 'bg-[#0a0a0a] text-[#39ff14]'
    }`}>
      {/* Matrix Background */}
      {isMatrixTheme && <MatrixBackgroundStatic />}
      
      {/* Scan line overlay for airport theme */}
      {!isMatrixTheme && (
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            backgroundSize: '100% 4px'
          }}
        />
      )}
      
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
        isMatrixTheme 
          ? 'bg-[#050a14]/80 border-white/10' 
          : 'bg-[#0f0f0f] border-[#222]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMenuOpen(true)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                  isMatrixTheme
                    ? 'bg-[rgba(10,15,30,0.5)] border-white/10 hover:border-[#00ff88]/50'
                    : 'bg-[#111] border-[#333] hover:border-[#39ff14]/50'
                }`}
              >
                <Menu className={`w-5 h-5 ${isMatrixTheme ? 'text-[#00ff88]' : 'text-[#39ff14]'}`} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  isMatrixTheme
                    ? 'bg-[rgba(0,255,136,0.1)] border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.15)]'
                    : 'bg-[#111] border-[#39ff14]/30 shadow-[0_0_15px_rgba(57,255,20,0.15)]'
                }`}>
                  {isMatrixTheme ? (
                    <Grid3X3 className="w-5 h-5 text-[#00ff88]" />
                  ) : (
                    <Plane className="w-5 h-5 text-[#39ff14]" />
                  )}
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${
                    isMatrixTheme 
                      ? 'text-[#00ff88] font-mono' 
                      : 'text-[#39ff14] font-[\'VT323\']'
                  }`}>
                    {isMatrixTheme ? 'FPL MATRIX' : 'FPL TERMINAL'}
                  </h1>
                  <p className={`text-xs tracking-wider ${
                    isMatrixTheme ? 'text-white/40 font-mono' : 'text-white/40'
                  }`}>
                    {activePage.label}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Live Clock */}
              <div className="hidden sm:block text-right">
                <div className={`text-xs uppercase tracking-wider ${
                  isMatrixTheme ? 'text-white/40' : 'text-white/40'
                }`}>
                  SYSTEM TIME
                </div>
                <div className={`font-mono text-lg font-bold ${
                  isMatrixTheme ? 'text-[#00ff88]' : 'text-[#39ff14]'
                }`}>
                  {timeString}
                </div>
              </div>
              
              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              
              {/* Notifications */}
              <button className={`relative w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                isMatrixTheme
                  ? 'bg-[rgba(10,15,30,0.5)] border-white/10 hover:border-[#00ff88]/50'
                  : 'bg-[#111] border-[#333] hover:border-[#39ff14]/50'
              }`}>
                <Bell className="w-5 h-5 text-white/60" />
                <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isMatrixTheme ? 'bg-[#00ff88] text-black' : 'bg-[#39ff14] text-black'
                }`}>
                  3
                </span>
              </button>
              
              {/* Settings */}
              <button 
                onClick={() => router.push('/settings')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                  isMatrixTheme
                    ? 'bg-[rgba(10,15,30,0.5)] border-white/10 hover:border-[#00ff88]/50'
                    : 'bg-[#111] border-[#333] hover:border-[#39ff14]/50'
                }`}
              >
                <Settings className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Full Screen Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed inset-y-0 left-0 w-80 border-r z-50 overflow-y-auto ${
                isMatrixTheme 
                  ? 'bg-[#050a14]/95 border-white/10 backdrop-blur-xl' 
                  : 'bg-[#0f0f0f] border-[#222]'
              }`}
            >
              <div className={`p-4 border-b flex items-center justify-between ${
                isMatrixTheme ? 'border-white/10' : 'border-[#222]'
              }`}>
                <div className="flex items-center gap-3">
                  {isMatrixTheme ? (
                    <Grid3X3 className="w-6 h-6 text-[#00ff88]" />
                  ) : (
                    <Plane className="w-6 h-6 text-[#39ff14]" />
                  )}
                  <span className={`font-bold ${
                    isMatrixTheme ? 'text-[#00ff88] font-mono' : 'text-[#39ff14]'
                  }`}>
                    NAVIGATION
                  </span>
                </div>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Mobile Theme Toggle */}
              <div className="p-4 border-b border-white/10">
                <ThemeToggle />
              </div>
              
              <nav className="p-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.path
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        router.push(item.path)
                        setMenuOpen(false)
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        isActive 
                          ? isMatrixTheme
                            ? 'bg-[#00ff88]/10 border-[#00ff88]/30 text-[#00ff88]' 
                            : 'bg-[#39ff14]/10 border-[#39ff14]/30 text-[#39ff14]'
                          : isMatrixTheme
                            ? 'bg-transparent border-transparent text-white/60 hover:bg-white/5 hover:text-white'
                            : 'bg-transparent border-transparent text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-bold tracking-wider font-mono">{item.label}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="activeMenu"
                          className={`ml-auto w-2 h-2 rounded-full ${
                            isMatrixTheme 
                              ? 'bg-[#00ff88] shadow-[0_0_10px_#00ff88]' 
                              : 'bg-[#39ff14] shadow-[0_0_10px_#39ff14]'
                          }`}
                        />
                      )}
                    </button>
                  )
                })}
              </nav>
              
              <div className={`p-4 border-t mt-auto ${
                isMatrixTheme ? 'border-white/10' : 'border-[#222]'
              }`}>
                <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#ff0066]/30 text-[#ff0066] hover:bg-[#ff0066]/10 transition-colors">
                  <LogOut className="w-6 h-6" />
                  <span className="font-bold tracking-wider font-mono">DISCONNECT</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t z-40 backdrop-blur-xl ${
        isMatrixTheme 
          ? 'bg-[#050a14]/90 border-white/10' 
          : 'bg-[#0a0a0a] border-[#222]'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around overflow-x-auto scrollbar-hide">
            {navigation.slice(0, 5).map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`flex flex-col items-center gap-1 py-3 px-4 min-w-[70px] transition-all relative ${
                    isActive 
                      ? isMatrixTheme ? 'text-[#00ff88]' : 'text-[#39ff14]'
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-bold tracking-wider whitespace-nowrap font-mono">
                    {item.label.split(' ')[0]}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 ${
                        isMatrixTheme 
                          ? 'bg-[#00ff88] shadow-[0_0_10px_#00ff88]' 
                          : 'bg-[#39ff14] shadow-[0_0_10px_#39ff14]'
                      }`}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
