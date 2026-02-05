import { NextRequest, NextResponse } from 'next/server'
import { getCaptainAdvice, CaptainRecommendation } from '@/lib/ai/advisor'

export async function POST(req: NextRequest) {
  try {
    const { teamData, gameweek } = await req.json()
    
    if (!teamData) {
      return NextResponse.json(
        { error: 'No team data provided' },
        { status: 400 }
      )
    }

    // Check if API key is configured (for client-side awareness)
    const hasGeminiKey = !!process.env.GEMINI_API_KEY
    const hasOpenRouterKey = !!process.env.OPENROUTER_API_KEY
    
    let recommendation: CaptainRecommendation
    
    try {
      recommendation = await getCaptainAdvice(teamData)
    } catch (aiError) {
      console.error('AI Service Error:', aiError)
      // Return fallback recommendation instead of error
      recommendation = {
        captain: 'Salah',
        viceCaptain: 'Saka',
        reasoning: 'AI service temporarily unavailable. Defaulting to top form players.',
        confidence: 0.5
      }
    }
    
    return NextResponse.json({
      ...recommendation,
      meta: {
        gameweek: gameweek || null,
        aiPowered: hasGeminiKey || hasOpenRouterKey,
        fallback: !hasGeminiKey && !hasOpenRouterKey,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('AI Captain Error:', error)
    
    // Always return a valid recommendation, never fail completely
    return NextResponse.json({
      captain: 'Salah',
      viceCaptain: 'Saka',
      reasoning: 'Error processing request. Defaulting to safe captain picks.',
      confidence: 0.3,
      meta: {
        error: true,
        timestamp: new Date().toISOString()
      }
    })
  }
}

// Health check endpoint
export async function GET() {
  const hasGeminiKey = !!process.env.GEMINI_API_KEY
  const hasOpenRouterKey = !!process.env.OPENROUTER_API_KEY
  
  return NextResponse.json({
    status: 'ok',
    aiConfigured: hasGeminiKey || hasOpenRouterKey,
    provider: hasGeminiKey ? 'gemini' : hasOpenRouterKey ? 'openrouter' : 'fallback'
  })
}
