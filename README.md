# AngkaNusa — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Alim-14-code/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Alim-14-code/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An original national statistics site for Indonesia, built for the
[make.fun best-national-statistics-site bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539).
It works in a desktop browser and on a phone, from static files only — no
build step, no network requests.

## What it covers

- **Home** — eight headline figures (population, GDP, growth, GDP per capita,
  inflation, unemployment, poverty, trade) with a switchable chart.
- **Economy** — real GDP growth 2019–2025, GDP size, and the 2025 sector mix
  (manufacturing 19.07%, trade 13.17%, agriculture 13.10%).
- **Population** — 284.44 million people at mid-2025, age structure, and a
  sortable, filterable table of the ten largest provinces.
- **Jobs & poverty** — unemployment, poverty and informal-work series from
  BPS surveys; poverty 8.47% in March 2025.
- **Prices** — CPI inflation 2019–2025, with the 2022 spike (5.51%) explained.
- **Trade** — exports and imports 2019–2025, top products and trading partners.
- **Sources** — every figure names its publisher and year where it appears.

Every control works: year selectors, chart tabs, series tabs, the trade view
toggle, province region filters, sortable columns, and live search.

## Figures

All figures were checked against live sources in November 2026:
BPS-Statistics Indonesia releases, World Bank World Development Indicators
(2025 vintage), UN World Population Prospects 2024, and UN Comtrade / WITS.

## Run it

```sh
node serve.ts        # http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts` library.

## Layout

| File | Job |
| --- | --- |
| `app/index.html` | Page shell: header, navigation, search, footer |
| `app/style.css` | All styling, including the phone layout |
| `app/data.js` | Every figure, with source and year |
| `app/charts.js` | Canvas bar, line and grouped-bar charts |
| `app/views.js` | One render function per route |
| `app/main.js` | Hash router and control wiring |
| `main.ts` | Build the hand-in (dossier) |
| `serve.ts` | Local static server for development |

## License

MIT — see [LICENSE](./LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?ref=e6d1qmmj&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
