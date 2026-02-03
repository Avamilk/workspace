import { MobileNav } from './MobileNav'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-24 relative">
      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto">
        {children}
      </main>
      
      {/* Bottom nav */}
      <MobileNav />
    </div>
  )
}
