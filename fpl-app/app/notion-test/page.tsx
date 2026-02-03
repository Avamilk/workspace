'use client'

import { useState, useEffect } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { LEDText } from '../components/ui/LEDText'

export default function NotionTestPage() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [user, setUser] = useState<any>(null)
  const [databases, setDatabases] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/notion/test')
        const data = await res.json()
        
        if (!res.ok) {
          setStatus('error')
          setError(data.error || 'Failed to connect')
          return
        }
        
        setUser(data.user)
        setDatabases(data.databases)
        setStatus('connected')
      } catch (err: any) {
        setStatus('error')
        setError(err.message)
      }
    }
    
    init()
  }, [])

  return (
    <AppShell>
      <div className="mb-6 text-center">
        <LEDText size="xl">NOTION CONNECTION</LEDText>
        <LEDText color="amber" size="sm">Testing API Integration</LEDText>
      </div>

      {status === 'loading' && (
        <div className="cyber-panel p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-honey-gold/30 animate-pulse" />
          <p className="text-honey-amber font-led">Connecting to Notion...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="cyber-panel p-6 text-center" style={{ borderColor: 'rgba(255, 51, 51, 0.5)' }}>
          <p className="text-led-red font-led text-lg mb-2">❌ Connection Failed</p>
          <p className="text-honey-amber/60 font-led text-sm">{error}</p>
        </div>
      )}

      {status === 'connected' && user && (
        <div className="space-y-4">
          {/* User Info */}
          <div className="cyber-panel p-6 text-center" style={{ borderColor: 'rgba(57, 255, 20, 0.5)' }}>
            <p className="text-led-green font-led text-lg mb-2">✅ Connected!</p>
            <p className="text-honey-gold font-led text-xl">{user.name}</p>
            <p className="text-honey-amber/60 font-led text-sm">{user.email}</p>
          </div>

          {/* Databases */}
          <div className="cyber-panel p-4">
            <p className="text-honey-gold font-led text-sm mb-4">
              YOUR DATABASES ({databases.length})
            </p>
            
            {databases.length === 0 ? (
              <p className="text-honey-amber/60 font-led text-center py-4">
                No databases found. Create one in Notion first!
              </p>
            ) : (
              <div className="space-y-2">
                {databases.map((db: any) => (
                  <div 
                    key={db.id} 
                    className="p-3 rounded-lg bg-cyber-dark/50 border border-honey-gold/20"
                  >
                    <p className="text-honey-gold font-led">{db.title?.[0]?.text?.content || 'Untitled'}</p>
                    <p className="text-honey-amber/40 font-led text-xs">ID: {db.id}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="cyber-panel p-4">
            <p className="text-honey-gold font-led text-sm mb-3">QUICK ACTIONS</p>
            <div className="space-y-2">
              <button 
                className="cyber-button w-full py-3 text-sm"
                onClick={() => window.open('https://notion.so', '_blank')}
              >
                Open Notion →
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}
