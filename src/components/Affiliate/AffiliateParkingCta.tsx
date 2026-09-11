import { AffiliateParkingLink } from './AffiliateParkingLink'

const ENV_KEYS = {
  praha: 'AFFILIATE_PARKING_PRG_URL',
  brno: 'AFFILIATE_PARKING_BRQ_URL',
  ostrava: 'AFFILIATE_PARKING_OSR_URL',
} as const

export function AffiliateParkingCta({ airport }: { airport: keyof typeof ENV_KEYS }) {
  const href = process.env[ENV_KEYS[airport]]
  if (!href || !/^https:\/\//.test(href)) return null
  return <AffiliateParkingLink href={href} airport={airport} />
}
