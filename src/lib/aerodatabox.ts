interface AeroDataBoxConnection {
  baseUrl: string
  headers: Record<string, string>
}

function configured(value: string | undefined): value is string {
  if (!value) return false
  const normalized = value.trim().toLowerCase()
  return normalized.length > 0 && !normalized.startsWith('your_') && normalized !== 'changeme'
}

export function getAeroDataBoxConnection(): AeroDataBoxConnection | null {
  const key = process.env.AERODATABOX_API_KEY
  const configuredBase = process.env.AERODATABOX_BASE_URL
  if (!configured(key) || !configured(configuredBase)) return null

  const baseUrl = configuredBase.trim().replace(/\/+$/, '')
  let host: string
  try {
    host = new URL(baseUrl).hostname.toLowerCase()
  } catch {
    return null
  }

  if (host === 'prod.api.market') {
    return { baseUrl, headers: { 'x-api-market-key': key.trim(), Accept: 'application/json' } }
  }

  if (host === 'aerodatabox.p.rapidapi.com') {
    return {
      baseUrl,
      headers: {
        'x-rapidapi-key': key.trim(),
        'x-rapidapi-host': host,
        Accept: 'application/json',
      },
    }
  }

  if (host === 'api.aerodatabox.com') {
    return { baseUrl, headers: { 'X-Api-Key': key.trim(), Accept: 'application/json' } }
  }

  return null
}
