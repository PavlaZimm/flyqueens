import type { Flight } from '@/types/flight'

const EMERGENCY_SQUAWKS = new Set(['7500', '7600', '7700'])
const NON_EMERGENCY_VALUES = new Set(['', 'none', 'no emergency', 'false', '0', 'null', 'undefined'])
const ALERT_EMERGENCY_VALUES = new Set(['general', 'minfuel', 'nordo', 'unlawful', 'downed'])

export function normalizeEmergency(value: unknown): string | undefined {
  if (value == null || value === false) return undefined
  const normalized = String(value).trim()
  if (NON_EMERGENCY_VALUES.has(normalized.toLowerCase())) return undefined
  return normalized
}

export function isEmergencyFlight(flight: Pick<Flight, 'squawk' | 'emergency'>): boolean {
  const status = normalizeEmergency(flight.emergency)?.toLowerCase()
  return EMERGENCY_SQUAWKS.has(flight.squawk ?? '') || Boolean(status && ALERT_EMERGENCY_VALUES.has(status))
}
