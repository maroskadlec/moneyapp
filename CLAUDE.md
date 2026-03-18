# MoneyApp — projektová dokumentace pro Claude

## Co je projekt
PWA aplikace pro sledování výdajů oproti čtvrtletnímu budgetu. Aktuálně jeden screen.
Nasazená na Vercel, repozitář: https://github.com/maroskadlec/moneyapp.git

## Stack
- React + Vite 8 (bez TypeScript)
- CSS Modules
- Recharts (line chart)
- localStorage (perzistence, žádný backend)
- PWA: ruční `public/sw.js` + `public/manifest.webmanifest` (vite-plugin-pwa odstraněn — nekompatibilní s Vite 8 a cestou s apostrofem)

## Kvartální období
Hardcoded: **18. 3. 2026 – 30. 6. 2026** (104 dní)
Definováno v `src/utils/dates.js` → konstanta `EFFECTIVE_START` a `QUARTER_END`

## Struktura souborů
```
src/
  App.jsx                        — hlavní logika, výpočty, localStorage
  main.jsx                       — entry point, registrace SW, ErrorBoundary
  index.css                      — CSS proměnné, globální reset
  utils/
    dates.js                     — výpočty dní, formatCZK, formatDate
  components/
    BudgetSetup.jsx/.module.css  — první obrazovka pro zadání budgetu
    Header.jsx/.module.css       — zbývající budget, progress bar
    StatsBar.jsx/.module.css     — denní limit / zbývající dny / odhad zbytku
    PaceAlert.jsx/.module.css    — varování při překročení tempa utrácení
    AddExpense.jsx/.module.css   — input + tlačítko pro přidání výdaje
    TrendChart.jsx/.module.css   — Recharts line chart (plán vs. skutečnost)
    ExpenseList.jsx/.module.css  — seznam výdajů s datem a smazáním
    ErrorBoundary.jsx            — zachytí runtime chyby v produkci
public/
  sw.js                          — jednoduchý service worker (cache-first)
  manifest.webmanifest           — PWA manifest
  icon-192.png, icon-512.png     — ikona (bust candle), generováno přes sips
  favicon.png                    — 32×32 favicon
```

## Klíčové výpočty (App.jsx)
```js
totalSpent       = součet všech výdajů
remaining        = budget - totalSpent
daysLeft         = daysRemaining()          // dny od dnes do 30.6.
daysElapsed      = Math.max(1, totalDays() - daysLeft)  // min 1 (první den)
dailyBudget      = remaining / daysLeft
avgDailySpend    = totalSpent / daysElapsed
projectedRemaining = budget - (avgDailySpend * totalDays())
overPace         = avgDailySpend > (budget / totalDays())
```

## localStorage klíče
- `moneyapp_budget` — číslo (string)
- `moneyapp_expenses` — JSON array `[{ id, amount, date }]`

## UI styl
Minimal Monochrome / e-ink estetika:
- Pozadí: `#f0ede8`, karty: `#ebe7e0`
- Bordery: `#c4c0b8` / `#d8d4cc`
- Text: `#1a1917`, muted: `#6b6760`, faint: `#9e9b96`
- Font: Georgia (serif) + Courier New (mono pro labely)
- Varování (PaceAlert): `#7a3b00` na `#f2e6d0`

## Známé věci / rozhodnutí
- `vite-plugin-pwa` odstraněn — konflikt s Vite 8 a cestou s apostrofem v názvu složky (`Marian'sDevelopment`)
- `vercel.json` se **nesmí** přidávat — rewrite pravidlo `/(.*) → index.html` blokuje načítání JS/CSS assetů
- Ikona: originální soubor na `/Users/mariankadlec/Desktop/20250922_1909_Bust_Candle_Artistry_gen_01k5sd5wqpex5t0cfj3ptwgfty 2.png`
- Lokální dev: `npm run dev` → typicky port 5173–5175

## Co projekt zatím nemá (záměrně vynecháno)
- Kategorie výdajů
- Opakující se výdaje
- Export CSV
- Více budgetů
- Poznámky u výdajů
