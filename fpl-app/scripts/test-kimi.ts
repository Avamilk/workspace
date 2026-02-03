import OpenAI from 'openai'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const kimi = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: 'https://api.moonshot.ai/v1',
})

async function test() {
  try {
    const response = await kimi.chat.completions.create({
      model: 'moonshot-v1-8k',
      messages: [{ role: 'user', content: 'Say "Kimi API connected" in 3 words' }],
    })
    console.log('✅', response.choices[0].message.content)
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    console.log('Key starts with:', process.env.MOONSHOT_API_KEY?.slice(0, 10))
  }
}

test()
