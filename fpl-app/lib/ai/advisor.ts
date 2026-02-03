import OpenAI from 'openai'

const kimi = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: 'https://api.moonshot.ai/v1',
})

export interface CaptainRecommendation {
  recommendation: string
  confidence: number
  reasoning: string
  alternative: string
  differential: string
}

export async function getCaptainAdvice(teamData: any): Promise<CaptainRecommendation> {
  const prompt = `Analyze this FPL team and recommend the best captain:

Team: ${JSON.stringify(teamData, null, 2)}

Consider: form, fixtures, home/away, ownership, differential potential.

Respond in JSON format:
{
  "recommendation": "Player Name",
  "confidence": 0.85,
  "reasoning": "Detailed explanation...",
  "alternative": "Safe alternative",
  "differential": "Low-owned option"
}`

  const response = await kimi.chat.completions.create({
    model: 'moonshot-v1-8k',
    messages: [
      {
        role: 'system',
        content: 'You are FPL Advisor, an expert Fantasy Premier League analyst. Be concise, data-driven, and strategic.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  })

  return JSON.parse(response.choices[0].message.content!)
}
