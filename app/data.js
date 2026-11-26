// AngkaNusa data — Indonesia in Numbers.
// Every figure below was checked against live sources in November 2026:
// BPS-Statistics Indonesia releases, World Bank WDI (2025/2026 vintage),
// UN World Population Prospects 2024, and UN Comtrade / WITS.
// Each figure carries its source and year so the site can show it.

export const COUNTRY = {
  name: 'Indonesia',
  tagline: 'Indonesia in Numbers',
  population2025: 284.44,
  populationNote: 'million people, mid-2025 (BPS projection)',
  rankPopulous: 4,
  provinces: 38,
  capital: 'Jakarta',
  currency: 'Indonesian rupiah (IDR)',
  updated: '26 November 2026',
};

export const HEADLINE = [
  {
    id: 'population',
    label: 'Population',
    value: '284.4 million',
    detail: 'mid-2025, BPS projection — the world’s 4th most populous country',
    source: 'BPS-Statistics Indonesia, Statistical Yearbook 2025',
  },
  {
    id: 'gdp',
    label: 'GDP',
    value: 'US$1.40 trillion',
    detail: '2024, current US$ — 16th largest economy in the world',
    source: 'World Bank, World Development Indicators 2025',
  },
  {
    id: 'growth',
    label: 'GDP growth',
    value: '+5.03%',
    detail: '2024, year on year; 2025 full year +5.11%',
    source: 'BPS-Statistics Indonesia, Feb 2026 release',
  },
  {
    id: 'gdpPerCapita',
    label: 'GDP per capita',
    value: 'US$4,925',
    detail: '2024, current US$; US$16,448 in PPP terms',
    source: 'World Bank, World Development Indicators 2025',
  },
  {
    id: 'inflation',
    label: 'Inflation (CPI)',
    value: '1.57%',
    detail: 'December 2024, year on year; 2.92% in December 2025',
    source: 'BPS-Statistics Indonesia',
  },
  {
    id: 'unemployment',
    label: 'Unemployment',
    value: '4.85%',
    detail: 'August 2025, open unemployment rate; 7.46 million people',
    source: 'BPS-Statistics Indonesia, Sakernas Aug 2025',
  },
  {
    id: 'poverty',
    label: 'Poverty rate',
    value: '8.47%',
    detail: 'March 2025 — 23.85 million people below the national line',
    source: 'BPS-Statistics Indonesia, Jul 2025 release',
  },
  {
    id: 'trade',
    label: 'Trade surplus',
    value: 'US$31.0 bn',
    detail: '2024 goods trade; exports US$266.5 bn, imports US$235.5 bn',
    source: 'BPS-Statistics Indonesia',
  },
];

// Real GDP growth, % year on year (BPS / World Bank).
export const GROWTH = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
  { year: 2025, value: 5.11 },
];

export const GROWTH_NOTES = {
  2019: 'Steady 5% growth before the pandemic; household consumption carried the year.',
  2020: 'The pandemic year: the economy contracted 2.07% as activity froze and exports fell.',
  2021: 'Recovery began as restrictions eased; exports and consumption picked up again.',
  2022: 'The strongest year since 2013: +5.31%, helped by high commodity prices and reopening.',
  2023: 'Growth held above 5% even as global demand cooled and commodity prices normalised.',
  2024: 'Growth of +5.03% on domestic demand; manufacturing and trade led the expansion.',
  2025: 'Full-year growth of +5.11%, the fastest since 2022, on strong household spending.',
};

// Nominal GDP, US$ billion (World Bank WDI).
export const GDP_LEVEL = [
  { year: 2019, value: 1119.1 },
  { year: 2020, value: 1059.1 },
  { year: 2021, value: 1186.5 },
  { year: 2022, value: 1319.1 },
  { year: 2023, value: 1371.2 },
  { year: 2024, value: 1396.3 },
  { year: 2025, value: 1450, estimate: true },
];

// Share of GDP by sector, 2025 (BPS full-year 2025 release, 5 Feb 2026).
export const SECTORS = [
  { name: 'Manufacturing', share: 19.07, note: 'Food processing, palm-oil products, vehicles' },
  { name: 'Wholesale & retail trade', share: 13.17, note: 'Trade and motor-vehicle repair' },
  { name: 'Agriculture, forestry & fishing', share: 13.10, note: 'Rice, palm oil, fisheries; rebounded in 2025' },
  { name: 'Construction', share: 9.83, note: 'Infrastructure and housing' },
  { name: 'Mining & quarrying', share: 8.75, note: 'Coal, nickel, copper and oil & gas' },
  { name: 'All other sectors', share: 36.08, note: 'Finance, transport, information, services and more' },
];
// Consumer-price inflation, % year on year at December (BPS).
export const INFLATION = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
  { year: 2025, value: 2.92 },
];

