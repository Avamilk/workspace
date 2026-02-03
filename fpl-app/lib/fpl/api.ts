const FPL_BASE = '/api/fpl'

export async function getEntry(entryId: number) {
  const res = await fetch(`${FPL_BASE}/entry/${entryId}/`)
  if (!res.ok) throw new Error('Team not found')
  return res.json()
}

export async function getEntryHistory(entryId: number) {
  const res = await fetch(`${FPL_BASE}/entry/${entryId}/history/`)
  return res.json()
}

export async function getPicks(entryId: number, gameweek: number) {
  const res = await fetch(`${FPL_BASE}/entry/${entryId}/event/${gameweek}/picks/`)
  return res.json()
}

export async function getBootstrapStatic() {
  const res = await fetch(`${FPL_BASE}/bootstrap-static/`)
  return res.json()
}

// Get full team data for a gameweek
export async function getTeamData(entryId: number, gameweek?: number) {
  // Get entry info
  const entry = await getEntry(entryId)
  
  // Get current or specified gameweek
  const gw = gameweek || entry.current_event
  
  // Get picks for that gameweek
  const picks = await getPicks(entryId, gw)
  
  // Get player data (all players in FPL)
  const { elements } = await getBootstrapStatic()
  
  // Map picks to full player data
  const teamPlayers = picks.picks.map((pick: any) => {
    const player = elements.find((e: any) => e.id === pick.element)
    return {
      id: pick.element,
      name: player.web_name,
      team: getTeamShortName(player.team),
      position: getPosition(player.element_type),
      price: player.now_cost / 10,
      points: pick.points,
      isCaptain: pick.is_captain,
      isVice: pick.is_vice_captain,
      multiplier: pick.multiplier
    }
  })
  
  return {
    entry: {
      id: entryId,
      name: entry.name,
      playerName: entry.player_first_name + ' ' + entry.player_last_name,
      overallRank: entry.summary_overall_rank,
      totalPoints: entry.summary_total_points,
      gameweek: gw
    },
    players: teamPlayers,
    bank: picks.entry_history.bank / 10,
    teamValue: picks.entry_history.value / 10
  }
}

function getTeamShortName(teamId: number): string {
  const teams: Record<number, string> = {
    1: 'ARS',
    2: 'AVL',
    3: 'BOU',
    4: 'BRE',
    5: 'BHA',
    6: 'BUR',
    7: 'CHE',
    8: 'CRY',
    9: 'EVE',
    10: 'FUL',
    11: 'LIV',
    12: 'LUT',
    13: 'MCI',
    14: 'MUN',
    15: 'NEW',
    16: 'NFO',
    17: 'SHU',
    18: 'TOT',
    19: 'WHU',
    20: 'WOL'
  }
  return teams[teamId] || 'UNK'
}

function getPosition(type: number): 'GK' | 'DEF' | 'MID' | 'FWD' {
  const positions: Record<number, 'GK' | 'DEF' | 'MID' | 'FWD'> = {
    1: 'GK',
    2: 'DEF',
    3: 'MID',
    4: 'FWD'
  }
  return positions[type] || 'MID'
}
