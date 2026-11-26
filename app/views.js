// AngkaNusa views — one render function per hash route.
// The router in main.js calls these; each returns HTML and, where a chart
// is needed, draws it into the canvas after the HTML lands in the page.

import {
  HEADLINE, GROWTH, GROWTH_NOTES, GDP_LEVEL, SECTORS,
  INFLATION, INFLATION_NOTES, UNEMPLOYMENT, POVERTY, INFORMAL,
  EXPORTS, IMPORTS, PARTNERS, TOP_EXPORTS,
  POP_SERIES, AGE_GROUPS, PROVINCES, SEARCH_INDEX, SOURCES,
} from './data.js';
import { drawBars, drawLine, drawHbars, drawGrouped } from './charts.js';

const fmtM = (v) => `${v.toFixed(2)}m`;
const fmtPct = (v) => `${v > 0 ? '+' : ''}${v.toFixed(2)}%`;

function statCards(list) {
  return `<section class="cards" aria-label="Key figures">${list
    .map(
      (s) => `<article class="card"><p class="card-label">${s.label}</p>
        <p class="card-value">${s.value}</p><p class="card-detail">${s.detail}</p>
        <p class="card-source">Source: ${s.source}</p></article>`,
    )
    .join('')}</section>`;
}

function sourceLine(text) {
  return `<p class="source-line">Source: ${text}</p>`;
}

// ---------------------------------------------------------------- home
export function viewHome(state) {
  const tab = state.homeTab || 'population';
  const tabs = [
    ['population', 'Population'],
    ['economy', 'GDP growth'],
    ['prices', 'Inflation'],
  ];
  const notes = {
    population:
      'Indonesia is the fourth most populous country in the world, behind India, China and the United States — about 284 million people live across more than 17,000 islands.',
    economy:
      'The economy has grown about 5% a year since the pandemic rebound, reaching US$1.40 trillion in 2024.',
    prices:
      'Consumer-price inflation spiked to 5.51% in 2022 after fuel-subsidy cuts, then fell back inside Bank Indonesia’s target range.',
  };
  return `<section class="hero">
    <p class="eyebrow">BPS · World Bank · UN — checked 26 November 2026</p>
    <h1>Indonesia in Numbers</h1>
    <p class="lede">The country’s headline statistics in one place: how many people
    live here, how fast the economy grows, what things cost, who works, and
    what Indonesia sells to the world. Every figure carries its source and year.</p>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>At a glance</h2>
      <div class="tabs" role="tablist">${tabs
        .map(
          ([k, label]) =>
            `<button type="button" role="tab" data-chart="${k}" class="${tab === k ? 'active' : ''}" aria-selected="${tab === k}">${label}</button>`,
        )
        .join('')}</div>
    </div>
    <canvas id="home-chart" height="260" aria-label="Chart"></canvas>
    <p id="home-chart-note" class="note">${notes[tab]}</p>
    ${sourceLine('Population: UN World Population Prospects 2024; growth & inflation: BPS-Statistics Indonesia.')}
  </section>
  ${statCards(HEADLINE)}
  <section class="panel">
    <h2>Start exploring</h2>
    <div class="link-grid">
      <a href="#/economy"><strong>Economy</strong><span>GDP, growth and the sectors that make it up</span></a>
      <a href="#/population"><strong>Population</strong><span>284 million people, age structure and provinces</span></a>
      <a href="#/employment"><strong>Jobs &amp; poverty</strong><span>Unemployment, informal work and the poverty line</span></a>
      <a href="#/prices"><strong>Prices</strong><span>Inflation and what drives the cost of living</span></a>
      <a href="#/trade"><strong>Trade</strong><span>Exports, imports and the countries Indonesia trades with</span></a>
      <a href="#/sources"><strong>Sources</strong><span>Where every number comes from</span></a>
    </div>
  </section>`;
}

