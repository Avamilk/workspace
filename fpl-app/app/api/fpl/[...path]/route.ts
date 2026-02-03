import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params
    const pathStr = path.join('/')
    const searchParams = request.nextUrl.searchParams.toString()
    const queryString = searchParams ? `?${searchParams}` : ''

    console.log('Proxying FPL request:', pathStr)

    const res = await fetch(
      `https://fantasy.premierleague.com/api/${pathStr}${queryString}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FPL-Retro/1.0)'
        },
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      console.error('FPL API error:', res.status, pathStr)
      return NextResponse.json(
        { error: `FPL API error: ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Proxy error:', error.message)
    return NextResponse.json(
      { error: 'Failed to fetch FPL data', details: error.message },
      { status: 500 }
    )
  }
}