export const INFLATION_NOTES = {
  2019: 'Prices rose 2.72% — inside Bank Indonesia’s target, with food prices calm.',
  2020: 'Inflation fell to 1.68% as the pandemic crushed demand.',
  2021: 'Still soft at 1.87% while the economy reopened slowly.',
  2022: 'Prices jumped 5.51% after the September fuel-subsidy cut lifted administered prices.',
  2023: 'Inflation eased back to 2.61% as fuel effects faded and food supply steadied.',
  2024: 'Just 1.57% — the lowest December reading in years, helped by good harvests.',
  2025: 'Inflation of 2.92%, back near the middle of Bank Indonesia’s 1.5–3.5% target.',
};

// Open unemployment rate, % of labour force, August (BPS Sakernas).
export const UNEMPLOYMENT = [
  { label: '2019', value: 5.28 },
  { label: '2020', value: 7.07 },
  { label: '2021', value: 6.49 },
  { label: '2022', value: 5.86 },
  { label: '2023', value: 5.32 },
  { label: '2024', value: 4.91 },
  { label: '2025', value: 4.85 },
];

// Poverty rate, % of population (BPS Susenas; March each year).
export const POVERTY = [
  { label: 'Mar 2019', value: 9.41 },
  { label: 'Mar 2020', value: 9.78 },
  { label: 'Mar 2021', value: 10.14 },
  { label: 'Mar 2022', value: 9.54 },
  { label: 'Mar 2023', value: 9.36 },
  { label: 'Mar 2024', value: 9.03 },
  { label: 'Mar 2025', value: 8.47 },
];

// Informal workers as % of the employed, August (BPS Sakernas).
export const INFORMAL = [
  { label: '2019', value: 57.27 },
  { label: '2020', value: 60.47 },
  { label: '2021', value: 60.07 },
  { label: '2022', value: 59.31 },
  { label: '2023', value: 59.17 },
  { label: '2024', value: 58.18 },
  { label: '2025', value: 57.8 },
];

// Goods trade, US$ billion (BPS; exports FOB, imports CIF).
export const EXPORTS = [
  { year: 2019, value: 167.68 },
  { year: 2020, value: 163.19 },
  { year: 2021, value: 231.61 },
  { year: 2022, value: 291.98 },
  { year: 2023, value: 258.82 },
  { year: 2024, value: 266.51 },
  { year: 2025, value: 282.91 },
];

export const IMPORTS = [
  { year: 2019, value: 171.28 },
  { year: 2020, value: 141.57 },
  { year: 2021, value: 196.2 },
  { year: 2022, value: 237.45 },
  { year: 2023, value: 221.89 },
  { year: 2024, value: 235.45 },
  { year: 2025, value: 241.8 },
];

// Top export destinations, share of goods exports 2024 (WITS / UN Comtrade).
export const PARTNERS = [
  { name: 'China', share: 21.3 },
  { name: 'United States', share: 10.2 },
  { name: 'Japan', share: 7.8 },
  { name: 'India', share: 7.6 },
  { name: 'Malaysia', share: 5.0 },
];

// Largest export product groups, 2024 (CEPII BACI reconciled data).
export const TOP_EXPORTS = [
  { name: 'Mineral fuels & oils (coal, gas)', share: '20.8%', note: 'Coal is the single biggest export earner' },
  { name: 'Animal & vegetable fats (palm oil)', share: '11.7%', note: 'World’s largest palm-oil exporter' },
  { name: 'Iron & steel', share: '8.6%', note: 'Nickel smelting feeds stainless steel' },
  { name: 'Electrical machinery', share: '5.4%', note: 'Batteries, cables and components' },
  { name: 'Ores, slag & ash (nickel, copper)', share: '4.9%', note: 'Over half the world’s nickel output' },
];

// Population, mid-year millions (UN World Population Prospects 2024).
export const POP_SERIES = [
  { year: 2019, value: 272.5 },
  { year: 2020, value: 274.8 },
  { year: 2021, value: 276.8 },
  { year: 2022, value: 278.8 },
  { year: 2023, value: 281.2 },
  { year: 2024, value: 283.5 },
  { year: 2025, value: 285.7 },
];

// Age structure, % of population, 2025 (UN WPP 2024).
export const AGE_GROUPS = [
  { label: '0–14 years', share: 23.4 },
  { label: '15–64 years', share: 69.4 },
  { label: '65+ years', share: 7.2 },
];