export function drawHome(state) {
  const canvas = document.getElementById('home-chart');
  if (!canvas) return;
  const tab = state.homeTab || 'population';
  if (tab === 'economy') {
    drawBars(canvas, GROWTH.map((g) => ({ label: g.year, value: g.value, highlight: g.year === 2024 })), { unit: '%' });
  } else if (tab === 'prices') {
    drawLine(canvas, INFLATION.map((g) => ({ label: g.year, value: g.value, highlight: g.year === 2022 })), { unit: '%' });
  } else {
    drawLine(canvas, POP_SERIES.map((g) => ({ label: g.year, value: g.value, highlight: g.year === 2025 })), { unit: 'm' });
  }
}

// ------------------------------------------------------------- economy
export function viewEconomy(state) {
  const year = state.ecoYear || 2024;
  const mode = state.ecoChart || 'growth';
  const g = GROWTH.find((x) => x.year === year);
  const modes = [
    ['growth', 'GDP growth'],
    ['level', 'GDP size'],
    ['sectors', 'Sectors'],
  ];
  return `<section class="page-head">
    <h1>Economy</h1>
    <p class="lede">Southeast Asia’s largest economy: US$1.40 trillion in 2024,
    growing about 5% a year, with manufacturing still its biggest sector.</p>
  </section>
  ${statCards(HEADLINE.filter((h) => ['gdp', 'growth', 'gdpPerCapita'].includes(h.id)))}
  <section class="panel">
    <div class="panel-head"><h2>Growth, 2019–2025</h2>
      <div class="tabs">${modes
        .map(
          ([k, label]) =>
            `<button type="button" data-eco-chart="${k}" class="${mode === k ? 'active' : ''}">${label}</button>`,
        )
        .join('')}</div>
    </div>
    <canvas id="eco-chart" height="260" aria-label="Economy chart"></canvas>
    <div class="year-row" role="group" aria-label="Pick a year">
      ${GROWTH.map(
        (x) =>
          `<button type="button" data-eco-year="${x.year}" class="${x.year === year ? 'active' : ''}">${x.year}</button>`,
      ).join('')}
    </div>
    <p id="eco-detail" class="detail"><strong>${g.year} — GDP grew ${fmtPct(g.value)}</strong> ${GROWTH_NOTES[g.year]}</p>
    ${sourceLine('Real GDP growth: BPS-Statistics Indonesia / World Bank WDI. GDP size: World Bank WDI, current US$.')}
  </section>
  <section class="panel">
    <h2>What the economy is made of</h2>
    <p class="note">Share of GDP by sector, 2025. Manufacturing is the largest single
    sector at 19.07%; the five biggest sectors together make up 63.92% of output.</p>
    <canvas id="eco-sectors" height="210" aria-label="Sectors chart"></canvas>
    ${sourceLine('BPS-Statistics Indonesia, full-year 2025 release, 5 February 2026.')}
  </section>`;
}

export function drawEconomy(state) {
  const canvas = document.getElementById('eco-chart');
  const mode = state.ecoChart || 'growth';
  if (canvas) {
    if (mode === 'level') {
      drawBars(canvas, GDP_LEVEL.map((g) => ({ label: g.year, value: g.value, highlight: g.year === 2024 })), { unit: '$bn' });
    } else if (mode === 'sectors') {
      drawHbars(canvas, SECTORS.slice(0, 5).map((s) => ({ label: s.name, value: s.share, highlight: s.name === 'Manufacturing' })), { unit: '%' });
    } else {
      drawBars(canvas, GROWTH.map((g) => ({ label: g.year, value: g.value, highlight: g.year === (state.ecoYear || 2024) })), { unit: '%' });
    }
  }
  const sec = document.getElementById('eco-sectors');
  if (sec) {
    drawHbars(sec, SECTORS.slice(0, 5).map((s) => ({ label: s.name, value: s.share, highlight: s.name === 'Manufacturing' })), { unit: '%' });
  }
}

