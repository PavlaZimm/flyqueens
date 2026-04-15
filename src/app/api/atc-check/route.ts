import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 0

async function checkFeed(feed: string): Promise<boolean> {
  const timeout = new Promise<boolean>(resolve => setTimeout(() => resolve(false), 5000))
  const check = fetch(`http://audio.liveatc.net/${feed}`, {
    method: 'GET',
    headers: { 'Icy-MetaData': '0' },
    signal: AbortSignal.timeout(5000),
  }).then(res => res.status === 200 || res.status === 206).catch(() => false)

  return Promise.race([check, timeout])
}

// Zkontroluje jeden nebo více feedů najednou
// ?feed=eidw8  nebo  ?feeds=eidw8,kjfk_twr,epwa_app
export async function GET(req: NextRequest) {
  const single = req.nextUrl.searchParams.get('feed')
  const multi  = req.nextUrl.searchParams.get('feeds')

  if (single) {
    if (!/^[a-z0-9_]+$/i.test(single)) {
      return NextResponse.json({ online: false }, { status: 400 })
    }
    const online = await checkFeed(single)
    return NextResponse.json({ online, status: online ? 200 : 404 })
  }

  if (multi) {
    const feeds = multi.split(',').filter(f => /^[a-z0-9_]+$/i.test(f)).slice(0, 30)
    const results = await Promise.all(feeds.map(f => checkFeed(f).then(online => [f, online] as [string, boolean])))
    return NextResponse.json(Object.fromEntries(results))
  }

  return NextResponse.json({ error: 'Missing feed param' }, { status: 400 })
}
