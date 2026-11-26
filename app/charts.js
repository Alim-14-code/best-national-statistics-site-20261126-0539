// AngkaNusa charts — small canvas chart helpers, written for this site.
// One job: turn a series of labelled numbers into a readable bar or line
// chart. No library, no network, plain 2D canvas.

const INK = '#17332f';
const MUTED = '#6b7a76';
const TEAL = '#0e6b5c';
const TEAL_DARK = '#0a4a40';
const AMBER = '#e8a13a';
const NEG = '#b3543f';
const GRID = '#dfe6e1';
const FONT = '12px system-ui, -apple-system, "Segoe UI", sans-serif';
const FONT_BOLD = '700 12px system-ui, -apple-system, "Segoe UI", sans-serif';

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 640;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);
  return { ctx, width, height };
}

function niceMax(values) {
  const max = Math.max(...values.map((v) => Math.abs(v)), 1);
  const step = Math.pow(10, Math.floor(Math.log10(max)));
  return Math.ceil(max / step) * step;
}

// Bar chart. Negative bars hang below the zero line, and their value label
// is drawn ABOVE the zero line, clear of the bar and of the year tick.
export function drawBars(canvas, series, opts = {}) {
  const height = opts.height || 260;
  const { ctx, width } = setup(canvas, height);
  const padL = 44;
  const padR = 12;
  const padT = 26;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const max = niceMax(series.map((s) => s.value));
  const min = Math.min(0, ...series.map((s) => s.value));
  const range = max - min;
  const zeroY = padT + (max / range) * plotH;
  const yFor = (v) => padT + ((max - v) / range) * plotH;

  ctx.font = FONT;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const ticks = 4;
  for (let i = 0; i <= ticks; i++) {
    const v = min + ((max - min) * i) / ticks;
    const y = yFor(v);
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(width - padR, y);
    ctx.stroke();
    ctx.fillText(fmtAxis(v, opts.unit), padL - 8, y);
  }

  const slot = plotW / series.length;
  const barW = Math.min(44, slot * 0.62);
  ctx.textAlign = 'center';
  series.forEach((s, i) => {
    const cx = padL + slot * i + slot / 2;
    const y = yFor(s.value);
    const isNeg = s.value < 0;
    ctx.fillStyle = s.highlight ? AMBER : isNeg ? NEG : TEAL;
    if (isNeg) {
      ctx.fillRect(cx - barW / 2, zeroY, barW, y - zeroY);
    } else {
      ctx.fillRect(cx - barW / 2, y, barW, zeroY - y);
    }
    // Value label: positives sit above their bar; a negative bar's label
    // sits above the zero line instead, so it never touches the bar or
    // the year printed underneath.
    ctx.font = FONT_BOLD;
    ctx.fillStyle = INK;
    const labelY = isNeg ? zeroY - 9 : y - 9;
    ctx.fillText(fmtValue(s.value, opts.unit), cx, labelY);
    ctx.font = FONT;
    ctx.fillStyle = MUTED;
    ctx.fillText(String(s.label), cx, height - 10);
  });

  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padL, zeroY);
  ctx.lineTo(width - padR, zeroY);
  ctx.stroke();
}