// ----------------------------------------------------------- population
export function viewPopulation(state) {
  const region = state.region || 'All';
  const sortKey = state.sortKey || 'pop';
  const sortDir = state.sortDir || 'desc';
  const regions = ['All', 'Java', 'Sumatra', 'Sulawesi'];
  let rows = PROVINCES.filter((p) => region === 'All' || p.region === region);
  const key = sortKey === 'name' ? (p) => p.name : sortKey === 'share' ? (p) => p.share : (p) => p.pop;
  rows = [...rows].sort((a, b) => {
    const av = key(a);
    const bv = key(b);
    const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return sortDir === 'asc' ? cmp : -cmp;
  });
  return `<section class="page-head">
    <h1>Population</h1>
    <p class="lede">284.44 million people at mid-2025 (BPS projection) — the world’s
    fourth most populous country. More than half live on Java, an island
    smaller than the UK.</p>
  </section>
  ${statCards([
    { label: 'Population, mid-2025', value: '284.44m', detail: 'BPS projection; UN puts it at 285.72m', source: 'BPS-Statistics Indonesia / UN WPP 2024' },
    { label: 'Median age', value: '30.4 years', detail: 'A young country: 69% are of working age', source: 'UN World Population Prospects 2024' },
    { label: 'Urban share', value: '59.6%', detail: 'About 170 million people live in towns and cities', source: 'UN World Population Prospects 2024' },
    { label: 'Life expectancy', value: '71.3 years', detail: 'At birth, 2023', source: 'World Bank, World Development Indicators' },
  ])}
  <section class="panel">
    <div class="panel-head"><h2>Population, 2019–2025</h2></div>
    <canvas id="pop-chart" height="240" aria-label="Population chart"></canvas>
    ${sourceLine('UN World Population Prospects 2024, mid-year estimates. BPS official estimate for mid-2025 is 284.44 million.')}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Age structure, 2025</h2></div>
    <canvas id="age-chart" height="130" aria-label="Age structure chart"></canvas>
    <p class="note">Children (0–14) are 23.4% of the population, working ages (15–64)
    69.4%, and 65 and over 7.2%. The working-age bulge is the demographic
    bonus Indonesia is counting on through 2045.</p>
    ${sourceLine('UN World Population Prospects 2024.')}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Ten largest provinces</h2>
      <div class="tabs">${regions
        .map(
          (r) =>
            `<button type="button" data-region="${r}" class="${region === r ? 'active' : ''}">${r === 'All' ? 'All regions' : r}</button>`,
        )
        .join('')}</div>
    </div>
    <p class="note">Population at mid-2025. Tap a column heading to sort.</p>
    <div class="table-wrap"><table id="province-table">
      <thead><tr>
        <th><button type="button" data-sort="name">Province</button></th>
        <th>Region</th>
        <th><button type="button" data-sort="pop">Population</button></th>
        <th><button type="button" data-sort="share">Share</button></th>
        <th>Density /km²</th>
      </tr></thead>
      <tbody>${rows
        .map(
          (p) => `<tr><td>${p.name}</td><td>${p.region}</td>
            <td>${fmtM(p.pop)}</td><td>${p.share.toFixed(1)}%</td><td>${p.density.toLocaleString('en-US')}</td></tr>`,
        )
        .join('')}</tbody>
    </table></div>
    ${sourceLine('BPS-Statistics Indonesia mid-2025 provincial projections, via the 2025 provincial tables.')}
  </section>`;
}

export function drawPopulation() {
  const pop = document.getElementById('pop-chart');
  if (pop) drawLine(pop, POP_SERIES.map((g) => ({ label: g.year, value: g.value, highlight: g.year === 2025 })), { unit: 'm' });
  const age = document.getElementById('age-chart');
  if (age) {
    drawHbars(age, AGE_GROUPS.map((g) => ({ label: g.label, value: g.share, highlight: g.label.startsWith('15') })), { unit: '%', labelWidth: 150, rowHeight: 32 });
  }
}

