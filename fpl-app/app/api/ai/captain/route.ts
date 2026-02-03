import { NextRequest, NextResponse } from 'next/server'
import { getCaptainAdvice } from '@/lib/ai/advisor'

export async function POST(req: NextRequest) {
  try {
    const { teamData } = await req.json()
    
    if (!teamData) {
      return NextResponse.json(
        { error: 'No team data provided' },
        { status: 400 }
      )
    }

    const recommendation = await getCaptainAdvice(teamData)
    return NextResponse.json(recommendation)
  } catch (error) {
    console.error('AI Captain Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendation' },
      { status: 500 }
    )
  }
}
