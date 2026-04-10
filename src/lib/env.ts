// Validace server-side env proměnných při startu
// Pokud chybí kritické proměnné, logujeme warning (necrashujeme — app funguje s mock daty)

export function getServerEnv() {
  const username = process.env.OPENSKY_USERNAME
  const password = process.env.OPENSKY_PASSWORD

  if (!username || !password) {
    console.warn(
      '[FlyQueens] OPENSKY_USERNAME / OPENSKY_PASSWORD není nastaveno. ' +
      'App poběží s mock daty. Přidej credentials do .env.local'
    )
  }

  return { username, password }
}
