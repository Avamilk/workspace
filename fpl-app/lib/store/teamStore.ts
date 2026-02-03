import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TeamState {
  teamId: number | null
  teamData: any
  setTeam: (id: number, data: any) => void
  clearTeam: () => void
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teamId: null,
      teamData: null,
      setTeam: (id, data) => set({ teamId: id, teamData: data }),
      clearTeam: () => set({ teamId: null, teamData: null }),
    }),
    {
      name: 'fpl-team-storage',
    }
  )
)
