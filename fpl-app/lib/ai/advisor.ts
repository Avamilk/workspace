import { GoogleGenerativeAI } from '@google/generative-ai'

export interface CaptainRecommendation {
  captain: string
  viceCaptain: string
  reasoning: string
  confidence: number
}

// Lazy-loaded Gemini client (initialized inside function for Netlify build compatibility)
let genAI: GoogleGenerativeAI | null = null

function getGeminiClient(): GoogleGenerativeAI | null {
  if (genAI) return genAI
  
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not set, using fallback recommendations')
    return null
  }
  
  genAI = new GoogleGenerativeAI(apiKey)
  return genAI
}

// Fallback recommendation when API is unavailable
function getFallbackRecommendation(teamData: any): CaptainRecommendation {
  const players = teamData?.players || []
  
  // Sort by form as fallback logic
  const sortedByForm = [...players]
    .filter((p: any) => p.position !== 'GK')
    .sort((a: any, b: any) => (b.form || 0) - (a.form || 0))
  
  const captain = sortedByForm[0]?.name || 'Salah'
  const viceCaptain = sortedByForm[1]?.name || 'Saka'
  
  return {
    captain,
    viceCaptain,
    reasoning: `Based on current form, ${captain} is the top pick with a form of ${sortedByForm[0]?.form || 'N/A'}. ` +
               `${viceCaptain} serves as a solid vice-captain option. ` +
               'This is a fallback recommendation (AI API unavailable).',
    confidence: 0.6
  }
}

export async function getCaptainAdvice(teamData: any): Promise<CaptainRecommendation> {
  const client = getGeminiClient()
  
  // Return fallback if no API key
  if (!client) {
    console.log('Using fallback captain recommendation')
    return getFallbackRecommendation(teamData)
  }

  const prompt = `You are an expert Fantasy Premier League analyst. Analyze this FPL team and recommend the best captain and vice-captain for the upcoming gameweek.

Team Data:
${JSON.stringify(teamData, null, 2)}

Consider the following factors:
1. Current form (last 5 gameweeks)
2. Upcoming fixture difficulty
3. Home vs away matches
4. Player ownership percentage (differential potential)
5. Expected goals (xG) and expected assists (xA)
6. Clean sheet potential for defenders
7. Any injuries or rotation risks

Respond ONLY in this JSON format:
{
  "captain": "Player Name",
  "viceCaptain": "Player Name", 
  "reasoning": "Detailed 2-3 sentence explanation of your recommendation",
  "confidence": 0.85
}

Confidence should be between 0.0 and 1.0 based on how clear-cut the decision is.`

  try {
    const model = client.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    })

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    
    const parsed = JSON.parse(jsonMatch[0])
    
    // Validate response format
    if (!parsed.captain || !parsed.viceCaptain || !parsed.reasoning || typeof parsed.confidence !== 'number') {
      throw new Error('Invalid response format from Gemini')
    }
    
    return {
      captain: parsed.captain,
      viceCaptain: parsed.viceCaptain,
      reasoning: parsed.reasoning,
      confidence: Math.max(0, Math.min(1, parsed.confidence)) // Clamp between 0-1
    }
    
  } catch (error: any) {
    console.error('Gemini API Error:', error)
    
    // Handle specific error cases
    if (error.message?.includes('rate limit') || error.status === 429) {
      console.warn('Gemini rate limited, using fallback')
    } else if (error.message?.includes('API key')) {
      console.warn('Invalid Gemini API key, using fallback')
    }
    
    return getFallbackRecommendation(teamData)
  }
}

// Also export for OpenRouter compatibility (if user wants to switch later)
export async function getCaptainAdviceOpenRouter(teamData: any): Promise<CaptainRecommendation> {
  const apiKey = process.env.OPENROUTER_API_KEY
  
  if (!apiKey) {
    console.log('OPENROUTER_API_KEY not set, using fallback')
    return getFallbackRecommendation(teamData)
  }

  const prompt = `You are an expert Fantasy Premier League analyst. Analyze this FPL team and recommend the best captain and vice-captain.

Team Data:
${JSON.stringify(teamData, null, 2)}

Respond ONLY in this JSON format:
{
  "captain": "Player Name",
  "viceCaptain": "Player Name",
  "reasoning": "Detailed explanation",
  "confidence": 0.85
}`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'FPL Captain Advisor'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ''
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    
    const parsed = JSON.parse(jsonMatch[0])
    
    return {
      captain: parsed.captain,
      viceCaptain: parsed.viceCaptain,
      reasoning: parsed.reasoning,
      confidence: Math.max(0, Math.min(1, parsed.confidence))
    }
    
  } catch (error) {
    console.error('OpenRouter Error:', error)
    return getFallbackRecommendation(teamData)
  }
}
