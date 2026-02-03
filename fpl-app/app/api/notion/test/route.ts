import { NextResponse } from 'next/server'
import { testNotionConnection, listDatabases } from '../../../lib/notion/client'

export async function GET() {
  // Test connection
  const conn = await testNotionConnection()
  if (!conn.success) {
    return NextResponse.json({ error: conn.error }, { status: 500 })
  }
  
  // List databases
  const dbs = await listDatabases()
  
  return NextResponse.json({
    user: conn.user,
    databases: dbs.success ? dbs.databases : []
  })
}