// ----------------------------------------------------------- employment
export function viewEmployment(state) {
  const series = state.empSeries || 'unemployment';
  const tabs = [
    ['unemployment', 'Unemployment'],
    ['poverty', 'Poverty'],
    ['informal', 'Informal work'],
  ];
  const notes = {
    unemployment:
      'Open unemployment was 4.85% in August 2025 — 7.46 million people out of a labour force of about 154 million. It peaked at 7.07% in August 2020 and has fallen every year since.',
    poverty:
      'In March 2025, 8.47% of Indonesians — 23.85 million people — lived below the national poverty line of Rp609,160 per person per month. It is the lowest rate in two decades, and it fell further to 8.25% by September 2025.',
    informal:
      'Most Indonesians work informally: 57.80% of the employed, or 84.58 million people, in August 2025 — no contract, no social protection. Formal work is the minority.',
  };
  const chartData = {
    unemployment: UNEMPLOYMENT,
    poverty: POVERTY,
    informal: INFORMAL,
  }[series];
  return `<section class="page-head">
    <h1>Jobs &amp; poverty</h1>
    <p class="lede">Who works, who does not, and who lives below the poverty line —
    from the national labour-force survey (Sakernas) and the socio-economic survey (Susenas).</p>
  </section>
  ${statCards([
    { label: 'Unemployment, Aug 2025', value: '4.85%', detail: '7.46 million people; labour force about 154 million', source: 'BPS, Sakernas Aug 2025' },
    { label: 'Poverty, Mar 2025', value: '8.47%', detail: '23.85 million people; line Rp609,160 a month', source: 'BPS, Jul 2025 release' },
    { label: 'Informal workers', value: '57.80%', detail: '84.58 million employed people, Aug 2025', source: 'BPS, Sakernas Aug 2025' },
    { label: 'Average wage', value: 'Rp3.33m', detail: 'Average monthly wage of employees, Aug 2025', source: 'BPS, Sakernas Aug 2025' },
  ])}
  <section class="panel">
    <div class="panel-head"><h2>Labour market</h2>
      <div class="tabs">${tabs
        .map(
          ([k, label]) =>
            `<button type="button" data-series="${k}" class="${series === k ? 'active' : ''}">${label}</button>`,
        )
        .join('')}</div>
    </div>
    <canvas id="emp-chart" height="260" aria-label="Employment chart"></canvas>
    <p id="emp-note" class="detail">${notes[series]}</p>
    ${sourceLine('Unemployment & informal work: BPS Sakernas. Poverty: BPS Susenas, poverty profile releases.')}
  </section>
  <section class="panel">
    <h2>Reading the numbers</h2>
    <p class="note">BPS counts someone as employed if they worked even one hour in the
    survey week, so the unemployment rate alone flatters the picture: 7.91%
    of workers were underemployed in August 2025 (11.6 million people working
    under 35 hours a week and wanting more), and only 67.32% worked full-time.</p>
  </section>`;
}

export function drawEmployment(state) {
  const canvas = document.getElementById('emp-chart');
  if (!canvas) return;
  const series = state.empSeries || 'unemployment';
  const data = { unemployment: UNEMPLOYMENT, poverty: POVERTY, informal: INFORMAL }[series];
  drawLine(canvas, data.map((d) => ({ label: d.label, value: d.value, highlight: d.label === 'Mar 2025' || d.label === '2025' })), { unit: '%' });
}

// --------------------------------------------------------------- prices
export function viewPrices(state) {
  const year = state.priceYear || 2024;
  const c = INFLATION.find((x) => x.year === year);
  return `<section class="page-head">
    <h1>Prices</h1>
    <p class="lede">Consumer-price inflation, measured by BPS across 90 cities on a
    2022 = 100 base. The spike of 2022 and the calm that followed tell the
    story of fuel prices and food supply.</p>
  </section>
  ${statCards([
    { label: 'Inflation, Dec 2024', value: '1.57%', detail: 'Year on year; inside Bank Indonesia’s 1.5–3.5% target', source: 'BPS-Statistics Indonesia' },
    { label: 'Inflation, Dec 2025', value: '2.92%', detail: 'Year on year; annual average 2025 also 2.92%', source: 'BPS-Statistics Indonesia' },
    { label: 'Peak, 2022', value: '5.51%', detail: 'September 2022 fuel-subsidy cut pushed prices up', source: 'BPS-Statistics Indonesia' },
    { label: 'Target range', value: '1.5–3.5%', detail: 'Bank Indonesia inflation target, 2024–2026', source: 'Bank Indonesia' },
  ])}
  <section class="panel">
    <div class="panel-head"><h2>Inflation, 2019–2025</h2></div>
    <canvas id="price-chart" height="260" aria-label="Inflation chart"></canvas>
    <div class="year-row" role="group" aria-label="Pick a year">
      ${INFLATION.map(
        (x) =>
          `<button type="button" data-price-year="${x.year}" class="${x.year === year ? 'active' : ''}">${x.year}</button>`,
      ).join('')}
    </div>
    <p id="price-detail" class="detail"><strong>${c.year} — inflation ${c.value.toFixed(2)}%</strong> ${INFLATION_NOTES[c.year]}</p>
    ${sourceLine('BPS-Statistics Indonesia, CPI year-on-year at December.')}
  </section>
  <section class="panel">
    <h2>How BPS measures it</h2>
    <p class="note">The consumer price index tracks a basket of goods and services in 90
    cities, rebased to 2022 = 100. Food, beverages and tobacco carry the
    largest weight, so rice and cooking-oil prices move the headline more than
    almost anything else; administered prices (fuel, electricity) and volatile
    food are reported separately from core inflation.</p>
  </section>`;
}

