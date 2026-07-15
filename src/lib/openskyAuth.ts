// OpenSky OAuth2 Client Credentials — token cache
//
// OpenSky přešel z basic auth na OAuth2. Anonymní přístup je limitovaný
// a z datacenter IP (Vercel) často nefunguje → potřebujeme přihlášení.
//
// Nastavení:
//   1. Registrace na https://opensky-network.org
//   2. Account → vytvořit API client → client_id + client_secret
//   3. Vercel env: OPENSKY_CLIENT_ID, OPENSKY_CLIENT_SECRET
//
// Bez credentials modul vrátí null → volající použije anonymní přístup.

const TOKEN_URL =
  'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token'

// Token platí 30 min — cachujeme a obnovujeme 30 s před vypršením
let cachedToken: string | null = null
let tokenExpiresAt = 0 // epoch ms

export async function getOpenSkyToken(): Promise<string | null> {
  const clientId = process.env.OPENSKY_CLIENT_ID
  const clientSecret = process.env.OPENSKY_CLIENT_SECRET

  // Bez credentials → anonymní přístup
  if (!clientId || !clientSecret) return null

  // Platný token v cache?
  const now = Date.now()
  if (cachedToken && now < tokenExpiresAt) return cachedToken

  try {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    })

    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) {
      console.warn(`[FlyQueens] OpenSky token error: ${res.status}`)
      return null
    }

    const data = (await res.json()) as { access_token?: string; expires_in?: number }
    if (!data.access_token) return null

    cachedToken = data.access_token
    // expires_in je v sekundách (typicky 1800 = 30 min); obnov 30 s dřív
    const ttlMs = ((data.expires_in ?? 1800) - 30) * 1000
    tokenExpiresAt = now + ttlMs
    return cachedToken
  } catch {
    // Timeout / síťová chyba → anonymní přístup
    return null
  }
}