// Ten largest provinces, mid-2025 (BPS provincial projections).
// Population in millions; share is % of the national total.
export const PROVINCES = [
  { name: 'West Java', region: 'Java', pop: 50.76, share: 17.8, density: 1370 },
  { name: 'East Java', region: 'Java', pop: 42.09, share: 14.8, density: 876 },
  { name: 'Central Java', region: 'Java', pop: 38.23, share: 13.4, density: 1113 },
  { name: 'North Sumatra', region: 'Sumatra', pop: 15.79, share: 5.5, density: 218 },
  { name: 'Banten', region: 'Java', pop: 12.54, share: 4.4, density: 1341 },
  { name: 'Jakarta', region: 'Java', pop: 10.68, share: 3.8, density: 16155 },
  { name: 'South Sulawesi', region: 'Sulawesi', pop: 9.62, share: 3.4, density: 205 },
  { name: 'Lampung', region: 'Sumatra', pop: 9.52, share: 3.3, density: 284 },
  { name: 'South Sumatra', region: 'Sumatra', pop: 8.93, share: 3.1, density: 103 },
  { name: 'Riau', region: 'Sumatra', pop: 6.81, share: 2.4, density: 76 },
];

// Search index: what the live search can find.
export const SEARCH_INDEX = [
  { title: 'Population — 284.44 million', route: '#/population', text: 'Indonesia is the fourth most populous country in the world; 284.44 million people at mid-2025 (BPS).', keywords: 'people census java provinces density' },
  { title: 'GDP — US$1.40 trillion', route: '#/economy', text: 'Nominal GDP of US$1,396 billion in 2024, the 16th largest economy (World Bank).', keywords: 'gross domestic product economy size' },
  { title: 'GDP growth — +5.03% in 2024', route: '#/economy', text: 'Real GDP grew 5.03% in 2024 and 5.11% in 2025; the 2020 contraction was −2.07%.', keywords: 'growth recession pandemic recovery' },
  { title: 'Inflation — 1.57% in December 2024', route: '#/prices', text: 'Consumer-price inflation was 1.57% in December 2024 and peaked at 5.51% in 2022.', keywords: 'cpi prices cost of living fuel' },
  { title: 'Unemployment — 4.85% in August 2025', route: '#/employment', text: 'Open unemployment of 4.85%; 7.46 million people out of a labour force of about 154 million.', keywords: 'jobs sakernas labour force work' },
  { title: 'Poverty — 8.47% in March 2025', route: '#/employment', text: '23.85 million people below the poverty line of Rp609,160 per person per month.', keywords: 'poor poverty line susenas' },
  { title: 'Informal work — 57.80%', route: '#/employment', text: '84.58 million employed people work informally, without a contract or social protection.', keywords: 'informal jobs contract' },
  { title: 'Exports — US$266.5 billion in 2024', route: '#/trade', text: 'Exports of US$266.5 billion in 2024, rising to US$282.9 billion in 2025; China takes 21%.', keywords: 'exports trade coal palm oil nickel' },
  { title: 'Imports — US$235.5 billion in 2024', route: '#/trade', text: 'Imports of US$235.5 billion in 2024, mostly machinery, raw materials and fuel.', keywords: 'imports trade deficit machinery' },
  { title: 'Trade surplus — US$31.0 billion', route: '#/trade', text: 'A goods-trade surplus every month since May 2020 — 67 straight months by November 2025.', keywords: 'surplus balance of trade' },
  { title: 'West Java — the largest province', route: '#/population', text: '50.76 million people at mid-2025, more than any other province; East Java 42.09m, Central Java 38.23m.', keywords: 'java west java bandung province' },
  { title: 'Age structure — median age 30.4', route: '#/population', text: '69.4% of Indonesians are of working age; the demographic bonus runs to 2045.', keywords: 'age median youth demographic bonus' },
  { title: 'Sectors — manufacturing 19.07%', route: '#/economy', text: 'Manufacturing is the largest sector at 19.07% of GDP in 2025, ahead of trade at 13.17%.', keywords: 'manufacturing agriculture mining construction' },
  { title: 'Sources', route: '#/sources', text: 'BPS-Statistics Indonesia, the World Bank, the United Nations and UN Comtrade.', keywords: 'bps world bank un sources data' },
];

// Publishers behind the figures.
export const SOURCES = [
  { publisher: 'BPS-Statistics Indonesia', supplies: 'GDP growth, inflation, unemployment, poverty, trade, provincial population', latest: 'Feb 2026 (full-year 2025 GDP); Aug 2026 (poverty Mar 2026)' },
  { publisher: 'World Bank — World Development Indicators', supplies: 'Nominal GDP, GDP per capita, PPP GDP, life expectancy', latest: '2025 vintage (July 2026 update)' },
  { publisher: 'United Nations — World Population Prospects 2024', supplies: 'Population series, age structure, median age, urban share, fertility', latest: '2024 revision' },
  { publisher: 'UN Comtrade / WITS', supplies: 'Export destinations and product shares', latest: '2024' },
  { publisher: 'CEPII BACI', supplies: 'Reconciled product-level trade (top export groups)', latest: '2024' },
  { publisher: 'Bank Indonesia', supplies: 'Inflation target range 1.5–3.5%', latest: '2024–2026 target' },
];
