import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const source = ts.transpileModule(readFileSync('src/lib/analytics.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText

function setup({ consent = 'granted', hostname = 'www.flyqueens.cz', blockedStorage = false, blockedVercel = false, missingTag = false, server = false } = {}) {
  const calls = []
  const context = {
    exports: {},
    require: () => ({ track: () => { if (blockedVercel) throw new Error('blocked') } }),
    ...(!server && { window: {
      location: { hostname },
      localStorage: { getItem: () => { if (blockedStorage) throw new Error('blocked'); return consent } },
      ...(!missingTag && { gtag: (...args) => calls.push(args) }),
    } }),
  }
  vm.runInNewContext(source, context)
  return { calls, track: context.exports.trackEvent }
}

for (const options of [{ consent: null }, { consent: 'denied' }, { hostname: 'preview.vercel.app' }, { hostname: 'localhost' }, { blockedStorage: true }, { missingTag: true }, { server: true }]) {
  const test = setup(options)
  assert.doesNotThrow(() => test.track('Flight Detail Opened'))
  assert.equal(test.calls.length, 0, JSON.stringify(options))
}
for (const hostname of ['www.flyqueens.cz', 'flyqueens.cz']) {
  const test = setup({ hostname, blockedVercel: true })
  test.track('Flight Follow Changed', { active: true })
  assert.deepEqual(test.calls, [['event', 'flight_follow_changed', { active: true }]])
}
const revoked = setup()
revoked.track('Aircraft Photo Opened')
assert.equal(revoked.calls[0][1], 'aircraft_photo_opened')
console.log('Analytics: consent, production hosts, names and isolated provider failures passed.')
