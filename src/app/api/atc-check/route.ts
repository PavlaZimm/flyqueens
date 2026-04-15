import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 0 // vždy čerstvý status

// Zkontroluje jestli je LiveATC stream online (HEAD request ze serveru — bez CORS)
export async function GET(req: NextRequest) {
  const feed = req.nextUrl.searchParams.get('feed')
  if (!feed || !/^[a-z0-9_]+$/i.test(feed)) {
    return NextResponse.json({ online: false, error: 'Invalid feed' }, { status: 400 })
  }

  const url = `https://s1.liveatc.net/${feed}`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Icy-MetaData': '0', 'Range': 'bytes=0-1023' },
      signal: AbortSignal.timeout(4000),
    })
    // Icecast vrací 200 nebo 206 pokud stream běží
    const online = res.status === 200 || res.status === 206
    return NextResponse.json({ online, status: res.status })
  } catch {
    return NextResponse.json({ online: false, status: 0 })
  }
}
