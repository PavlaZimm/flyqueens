# FlyQueens — Roadmap

> Tento soubor je živý dokument. Aktualizuj ho po každé session.
> Poslední update: 2026-04-10 (session 2)

---

## ✅ Hotovo (MVP)

- [x] Live mapa letadel z OpenSky Network (polling 5s)
- [x] SVG siluety 8 typů letadel
- [x] Trasa za letadlem (12 bodů, přerušovaná čára)
- [x] Animované přelety letadel (easeInOut)
- [x] Dark / light mode (CartoDB tiles)
- [x] GPS tlačítko — flyTo na polohu uživatele
- [x] Detail panel — callsign, model, výška, rychlost, kurz
- [x] Přesný model letadla z databáze 427k záznamů
- [x] IATA trasa (PRG → VIE) z lookup tabulky 80+ airlines
- [x] Sidebar s live seznamem letů
- [x] Vyhledávání — filtruje mapu i seznam
- [x] 5 filtrů: Pasažérské / Nákladní / Soukromé / Vojenské / Vrtulníky
- [x] Statistiky stránka (/stats)
- [x] Rate limiting (30 req/min per IP)
- [x] Security headers (CSP, HSTS, X-Frame-Options...)
- [x] Input sanitizace
- [x] Loading screen s animací
- [x] Error boundary
- [x] Mock data banner (když OpenSky nedostupné)
- [x] UTC čas ve StatusBar
- [x] Klávesové zkratky (Esc, /)
- [x] Mobile: hamburger, bottom sheet, swipe-to-close
- [x] Swipe-down gesto na detail panel
- [x] GitHub + Vercel auto-deploy
- [x] SEO meta, Twitter card, robots
- [x] AeroDataBox integrace — přesná DEP→ARR trasa s progress barem a ETA
- [x] Vlastní doména flyqueens.cz (Wedos → Vercel)

---

## 🔵 Fáze 2 — Vylepšení mapy & UX

- [ ] **Letiště na mapě** — OurAirports CC0 data, vyfiltrováno na střední Evropu (~200 letišť), ikonky large/medium/small airport, hover tooltip (IATA + název), klik → detail, toggle v TopBaru
- [ ] **Počasí na mapě** — OpenWeatherMap tile overlay (oblačnost, déšť, vítr)
- [ ] **Cluster markery** — seskupení letadel při oddalení (Leaflet.markercluster)
- [ ] **Letové koridory** — statická vrstva hlavních tras nad Evropou
- [ ] **Světlý režim** — dočistit tooltip a popup styly

---

## 🟡 Fáze 3 — Data & Statistiky

- [ ] **Grafy ve statistikách** — sparkline počtu letadel v čase (localStorage)
- [ ] **Historie letu** — playback trasy za posledních 24h (OpenSky historical API)
- [ ] **Letiště detail** — klik na letiště → odjezdy + příjezdy, zpoždění
- [ ] **Leaderboard letišť** — která letiště mají nejvíc pohybu právě teď
- [ ] **Export CSV** — stáhnout data ze /stats

---

## 🟠 Fáze 4 — Social & Sdílení

- [ ] **Sdílení letu** — URL `/flight/DLH123` s live pozicí, ideální na stories
- [ ] **Upozornění** — notifikace při vojenském letadle nebo letu pod 1000m
- [ ] **Supabase auth** — přihlášení Google/email
- [ ] **Oblíbené lety** — ukládání do Supabase

---

## 🟣 Fáze 5 — Mobilní app

- [ ] **PWA manifest** — `manifest.json` + service worker
- [ ] **Přidat na plochu** — iOS i Android, funguje offline
- [ ] **Haptic feedback** — `navigator.vibrate()` při kliknutí na letadlo
- [ ] **TWA → Google Play** — zabalit PWA jako Android app přes PWABuilder
- [ ] **Push notifikace** — upozornění na zajímavá letadla na pozadí
- [ ] **App Store (iOS)** — vyžaduje React Native nebo Capacitor wrapper

---

## 💰 Monetizace

- [ ] **Affiliate booking** — v detail panelu tlačítko "Koupit letenku" → Kiwi.com affiliate link s `from` + `to` parametry (provize 1–3%)
- [ ] **PRO tier** — $2–5/měsíc: historie letů, notifikace, radar konkrétního letadla, bez reklam
- [ ] **Kiwi.com affiliate program** — registrace na partners.kiwi.com

---

## 💡 Nápady do budoucna

- [ ] Animace tab favicon (blikající puntík vedle ikony)
- [ ] Tmavý/světlý map style přepínač přímo na mapě
- [ ] Fullscreen mód (F klávesa)
- [ ] Vícejazyčná verze (EN/CS)
- [ ] Widget pro plochu (Android)
- [ ] Apple Watch companion app
- [ ] **Délka letu** — Airports Database API ($20/měsíc), zobrazit "2h 15min" v detail panelu
- [ ] **Trasa autem na letiště** — Trueway Routing API (zdarma), "z centra Prahy: 25 min"

---

## 📌 Technický dluh

- [ ] Leaflet marker clustering pro 200+ letadel
- [ ] Virtualizovaný seznam v sidebaru (react-virtual)
- [ ] Otestovat na Safari / iOS 16
- [ ] Lighthouse audit — cíl Performance ≥ 85
