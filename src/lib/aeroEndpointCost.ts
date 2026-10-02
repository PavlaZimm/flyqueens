/** Allow-list: pricing comes from the provider's API.Market OpenAPI specification. */
export function aeroEndpointCost(path: string): { board: boolean; units: number } | null {
  const route = path.split('?')[0]
  if (/^\/flights\/airports\/iata\/(PRG|BRQ|OSR|PED|KLV)$/.test(route)) return { board: true, units: 2 }
  if (/^\/aircrafts\/reg\/[A-Z0-9-]{3,10}(\/registrations)?$/.test(route)) return { board: false, units: 1 }
  if (/^\/airports\/iata\/PRG\/time\/solar\/\d{4}-\d{2}-\d{2}$/.test(route)) return { board: false, units: 1 }
  if (/^\/airports\/iata\/PRG\/(delays|stats\/routes\/daily\/\d{4}-\d{2}-\d{2})$/.test(route)) return { board: false, units: 6 }
  if (/^\/flights\/[A-Z0-9]{3,8}\/delays$/.test(route)) return { board: false, units: 6 }
  if (/^\/flights\/number\/[A-Z0-9]{3,8}\/\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}$/.test(route)) return { board: false, units: 6 }
  if (/^\/flights\/number\/[A-Z0-9]{3,8}\/\d{4}-\d{2}-\d{2}$/.test(route) || /^\/flights\/icao24\/[a-f0-9]{6}$/.test(route)) return { board: false, units: 2 }
  return null
}