export function drawPrices(state) {
  const canvas = document.getElementById('price-chart');
  if (!canvas) return;
  drawLine(canvas, INFLATION.map((g) => ({ label: g.year, value: g.value, highlight: g.year === (state.priceYear || 2024) })), { unit: '%' });
}

// ---------------------------------------------------------------- trade
export function viewTrade(state) {
  const mode = state.tradeMode || 'both';
  const modes = [
    ['both', 'Exports & imports'],
    ['exports', 'Exports'],
    ['imports', 'Imports'],
    ['balance', 'Balance'],
  ];
  return `<section class="page-head">
    <h1>Trade</h1>
    <p class="lede">Indonesia has run a goods-trade surplus every month since May 2020 —
    67 straight months by November 2025 — on coal, palm oil, nickel and steel.</p>
  </section>
  ${statCards([
    { label: 'Exports, 2024', value: 'US$266.5 bn', detail: 'Up 6.15% to US$282.9 bn in 2025', source: 'BPS-Statistics Indonesia' },
    { label: 'Imports, 2024', value: 'US$235.5 bn', detail: 'Machinery, raw materials and fuel dominate', source: 'BPS-Statistics Indonesia' },
    { label: 'Surplus, 2024', value: 'US$31.0 bn', detail: 'Goods trade balance, FOB exports vs CIF imports', source: 'BPS-Statistics Indonesia' },
    { label: 'Biggest market', value: 'China · 21%', detail: 'Share of exports, 2024; then the US (10%) and Japan (8%)', source: 'WITS / UN Comtrade' },
  ])}
  <section class="panel">
    <div class="panel-head"><h2>Goods trade, 2019–2025</h2>
      <div class="tabs">${modes
        .map(
          ([k, label]) =>
            `<button type="button" data-trade="${k}" class="${mode === k ? 'active' : ''}">${label}</button>`,
        )
        .join('')}</div>
    </div>
    <canvas id="trade-chart" height="260" aria-label="Trade chart"></canvas>
    <p class="note">Exports in teal, imports in amber. 2025 imports are an early UN
    Comtrade filing (US$241.8 bn); all other years are BPS final figures.</p>
    ${sourceLine('BPS-Statistics Indonesia, exports FOB / imports CIF, current US$.')}
  </section>
  <section class="panel">
    <h2>What Indonesia sells</h2>
    <div class="table-wrap"><table>
      <thead><tr><th>Product group</th><th>Share of exports</th><th>Note</th></tr></thead>
      <tbody>${TOP_EXPORTS.map(
        (t) => `<tr><td>${t.name}</td><td>${t.share}</td><td>${t.note}</td></tr>`,
      ).join('')}</tbody>
    </table></div>
    ${sourceLine('CEPII BACI reconciled data, 2024.')}
    <h2>Where it goes</h2>
    <canvas id="trade-partners" height="190" aria-label="Trading partners chart"></canvas>
    ${sourceLine('WITS / UN Comtrade, 2024, share of goods exports.')}
  </section>`;
}