export function drawLine(canvas, series, opts = {}) {
  const height = opts.height || 260;
  const { ctx, width } = setup(canvas, height);
  const padL = 44;
  const padR = 16;
  const padT = 26;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const values = series.map((s) => s.value);
  const rawMax = Math.max(...values);
  const rawMin = Math.min(...values);
  const spread = rawMax - rawMin || 1;
  // Zoom the axis to the data when everything sits well above zero, so a
  // gently rising series still reads as a slope instead of a flat line.
  let lo;
  let hi;
  if (rawMin >= 0) {
    lo = Math.max(0, rawMin - spread * 0.4);
    hi = rawMax + spread * 0.4;
  } else {
    lo = rawMin - spread * 0.15;
    hi = rawMax + spread * 0.15;
  }
  const max = hi;
  const min = lo;
  const range = max - min || 1;
  const yFor = (v) => padT + ((max - v) / range) * plotH;
  const xFor = (i) => padL + (plotW * i) / (series.length - 1);

  ctx.font = FONT;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 4; i++) {
    const v = min + ((max - min) * i) / 4;
    const y = yFor(v);
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(width - padR, y);
    ctx.stroke();
    ctx.fillText(fmtAxis(v, opts.unit), padL - 8, y);
  }

  ctx.strokeStyle = TEAL;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  series.forEach((s, i) => {
    const x = xFor(i);
    const y = yFor(s.value);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.textAlign = 'center';
  series.forEach((s, i) => {
    const x = xFor(i);
    const y = yFor(s.value);
    ctx.fillStyle = s.highlight ? AMBER : TEAL;
    ctx.beginPath();
    ctx.arc(x, y, s.highlight ? 5.5 : 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.font = FONT_BOLD;
    ctx.fillStyle = INK;
    // Keep value labels inside the plot: the first point's label starts
    // just right of its dot and the last ends just left of it, so neither
    // runs into the axis labels at the left edge.
    if (i === 0) {
      ctx.textAlign = 'left';
      ctx.fillText(fmtValue(s.value, opts.unit), x + 8, y - 12);
    } else if (i === series.length - 1) {
      ctx.textAlign = 'right';
      ctx.fillText(fmtValue(s.value, opts.unit), x - 8, y - 12);
    } else {
      ctx.textAlign = 'center';
      ctx.fillText(fmtValue(s.value, opts.unit), x, y - 12);
    }
    ctx.font = FONT;
    ctx.fillStyle = MUTED;
    ctx.textAlign = 'center';
    ctx.fillText(String(s.label), x, height - 10);
  });
}

// Horizontal bars for shares and rankings.
export function drawHbars(canvas, rows, opts = {}) {
  const rowH = opts.rowHeight || 34;
  const height = rows.length * rowH + 16;
  const { ctx, width } = setup(canvas, height);
  const padL = opts.labelWidth || 190;
  const padR = 56;
  const max = Math.max(...rows.map((r) => r.value), 1);
  ctx.font = FONT;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const barW = ((width - padL - padR) / max) * r.value;
    ctx.textAlign = 'right';
    ctx.fillStyle = INK;
    ctx.textBaseline = 'middle';
    ctx.fillText(r.label, padL - 10, y + rowH / 2 - 4);
    ctx.fillStyle = r.highlight ? AMBER : TEAL;
    ctx.fillRect(padL, y + 4, Math.max(barW, 2), rowH - 16);
    ctx.textAlign = 'left';
    ctx.font = FONT_BOLD;
    ctx.fillStyle = INK;
    ctx.fillText(fmtValue(r.value, opts.unit), padL + barW + 8, y + rowH / 2 - 4);
    ctx.font = FONT;
  });
}

// Grouped bars: two series side by side (exports vs imports).
export function drawGrouped(canvas, groups, opts = {}) {
  const height = opts.height || 260;
  const { ctx, width } = setup(canvas, height);
  const padL = 44;
  const padR = 12;
  const padT = 26;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const all = groups.flatMap((g) => g.values);
  const max = niceMax(all);
  const yFor = (v) => padT + ((max - v) / max) * plotH;

  ctx.font = FONT;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 4; i++) {
    const v = (max * i) / 4;
    const y = yFor(v);
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(width - padR, y);
    ctx.stroke();
    ctx.fillText(fmtAxis(v, opts.unit), padL - 8, y);
  }

  const slot = plotW / groups.length;
  const barW = Math.min(30, slot * 0.32);
  ctx.textAlign = 'center';
  groups.forEach((g, i) => {
    const cx = padL + slot * i + slot / 2;
    g.values.forEach((v, j) => {
      const x = cx + (j - 0.5) * (barW + 3);
      const y = yFor(v);
      ctx.fillStyle = j === 0 ? TEAL : AMBER;
      ctx.fillRect(x - barW / 2, y, barW, padT + plotH - y);
    });
    ctx.font = FONT;
    ctx.fillStyle = MUTED;
    ctx.fillText(String(g.label), cx, height - 10);
  });

  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padL, padT + plotH);
  ctx.lineTo(width - padR, padT + plotH);
  ctx.stroke();
}

function fmtValue(v, unit) {
  if (unit === '%') return `${v > 0 ? '+' : ''}${v.toFixed(2)}%`;
  if (unit === '$bn') return `$${v.toFixed(0)}bn`;
  if (unit === 'm') return `${v.toFixed(1)}m`;
  return String(v);
}

function fmtAxis(v, unit) {
  if (unit === '%') return `${v.toFixed(0)}%`;
  if (unit === '$bn') return `$${v.toFixed(0)}bn`;
  if (unit === 'm') return `${v.toFixed(0)}m`;
  return String(v);
}

export { TEAL, TEAL_DARK, AMBER };
