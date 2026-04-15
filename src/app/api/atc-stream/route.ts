import { NextRequest, NextResponse } from 'next/server'

// Node.js runtime — Edge runtime nepodporuje HTTP (jen HTTPS), audio.liveatc.net je pouze HTTP

// Proxy pro LiveATC audio stream — vyřeší CORS problém
export async function GET(req: NextRequest) {
  const feed = req.nextUrl.searchParams.get('feed')
  if (!feed || !/^[a-z0-9_]+$/i.test(feed)) {
    return new NextResponse('Invalid feed', { status: 400 })
  }

  const url = `http://audio.liveatc.net/${feed}`
  try {
    const upstream = await fetch(url, {
      headers: {
        'Icy-MetaData': '0',
        'User-Agent': 'Mozilla/5.0 FlyQueens/1.0',
      },
    })

    if (!upstream.ok || !upstream.body) {
      return new NextResponse('Stream unavailable', { status: 502 })
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': upstream.headers.get('Content-Type') ?? 'audio/mpeg',
        'Cache-Control': 'no-cache, no-store',
        'Transfer-Encoding': 'chunked',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch {
    return new NextResponse('Stream error', { status: 502 })
  }
}
