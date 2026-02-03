import { AppShell } from '../components/layout/AppShell'
import { LEDText } from '../components/ui/LEDText'

export default function TeamPage() {
  return (
    <AppShell>
      <LEDText size="xl">MY TEAM</LEDText>
      <p className="text-[#4a4a5a] font-['VT323'] mt-4">Detailed team management coming soon...</p>
    </AppShell>
  )
}
