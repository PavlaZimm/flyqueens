# Stay22 na FlyQueens

18. září 2026, na výslovné zadání Pavly převzato z přihlášeného Stay22 Hubu.

- Do existujícího účtu přidána doména `flyqueens.cz`; ostatní domény zachovány.
- Partnerské AID: `trip`. Veřejné LMA ID skriptu FlyQueens: `6aad790b12895152a4028ac0`. Nejde o přihlašovací tajemství.
- Zdroj skriptu: `https://scripts.stay22.com/letmeallez.js`. Hub zapíná LinkSwap, Spark a Nova; jejich výchozí nastavení nezměněno.
- Konfigurace přenesena z generátoru do `CookieConsent.tsx`. Next Script ji načítá jednou, strategií `lazyOnload`, až po novém souhlasu v2. Starý souhlas pouze s Google Analytics není použit pro Stay22.
- Na stránce O projektu lze souhlas změnit. Odvolání obnoví stránku a zastaví načítání volitelných skriptů. Statické partnerské odkazy zůstávají funkční.
- Článek `/letiste/praha/ubytovani` obsahuje viditelně označenou nabídku s `rel="sponsored noopener"`.
- Odkaz vytvořen v Link Generatoru účtu, kampaň `flyqueensprg`, původní cíl `https://www.booking.com/airport/cz/prg.html`, výsledný odkaz `https://booking.stay22.com/trip/aj0UA5GAPS`.
- Skutečné otevření tohoto odkazu vedlo na Booking.com s cílem PRG a souřadnicemi letiště, nikoli centra Prahy. Test nevytvořil rezervaci.
- Ceny ani dostupnost pokojů nevkládáme do redakčního textu. Aktuální nabídku zobrazí partner po výběru termínu.

## Kontrola po nasazení

Ověřit nepřítomnost skriptu před souhlasem a při odmítnutí, jeho jediné načtení po souhlasu, funkci při interní navigaci, odvolání souhlasu a mobilní rozložení rezervačního boxu. Úspěšné načtení neprokazuje započítání budoucí rezervace; to se ověřuje později v partnerském přehledu.

Oficiální postup: https://community.stay22.com/how-to-set-up-your-letmeallez-script

## Výsledek produkční kontroly

Nasazení `00bbc62` úspěšné. Lint, TypeScript a build prošly. Na produkci ověřeno: před souhlasem žádný Stay22 skript, po souhlasu právě jeden loader se správným LMA ID, po interní navigaci stále jediný loader, po odvolání souhlasu žádný Stay22 ani Google Analytics skript. Partnerský odkaz zůstává dostupný i po odmítnutí. Mobil 390 px: box bez vodorovného přesahu, označení i tlačítko čitelné.

Omezení ověření: Hub při závěrečné kontrole stále ukazoval Inactive a potvrzující zprávu LetMeAllez se nepodařilo zachytit. Veřejný skript vrací HTTP 200. Vložení loaderu není důkaz dokončené inicializace vzdálené služby. Automatické úpravy odkazů/Spark/Nova proto zatím nepovažovat za potvrzené; příští kontrolu zaměřit na aktivitu v Hubu. Vygenerovaný přímý partnerský odkaz byl ověřen nezávisle a funguje.