export function drawTrade(state) {
  const canvas = document.getElementById('trade-chart');
  const mode = state.tradeMode || 'both';
  if (canvas) {
    if (mode === 'exports') {
      drawBars(canvas, EXPORTS.map((e) => ({ label: e.year, value: e.value, highlight: e.year === 2025 })), { unit: '$bn' });
    } else if (mode === 'imports') {
      drawBars(canvas, IMPORTS.map((e) => ({ label: e.year, value: e.value, highlight: e.year === 2025 })), { unit: '$bn' });
    } else if (mode === 'balance') {
      drawBars(canvas, EXPORTS.map((e, i) => ({ label: e.year, value: +(e.value - IMPORTS[i].value).toFixed(1), highlight: e.year === 2025 })), { unit: '$bn' });
    } else {
      drawGrouped(canvas, EXPORTS.map((e, i) => ({ label: e.year, values: [e.value, IMPORTS[i].value] })), { unit: '$bn' });
    }
  }
  const partners = document.getElementById('trade-partners');
  if (partners) {
    drawHbars(partners, PARTNERS.map((p) => ({ label: p.name, value: p.share, highlight: p.name === 'China' })), { unit: '%', labelWidth: 130 });
  }
}

// -------------------------------------------------------------- sources
export function viewSources() {
  return `<section class="page-head">
    <h1>Sources</h1>
    <p class="lede">Every figure on this site names its source and year where it
    appears. These are the publishers behind them.</p>
  </section>
  <section class="panel"><div class="table-wrap"><table>
    <thead><tr><th>Publisher</th><th>What it supplies</th><th>Latest used</th></tr></thead>
    <tbody>${SOURCES.map(
      (s) => `<tr><td>${s.publisher}</td><td>${s.supplies}</td><td>${s.latest}</td></tr>`,
    ).join('')}</tbody>
  </table></div></section>
  <section class="panel">
    <h2>How to read this site</h2>
    <p class="note">Figures are shown as published, in the units the publisher uses.
    Growth and inflation are year-on-year percentages. Trade is goods only,
    exports valued free-on-board and imports including cost, insurance and
    freight, so the two are not strictly comparable. Population figures mix
    BPS projections (the official estimate) with UN estimates where a longer
    series is needed; the source line under each chart says which.</p>
  </section>`;
}

// --------------------------------------------------------------- search
export function viewSearch(state) {
  const q = (state.q || '').trim();
  const lower = q.toLowerCase();
  const hits = q
    ? SEARCH_INDEX.filter(
        (e) =>
          e.title.toLowerCase().includes(lower) ||
          e.text.toLowerCase().includes(lower) ||
          e.keywords.toLowerCase().includes(lower),
      )
    : [];
  return `<section class="page-head">
    <h1>Search${q ? `: “${q}”` : ''}</h1>
    <p class="lede">${q ? `${hits.length} result${hits.length === 1 ? '' : 's'} across the site’s indicators and pages.` : 'Type in the search box above to find an indicator, a figure or a page.'}</p>
  </section>
  <section class="panel">
    ${hits.length === 0
      ? `<p class="note">${q ? `Nothing matched “${q}”. Try “inflation”, “poverty”, “exports”, “Java” or “GDP”.` : 'Try “inflation”, “poverty”, “exports”, “Java” or “GDP”.'}</p>`
      : `<ul class="results">${hits
          .map(
            (h) => `<li><a href="${h.route}"><strong>${h.title}</strong><span>${h.text}</span></a></li>`,
          )
          .join('')}</ul>`}
  </section>`;
}

// ------------------------------------------------------------ not found
export function viewNotFound(hash) {
  return `<section class="page-head">
    <h1>Page not found</h1>
    <p class="lede">There is no page at “${hash}”. The site’s pages are listed below.</p>
  </section>
  <section class="panel">
    <div class="link-grid">
      <a href="#/"><strong>Home</strong><span>The headline figures</span></a>
      <a href="#/economy"><strong>Economy</strong><span>GDP and growth</span></a>
      <a href="#/population"><strong>Population</strong><span>People and provinces</span></a>
      <a href="#/employment"><strong>Jobs &amp; poverty</strong><span>Work and the poverty line</span></a>
      <a href="#/prices"><strong>Prices</strong><span>Inflation</span></a>
      <a href="#/trade"><strong>Trade</strong><span>Exports and imports</span></a>
    </div>
  </section>`;
}
