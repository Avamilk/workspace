// Stub Notion client for build compatibility
export async function testNotionConnection() {
  return {
    success: false,
    error: 'Notion integration not configured',
    user: null
  }
}

export async function listDatabases() {
  return {
    success: false,
    databases: [],
    error: 'Notion integration not configured'
  }
}
