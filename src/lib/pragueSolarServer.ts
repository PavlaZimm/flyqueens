import 'server-only'
import { solarInsight } from './pragueLight'

/** Compatibility helper: local computation, no paid lookup. */
export async function getPragueSolar() { return solarInsight() }
