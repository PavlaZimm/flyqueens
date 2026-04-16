# FlyQueens — Roadmap

> Tento soubor je živý dokument. Aktualizuj ho po každé session.
> Poslední update: 2026-04-16 (session 4)

---

## ✅ Hotovo

- [x] Live mapa letadel z OpenSky Network (polling 10s)
- [x] SVG siluety 8 typů letadel
- [x] Trasa za letadlem (12 bodů, přerušovaná čára)
- [x] Animované přelety letadel (easeInOut)
- [x] Dark / light mode (CartoDB tiles)
- [x] GPS tlačítko — flyTo na polohu uživatele + letadla nad hlavou v okruhu 30 km
- [x] Detail panel — callsign, model, výška, rychlost, kurz, fotka, airline logo
- [x] Přesný model letadla z databáze 427k záznamů
- [x] Sidebar s live seznamem letů + vyhledávání
- [x] 5 filtrů: Pasažérské / Nákladní / Soukromé / Vojenské / Vrtulníky
- [x] Letiště na mapě (toggle v TopBaru)
- [x] Statistiky stránka (/stats) — TOP 5, sparkline, teplota/vítr/mach, cestující
- [x] Proklik z TOP 5 statistik → mapa s detail panelem
- [x] Rate limiting, security headers, input sanitizace
- [x] Loading screen, error boundary, mock data banner
- [x] Mobile: hamburger, bottom sheet, swipe-to-close
- [x] Klávesové zkratky (Esc, /)
- [x] AeroDataBox — přesná DEP→ARR trasa, progress bar, ETA
- [x] PWA manifest + iOS ikona (zlaté letadlo na tmavém pozadí)
- [x] Vlastní doména flyqueens.cz
- [x] GitHub + Vercel auto-deploy

---

## 🔵 Fáze 2 — Mapa & UX

- [ ] **Cluster markery** — seskupení letadel při oddálení → umožní globální pokrytí bez sekání
- [ ] **Region selector** — přepínač Evropa / Amerika / Asie / Celý svět v TopBaru
- [ ] **Počasí na mapě** — OpenWeatherMap tile overlay (oblačnost, déšť, vítr)
- [ ] **Letové koridory** — statická vrstva hlavních tras nad Evropou
- [ ] **Světlý režim** — dočistit tooltip a popup styly
- [ ] **Animace favicon** — blikající puntík vedle ikony v záložce prohlížeče
- [ ] **Fullscreen mód** — klávesa F nebo tlačítko na mapě

---

## 🟡 Fáze 3 — Data & Detail

- [ ] **Letiště detail** — klik na letiště → odjezdy + příjezdy + zpoždění (AeroDataBox)
- [ ] **Délka letu** — zobrazit "2h 15min" v detail panelu (z AeroDataBox dat)
- [ ] **Historie letu** — playback trasy za posledních 24h (OpenSky historical API)
- [ ] **Leaderboard letišť** — která letiště mají nejvíc pohybu právě teď
- [ ] **Export CSV** — stáhnout data ze /stats
- [ ] **Grafy v čase** — trvalý sparkline z localStorage (přežije reload)

---

## 🟠 Fáze 4 — Social & Sdílení

- [ ] **Sdílení letu** — URL `/?flight=OK123` už funguje, udělat hezkou preview kartu pro sociální sítě
- [ ] **Upozornění** — notifikace při vojenském letadle nebo letu pod 1000m v okolí
- [ ] **Supabase auth** — přihlášení Google/email
- [ ] **Oblíbené lety** — ukládání do Supabase

---

## 🟣 Fáze 5 — Mobilní app

- [ ] **Haptic feedback** — `navigator.vibrate()` při kliknutí na letadlo
- [ ] **TWA → Google Play** — zabalit PWA jako Android app přes PWABuilder
- [ ] **Push notifikace** — upozornění na zajímavá letadla na pozadí
- [ ] **App Store (iOS)** — vyžaduje React Native nebo Capacitor wrapper

---

## 💰 Monetizace

- [ ] **Affiliate booking** — tlačítko "Koupit letenku" v detail panelu → Kiwi.com affiliate link s DEP+ARR (provize 1–3%)
- [ ] **Kiwi.com affiliate** — registrace na partners.kiwi.com
- [ ] **PRO tier** — $2–5/měsíc: historie letů, notifikace, radar konkrétního letadla, bez reklam

---

## 📌 Technický dluh

- [ ] Leaflet marker clustering — nutné pro globální pokrytí
- [ ] Virtualizovaný seznam v sidebaru (react-virtual) — pro 1000+ letadel
- [ ] Otestovat na Safari / iOS 16
- [ ] Lighthouse audit — cíl Performance ≥ 85
- [ ] `metadataBase` URL sjednotit na flyqueens.cz (je tam stará vercel URL)
