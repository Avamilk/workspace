import { Client } from '@notionhq/client'

// Initialize Notion client
export const notion = new Client({
  auth: process.env.NOTION_API_KEY || 'ntn_Bf4634339116rYJKfbeLdlUzUcfKMArRa7PA6BSeNzR4tJ'
})

// Test connection
export async function testNotionConnection() {
  try {
    const response = await notion.users.me({})
    return {
      success: true,
      user: response
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

// List all databases
export async function listDatabases() {
  try {
    const response = await notion.search({
      filter: {
        value: 'database',
        property: 'object'
      }
    })
    return {
      success: true,
      databases: response.results
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

// Create a database for FPL data
export async function createFPLDatabase(parentPageId: string) {
  try {
    const database = await notion.databases.create({
      parent: { page_id: parentPageId },
      title: [{ type: 'text', text: { content: 'FPL Team Tracker' } }],
      properties: {
        'Player': { title: {} },
        'Team': { select: {} },
        'Position': { select: {
          options: [
            { name: 'GK', color: 'red' },
            { name: 'DEF', color: 'blue' },
            { name: 'MID', color: 'green' },
            { name: 'FWD', color: 'yellow' }
          ]
        }},
        'Price': { number: { format: 'pound' } },
        'Points': { number: {} },
        'Form': { number: {} },
        'In Team': { checkbox: {} },
        'Captain': { checkbox: {} },
        'Notes': { rich_text: {} }
      }
    })
    return { success: true, database }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Add player to database
export async function addPlayer(databaseId: string, player: any) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Player': { title: [{ text: { content: player.name } }] },
        'Team': { select: { name: player.team } },
        'Position': { select: { name: player.position } },
        'Price': { number: player.price },
        'Points': { number: player.points },
        'Form': { number: player.form || 0 },
        'In Team': { checkbox: true },
        'Captain': { checkbox: player.isCaptain || false }
      }
    })
    return { success: true, page: response }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
