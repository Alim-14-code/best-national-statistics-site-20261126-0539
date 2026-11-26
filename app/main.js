// AngkaNusa main — hash router and page wiring.
// One job: read the hash, render the matching view, draw its charts, and
// wire the controls by event delegation so every button does what it says.

import {
  viewHome, drawHome,
  viewEconomy, drawEconomy,
  viewPopulation, drawPopulation,
  viewEmployment, drawEmployment,
  viewPrices, drawPrices,
  viewTrade, drawTrade,
  viewSources, viewSearch, viewNotFound,
} from './views.js';

const app = document.getElementById('app');
const searchBox = document.getElementById('site-search');

// Page state that survives re-renders (which tab, year or filter is active).
const state = {
  homeTab: 'population',
  ecoYear: 2024,
  ecoChart: 'growth',
  region: 'All',
  sortKey: 'pop',
  sortDir: 'desc',
  empSeries: 'unemployment',
  priceYear: 2024,
  tradeMode: 'both',
  q: '',
};

const ROUTES = {
  '/': { view: viewHome, draw: drawHome },
  '/economy': { view: viewEconomy, draw: drawEconomy },
  '/population': { view: viewPopulation, draw: drawPopulation },
  '/employment': { view: viewEmployment, draw: drawEmployment },
  '/prices': { view: viewPrices, draw: drawPrices },
  '/trade': { view: viewTrade, draw: drawTrade },
  '/sources': { view: viewSources, draw: null },
  '/search': { view: viewSearch, draw: null },
};

function parseHash() {
  const raw = window.location.hash || '#/';
  const [pathPart, queryPart] = raw.slice(1).split('?');
  const path = pathPart === '' ? '/' : pathPart;
  const params = new URLSearchParams(queryPart || '');
  return { path, q: params.get('q') || '' };
}

function render() {
  const { path, q } = parseHash();
  state.q = q;
  const route = ROUTES[path];
  window.__shotReady = false;
  document.querySelectorAll('.nav a').forEach((a) => {
    a.classList.toggle('current', a.getAttribute('href') === `#${path}`);
  });
  if (route) {
    app.innerHTML = route.view(state);
    if (route.draw) route.draw(state);
  } else {
    app.innerHTML = viewNotFound(rawHash());
  }
  if (searchBox && searchBox.value !== q) searchBox.value = q;
  window.scrollTo(0, 0);
  // Charts draw synchronously above; let the browser paint once, then
  // tell the screenshot script the page is ready.
  requestAnimationFrame(() => {
    setTimeout(() => {
      window.__shotReady = true;
    }, 60);
  });
}

function rawHash() {
  return window.location.hash || '#/';
}

window.addEventListener('hashchange', render);

// --- controls: one delegated click handler for the whole page -----------
document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-chart], [data-eco-year], [data-eco-chart], [data-region], [data-sort], [data-series], [data-price-year], [data-trade]');
  if (!el) return;

  if (el.hasAttribute('data-chart')) {
    state.homeTab = el.getAttribute('data-chart');
    render();
    return;
  }
  if (el.hasAttribute('data-eco-year')) {
    state.ecoYear = Number(el.getAttribute('data-eco-year'));
    render();
    return;
  }
  if (el.hasAttribute('data-eco-chart')) {
    state.ecoChart = el.getAttribute('data-eco-chart');
    render();
    return;
  }
  if (el.hasAttribute('data-region')) {
    state.region = el.getAttribute('data-region');
    render();
    return;
  }
  if (el.hasAttribute('data-sort')) {
    const key = el.getAttribute('data-sort');
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKey = key;
      state.sortDir = 'asc';
    }
    // Sorting re-ranks the whole table, so it clears the region filter.
    state.region = 'All';
    render();
    return;
  }
  if (el.hasAttribute('data-series')) {
    state.empSeries = el.getAttribute('data-series');
    render();
    return;
  }
  if (el.hasAttribute('data-price-year')) {
    state.priceYear = Number(el.getAttribute('data-price-year'));
    render();
    return;
  }
  if (el.hasAttribute('data-trade')) {
    state.tradeMode = el.getAttribute('data-trade');
    render();
  }
});

// --- search: typing in the header box opens the results page -----------
let searchTimer = null;
if (searchBox) {
  searchBox.addEventListener('input', () => {
    clearTimeout(searchTimer);
    const value = searchBox.value.trim();
    searchTimer = setTimeout(() => {
      if (!value) return;
      const target = `#/search?q=${encodeURIComponent(value)}`;
      if (window.location.hash === target) {
        render();
      } else {
        window.location.hash = target;
      }
    }, 300);
  });
  searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      clearTimeout(searchTimer);
      const value = searchBox.value.trim();
      if (value) window.location.hash = `#/search?q=${encodeURIComponent(value)}`;
    }
  });
}

render();
