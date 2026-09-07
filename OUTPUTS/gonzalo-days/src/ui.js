/* ============================================================
   Gonzalo's Days — UI
   ============================================================ */
(function(){
'use strict';
const G = window.GD, C = window.GD_CONTENT;
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
const esc = G.esc;
let lang = G.prefs.lang;
function t(k, p){
  let s = C.T[lang][k]; if (s == null) s = C.T.en[k]; if (s == null) return k;
  if (p) for (const key of Object.keys(p)) s = s.split('{' + key + '}').join(p[key]);
  return s;
}
const L = obj => (obj && (obj[lang] != null ? obj[lang] : obj.en)) || '';
const pair = s => { const a = s.split('|'); return lang === 'es' && a[1] ? a[1] : a[0]; };

const ui = { tab: 'today', logDay: G.todayKey(), gMeasure: 'w', gRange: 3, gTable: false, guideBand: null, sheet: null, toastTimer: null, askBusy: false };

/* ---------------- icons ---------------- */
const I = {
  today: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  log: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></svg>',
  growth: '<svg viewBox="0 0 24 24"><path d="M3 20h18"/><path d="M4 16c4-1 6-6 9-8s5-2 7-5"/><circle cx="20" cy="3" r="1.5"/></svg>',
  guide: '<svg viewBox="0 0 24 24"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
  health: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/><path d="M8 12h2l1.5-3 2 6 1.5-3h1"/></svg>',
  breastL: '<svg viewBox="0 0 24 24"><path d="M15 4a7 7 0 1 0 0 14"/><path d="M15 4v14"/><circle cx="15" cy="11" r="1.2"/></svg>',
  breastR: '<svg viewBox="0 0 24 24"><path d="M9 4a7 7 0 1 1 0 14"/><path d="M9 4v14"/><circle cx="9" cy="11" r="1.2"/></svg>',
  bottle: '<svg viewBox="0 0 24 24"><path d="M10 3h4v3l1 1v2h-6V7l1-1z"/><path d="M8 9h8v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"/><path d="M8 14h8"/></svg>',
  sleep: '<svg viewBox="0 0 24 24"><path d="M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5z"/></svg>',
  wet: '<svg viewBox="0 0 24 24"><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/></svg>',
  dirty: '<svg viewBox="0 0 24 24"><path d="M7 20h10a3 3 0 0 0 1-5.8A4 4 0 0 0 14 9a4 4 0 0 0-6 3.5A3 3 0 0 0 7 20z"/><path d="M12 9V6a2 2 0 0 1 2-2"/></svg>',
  pump: '<svg viewBox="0 0 24 24"><path d="M5 9h6l2-4h4a2 2 0 0 1 2 2v4"/><path d="M6 9v8a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-3"/><path d="M15 14h4"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  chevL: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  chevR: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
  share: '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  dev: '<svg viewBox="0 0 24 24"><path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9L9.5 8z"/></svg>',
  warn: '<svg viewBox="0 0 24 24"><path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17.5v.5"/></svg>',
  tip: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>',
  next: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
};

/* ---------------- shell ---------------- */
function renderShell(){
  const root = $('#app');
  root.innerHTML = `
  <header class="top">
    <div class="brand">
      <h1>Gonzalo</h1>
      <div class="age" id="agebox"></div>
    </div>
    <div class="topctl">
      <button class="chipbtn" id="whobtn" data-act="who" title="${esc(t('who'))}"></button>
      <button class="chipbtn" id="syncbtn" data-act="settings"></button>
      <div class="langtog" role="group" aria-label="Language">
        <button data-act="lang" data-v="en" aria-pressed="${lang === 'en'}">EN</button>
        <button data-act="lang" data-v="es" aria-pressed="${lang === 'es'}">ES</button>
      </div>
      <button class="chipbtn" data-act="settings" aria-label="${esc(t('s_title'))}" style="padding:6px 8px">${I.gear.replace('<svg', '<svg width="16" height="16" style="stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"')}</button>
    </div>
  </header>
  <div id="robanner" hidden class="note bad">${esc(t('ro_banner'))}</div>
  <nav class="tabs" role="tablist"><div class="inner">
    ${['today', 'log', 'growth', 'guide', 'health'].map(k => `<button role="tab" data-act="tab" data-v="${k}" aria-selected="${ui.tab === k}"><span class="ico">${I[k]}</span><span>${esc(t('nav_' + k))}</span></button>`).join('')}
  </div></nav>
  <main>
    <div class="panel" id="p-today"></div>
    <div class="panel" id="p-log" hidden></div>
    <div class="panel" id="p-growth" hidden></div>
    <div class="panel" id="p-guide" hidden></div>
    <div class="panel" id="p-health" hidden></div>
  </main>
  <footer><p>${esc(t('foot_1'))}</p><p>${esc(t('foot_2'))}</p></footer>
  <div id="toast" hidden></div>
  <div id="sheetroot"></div>`;
  document.title = t('appName');
  renderHeader();
}
function ageString(key, long){
  const days = G.ageDaysAt(key);
  if (days < 91){ const w = Math.floor(days / 7), d = days % 7; return t(long ? 'age_wd_long' : 'age_wd', { w, d }); }
  const a = G.ageMonths(key); return t(long ? 'age_md_long' : 'age_md', { m: a.months, d: a.days });
}
function renderHeader(){
  const key = G.todayKey();
  $('#agebox').innerHTML = `<b>${esc(ageString(key, true))}</b> · ${esc(t('age_days', { n: G.ageDaysAt(key) }))} · ${esc(t('born', { date: G.fmtDateShort(G.PROFILE.dobKey, lang) }))}`;
  const who = G.prefs.who;
  $('#whobtn').innerHTML = `<span class="dot" style="background:var(--sun)"></span>${esc(who || t('who'))}`;
  const m = G.state.mode;
  const cls = m === 'db' ? 'live' : (m === 'local' ? 'local' : '');
  const label = G.state.writeError && m === 'db' ? t('sync_error') : t(m === 'db' ? 'sync_live' : m === 'local' ? 'sync_local' : m === 'readonly' ? 'sync_readonly' : 'sync_connecting');
  $('#syncbtn').innerHTML = `<span class="dot ${cls}"></span>${esc(label)}`;
  $('#syncbtn').title = m === 'db' ? t('sync_live_tip') : t('sync_local_tip');
  $('#robanner').hidden = m !== 'readonly';
}

/* ---------------- helpers ---------------- */
function dueKeyFor(months){ return Number.isInteger(months) ? G.keyAtAgeMonths(months) : G.addDays(G.PROFILE.dobKey, Math.round(months * 30.4375)); }
function visitKeyFor(v){ return v.months < 1 ? G.addDays(G.PROFILE.dobKey, 4) : G.keyAtAgeMonths(v.months); }
const fmtT = ms => G.fmtTime(ms, lang);
const fmtD = mins => G.fmtDur(mins, lang);
function agoStr(ms){ return t('now_ago', { t: fmtD((Date.now() - ms) / 60000) }); }
function evLabel(e){
  if (e.t === 'feed'){
    if (e.sub === 'L' || e.sub === 'R') return t('breast') + ' · ' + t('side_' + e.sub);
    if (e.sub === 'bottle') return t('bottle');
    return t('solids');
  }
  if (e.t === 'sleep') return t('e_sleep');
  if (e.t === 'diaper') return t('e_diaper') + ' · ' + t('d_' + (e.sub || 'wet'));
  if (e.t === 'pump') return t('e_pump') + (e.sub ? ' · ' + t('side_' + e.sub) : '');
  if (e.t === 'care') return t('c_' + (e.sub || 'note'));
  return e.t;
}
function evDetail(e){
  const now = Date.now();
  const parts = [];
  if (e.t === 'feed' && (e.sub === 'L' || e.sub === 'R')) parts.push(e.e == null ? t('running') : fmtD((e.e - e.s) / 60000));
  if (e.t === 'sleep') parts.push(e.e == null ? t('running') : fmtD((e.e - e.s) / 60000) + ' · ' + fmtT(e.s) + '–' + fmtT(e.e));
  if ((e.t === 'feed' && e.sub === 'bottle') || e.t === 'pump') if (e.a != null) parts.push(G.units.vol(e.a, G.prefs.vol));
  if (e.t === 'pump' && e.e == null && e.a == null) parts.push(t('running'));
  if (e.t === 'care' && e.sub === 'tummy' && e.a != null) parts.push(e.a + ' ' + t('min'));
  if (e.t === 'care' && e.sub === 'temp' && e.a != null) parts.push(G.units.temp(G.prefs.temp === 'C' ? (e.u === 'C' ? e.a : (e.a - 32) * 5 / 9) : (e.u === 'C' ? e.a * 9 / 5 + 32 : e.a), G.prefs.temp));
  return parts.join(' · ');
}
function toast(msg, action){
  const el = $('#toast');
  clearTimeout(ui.toastTimer);
  el.className = 'toast'; el.hidden = false;
  el.innerHTML = `<span>${esc(msg)}</span>${action ? action.map((a, i) => `<button data-act="toastact" data-i="${i}">${esc(a.label)}</button>`).join('') : ''}`;
  el._actions = action || [];
  ui.toastTimer = setTimeout(() => { el.hidden = true; }, action ? 7000 : 2500);
}

/* ---------------- TODAY ---------------- */
function renderToday(){
  const p = $('#p-today');
  const key = G.todayKey();
  p.innerHTML = `
    <section class="now" id="nowstrip">${nowTilesHTML()}</section>
    <section class="actions" id="actions">${actionsHTML()}</section>
    <section class="totals" id="totals">${totalsHTML(key)}</section>
    <section class="card">
      <div class="cardhead"><h2>${esc(t('ribbon_title'))}</h2><span class="sub">${esc(G.fmtDate(key, lang))} · ${esc(t('ribbon_sub'))}</span></div>
      <div class="ribbon" id="ribbon-today"></div>
      <div class="legend"><span class="sleep"><i></i>${esc(t('leg_sleep'))}</span><span class="feed"><i></i>${esc(t('leg_feed'))}</span><span class="diaper"><i></i>${esc(t('leg_diaper'))}</span><span class="care"><i></i>${esc(t('leg_care'))}</span></div>
    </section>
    <section class="card">
      <div class="cardhead"><h2>${esc(t('entries'))}</h2><span class="sub" id="vitd-line"></span></div>
      <div class="entries" id="entries-today"></div>
    </section>
    ${G.state.sample ? askHTML() : ''}`;
  renderRibbon($('#ribbon-today'), key);
  renderEntries($('#entries-today'), key);
  const s = G.summarize(key);
  $('#vitd-line').innerHTML = `<span class="pill ${s.vitd ? 'good' : ''}">${esc(t(s.vitd ? 'vitd_done' : 'vitd_not'))}</span>`;
}
function nowTilesHTML(){
  const now = Date.now();
  const days = G.ageDays();
  const feeds = G.eventsBetween(now - 3 * 86400000, now).filter(e => e.t === 'feed');
  const lastFeed = feeds.length ? feeds[feeds.length - 1] : null;
  const sleeps = G.eventsBetween(now - 3 * 86400000, now).filter(e => e.t === 'sleep');
  const lastSleep = sleeps.length ? sleeps[sleeps.length - 1] : null;
  const lastDiaper = G.lastOf('diaper');
  const wake = C.wakeFor(days);
  // feed tile
  let feedV = t('now_none'), feedD = '', feedHint = t('typical_feed', { x: L(C.feedIntervalFor(days)) });
  if (lastFeed){
    const ref = lastFeed.e == null && (lastFeed.sub === 'L' || lastFeed.sub === 'R') ? lastFeed.s : (lastFeed.e || lastFeed.s);
    feedV = lastFeed.e == null && (lastFeed.sub === 'L' || lastFeed.sub === 'R') ? `<span data-elapsed="${lastFeed.s}">${G.fmtClock(now - lastFeed.s)}</span>` : `<span data-ago="${ref}">${esc(fmtD((now - ref) / 60000))}</span><small> ${esc(lang === 'es' ? 'hace' : 'ago')}</small>`;
    if (lang === 'es' && !(lastFeed.e == null && (lastFeed.sub === 'L' || lastFeed.sub === 'R'))) feedV = `<small>hace </small><span data-ago="${ref}">${esc(fmtD((now - ref) / 60000))}</span>`;
    feedD = fmtT(lastFeed.s) + ' · ' + evLabel(lastFeed).replace(t('breast') + ' · ', '') + (evDetail(lastFeed) ? ' · ' + evDetail(lastFeed) : '');
  }
  // sleep tile
  let sleepK = t('now_awake'), sleepV = t('now_none'), sleepD = t('now_napHint'), live = '';
  if (lastSleep){
    if (lastSleep.e == null){
      sleepK = t('now_asleep'); live = 'live';
      sleepV = `<span data-elapsed="${lastSleep.s}">${G.fmtClock(now - lastSleep.s)}</span>`;
      sleepD = t('now_since', { t: fmtT(lastSleep.s) });
    } else {
      const awake = (now - lastSleep.e) / 60000;
      sleepV = (lang === 'es' ? '' : '') + `<span data-ago="${lastSleep.e}">${esc(fmtD(awake))}</span>`;
      const a = lastSleep.e + wake.min * 60000, b = lastSleep.e + wake.max * 60000;
      if (now < a) sleepD = t('now_nap', { a: fmtT(a), b: fmtT(b) });
      else if (now <= b) sleepD = t('now_napOpen', { b: fmtT(b) });
      else sleepD = t('now_napPast');
    }
  }
  // diaper tile
  let diaV = t('now_none'), diaD = '';
  if (lastDiaper){
    diaV = lang === 'es' ? `<small>hace </small><span data-ago="${lastDiaper.s}">${esc(fmtD((now - lastDiaper.s) / 60000))}</span>` : `<span data-ago="${lastDiaper.s}">${esc(fmtD((now - lastDiaper.s) / 60000))}</span><small> ago</small>`;
    diaD = fmtT(lastDiaper.s) + ' · ' + t('d_' + (lastDiaper.sub || 'wet'));
  }
  return `
    <div class="tile feed"><div class="k">${esc(t('now_lastFeed'))}</div><div class="v">${feedV}</div><div class="d">${esc(feedD)}</div><div class="d hint">${esc(feedHint)}</div></div>
    <div class="tile sleep ${live}"><div class="k">${esc(sleepK)}</div><div class="v">${sleepV}</div><div class="d hint">${esc(sleepD)}</div></div>
    <div class="tile diaper"><div class="k">${esc(t('now_lastDiaper'))}</div><div class="v">${diaV}</div><div class="d">${esc(diaD)}</div></div>`;
}
function actionsHTML(){
  const now = Date.now();
  const running = G.runningEvents();
  const rb = running.find(e => e.t === 'feed');
  const rs = running.find(e => e.t === 'sleep');
  const rp = running.find(e => e.t === 'pump');
  const lastBreast = G.eventsBetween(now - 3 * 86400000, now).filter(e => e.t === 'feed' && (e.sub === 'L' || e.sub === 'R')).pop();
  const nextSide = lastBreast ? (lastBreast.sub === 'L' ? 'R' : 'L') : null;
  const b = (cls, act, v, ico, lb, sub, run) => `<button class="act ${cls} ${run ? 'running' : ''}" data-act="${act}" data-v="${v}"><span class="ico">${ico}</span><span class="lb">${lb}</span><span class="sub">${esc(sub || '')}</span></button>`;
  const breastBtn = side => {
    const run = rb && rb.sub === side;
    return b('feed', 'breast', side, side === 'L' ? I.breastL : I.breastR, run ? `<span data-elapsed="${rb.s}">${G.fmtClock(now - rb.s)}</span>` : esc(t('act_' + side)), run ? t('act_stop') : (nextSide === side ? t('next_side', { s: t('side_' + side) }) : t('breast')), run);
  };
  return breastBtn('L') + breastBtn('R') +
    b('feed', 'bottle', '', I.bottle, esc(t('act_bottle')), G.units.vol(0, G.prefs.vol).replace(/^0 /, '')) +
    b('sleep', 'sleep', '', I.sleep, rs ? `<span data-elapsed="${rs.s}">${G.fmtClock(now - rs.s)}</span>` : esc(t('act_sleep')), rs ? t('act_wake') : '', !!rs) +
    b('diaper', 'diaper', 'wet', I.wet, esc(t('act_wet')), t('e_diaper')) +
    b('diaper', 'diaper', 'dirty', I.dirty, esc(t('act_dirty')), t('e_diaper')) +
    b('feed', 'pump', '', I.pump, rp ? `<span data-elapsed="${rp.s}">${G.fmtClock(now - rp.s)}</span>` : esc(t('act_pump')), rp ? t('act_stop') : '', !!rp) +
    b('', 'more', '', I.more, esc(t('act_more')), t('c_vitd') + ', ' + t('c_tummy') + '…');
}
function totalsHTML(key){
  const s = G.summarize(key);
  const days = G.ageDaysAt(key);
  const feedBits = [];
  if (s.breastMin) feedBits.push(t('tot_breast') + ' ' + fmtD(s.breastMin) + (s.L || s.R ? ' (' + t('side_L')[0] + ' ' + Math.round(s.L) + ' · ' + t('side_R')[0] + ' ' + Math.round(s.R) + ')' : ''));
  if (s.bottleMl) feedBits.push(t('bottle').toLowerCase() + ' ' + G.units.vol(s.bottleMl, G.prefs.vol));
  if (s.solids) feedBits.push(t('solids').toLowerCase() + ' ×' + s.solids);
  if (s.pumpMl) feedBits.push(t('e_pump').toLowerCase() + ' ' + G.units.vol(s.pumpMl, G.prefs.vol));
  return `
    <div class="stat feed"><div class="k"><i></i>${esc(t('tot_feeds'))}</div><div class="v">${s.feeds}</div><div class="d">${esc(feedBits.join(' · ') || '—')}</div><div class="d hint">${esc(t('tot_typical', { x: C.feedsPerDayFor(days) }))}</div></div>
    <div class="stat sleep"><div class="k"><i></i>${esc(t('tot_sleep'))}</div><div class="v">${esc(fmtD(s.sleepMin))}</div><div class="d">${s.naps} ${esc(t('tot_naps'))}${s.longestSleep ? ' · max ' + esc(fmtD(s.longestSleep)) : ''}</div><div class="d hint">${esc(t('tot_typical', { x: C.sleepHoursFor(days) + ' h' }))}</div></div>
    <div class="stat diaper"><div class="k"><i></i>${esc(t('tot_diapers'))}</div><div class="v">${s.diapers}</div><div class="d">${s.wet} ${esc(t('tot_wet'))} · ${s.dirty} ${esc(t('tot_dirty'))}</div><div class="d hint">${esc(days >= 5 ? t('tot_wetTarget') : '')}</div></div>`;
}

/* ---------------- ribbon ---------------- */
function renderRibbon(container, key){
  if (!container) return;
  const W = Math.max(280, container.clientWidth || 600), H = 74, top = 8, trackH = 34, axisY = top + trackH + 16;
  const start = G.dayStartMs(key), end = start + 86400000, now = Date.now();
  const x = ms => G.clamp((ms - start) / 86400000, 0, 1) * W;
  const evs = G.eventsBetween(start, end);
  let g = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(t('ribbon_title'))}">`;
  g += `<rect class="track" x="0" y="${top}" width="${W}" height="${trackH}" rx="6"/>`;
  const hits = [];
  for (const e of evs){
    if (e.t === 'sleep'){
      const a = Math.max(e.s, start), b = Math.min(e.e == null ? now : e.e, end);
      if (b <= a) continue;
      const x1 = x(a), x2 = Math.max(x(b), x1 + 2);
      g += `<rect class="sl ${e.e == null ? 'run' : ''}" x="${x1.toFixed(1)}" y="${top + 2}" width="${(x2 - x1).toFixed(1)}" height="${trackH - 4}" rx="4"/>`;
      hits.push({ x1, x2, y1: top, y2: top + trackH, e });
    }
  }
  for (const e of evs){
    if (e.s < start || e.s >= end) continue;
    const cx = x(e.s);
    if (e.t === 'feed'){
      const dur = e.e != null && (e.sub === 'L' || e.sub === 'R') ? (e.e - e.s) : 0;
      const w = Math.max(3, x(e.s + dur) - cx);
      g += `<rect class="fd" x="${(cx - 1.5).toFixed(1)}" y="${top + trackH / 2 + 2}" width="${w.toFixed(1)}" height="${trackH / 2 - 5}" rx="2"/>`;
      hits.push({ x1: cx - 6, x2: cx + Math.max(6, w), y1: top, y2: top + trackH, e });
    } else if (e.t === 'diaper'){
      g += `<circle class="dp" cx="${cx.toFixed(1)}" cy="${top + 9}" r="4"/>`;
      hits.push({ x1: cx - 7, x2: cx + 7, y1: top, y2: top + 18, e });
    } else if (e.t === 'pump' || e.t === 'care'){
      g += `<rect class="cr" x="${(cx - 1.5).toFixed(1)}" y="${top + 4}" width="3" height="10" rx="1.5"/>`;
      hits.push({ x1: cx - 6, x2: cx + 6, y1: top, y2: top + 18, e });
    }
  }
  if (now >= start && now <= end) g += `<line class="now" x1="${x(now).toFixed(1)}" x2="${x(now).toFixed(1)}" y1="${top - 4}" y2="${top + trackH + 4}"/>`;
  g += '<g class="axis">';
  for (let h = 0; h <= 24; h += 6){
    const xx = h / 24 * W;
    const lab = lang === 'es' ? (h === 24 ? '24' : G.pad(h) + ':00') : (h === 0 || h === 24 ? '12am' : h === 12 ? '12pm' : h < 12 ? h + 'am' : (h - 12) + 'pm');
    g += `<line x1="${xx}" x2="${xx}" y1="${top + trackH + 2}" y2="${top + trackH + 6}"/><text x="${xx}" y="${axisY + 6}" text-anchor="${h === 0 ? 'start' : h === 24 ? 'end' : 'middle'}">${lab}</text>`;
  }
  g += '</g>';
  hits.forEach((h, i) => { g += `<rect class="hit" data-hit="${i}" x="${h.x1.toFixed(1)}" y="${h.y1}" width="${(h.x2 - h.x1).toFixed(1)}" height="${h.y2 - h.y1}"/>`; });
  g += '</svg>';
  container.innerHTML = g;
  container._hits = hits;
  const svg = container.querySelector('svg');
  const show = (h, clientX) => {
    let tip = container.querySelector('.tip');
    if (!tip){ tip = document.createElement('div'); tip.className = 'tip'; container.appendChild(tip); }
    const e = h.e;
    tip.innerHTML = `<b>${esc(evLabel(e))}</b> ${esc(fmtT(e.s))}${e.e != null ? '–' + esc(fmtT(e.e)) : ''}${evDetail(e) ? '<br>' + esc(evDetail(e)) : ''}${e.by ? '<br><span style="opacity:.7">' + esc(e.by) + '</span>' : ''}`;
    const r = container.getBoundingClientRect();
    tip.style.left = G.clamp(clientX - r.left, 60, r.width - 60) + 'px';
    tip.style.top = (h.y1) + 'px';
  };
  svg.addEventListener('pointermove', ev => {
    const el = ev.target.closest('[data-hit]');
    if (el) show(hits[+el.dataset.hit], ev.clientX); else { const tp = container.querySelector('.tip'); if (tp) tp.remove(); }
  });
  svg.addEventListener('pointerleave', () => { const tp = container.querySelector('.tip'); if (tp) tp.remove(); });
  svg.addEventListener('click', ev => { const el = ev.target.closest('[data-hit]'); if (el) openEdit(hits[+el.dataset.hit].e); });
}

/* ---------------- entries ---------------- */
function renderEntries(container, key){
  const evs = G.dayEvents(key).slice().reverse();
  if (!evs.length){ container.innerHTML = `<div class="empty">${esc(t('entries_empty'))}</div>`; return; }
  container.innerHTML = evs.map(e => `
    <div class="entry ${e.t} ${e.e == null && (e.t === 'sleep' || e.t === 'pump' || (e.t === 'feed' && (e.sub === 'L' || e.sub === 'R'))) ? 'running' : ''}" data-act="edit" data-id="${esc(e.id)}" data-day="${key}">
      <div class="lead"><span class="bar"></span><span class="t">${esc(fmtT(e.s))}</span></div>
      <div class="m"><b>${esc(evLabel(e))}</b> <span>${esc(evDetail(e))}</span>${e.n ? `<span class="n">${esc(e.n)}</span>` : ''}</div>
      <div class="who">${esc(e.by || '')}</div>
    </div>`).join('');
}

/* ---------------- LOG ---------------- */
function renderLog(){
  const p = $('#p-log');
  const key = ui.logDay, today = G.todayKey();
  const nDays = Object.keys(G.state.data.days).filter(k => G.dayEvents(k).length).length;
  const title = key === today ? t('today') : key === G.addDays(today, -1) ? t('yesterday') : G.fmtDate(key, lang);
  p.innerHTML = `
    <section class="card">
      <div class="daynav">
        <button class="btn sm" data-act="logday" data-v="-1" aria-label="${esc(t('back'))}">${I.chevL}</button>
        <div style="text-align:center"><h2>${esc(title)}</h2><div class="small muted">${esc(G.fmtDateLong(key, lang))} · ${esc(ageString(key))}</div></div>
        <button class="btn sm" data-act="logday" data-v="1" ${key >= today ? 'disabled' : ''}>${I.chevR}</button>
      </div>
      <div class="row" style="margin-top:10px;justify-content:space-between">
        <input type="date" id="logdate" value="${key}" max="${today}" min="${G.PROFILE.dobKey}" class="mono" style="border:1px solid var(--rule);border-radius:8px;padding:6px 8px;background:var(--card-2);font-size:13px">
        <div class="row">
          <button class="btn sm" data-act="share">${I.share}${esc(t('log_share'))}</button>
          <button class="btn sm" data-act="export">${esc(t('log_export'))}</button>
          <button class="btn sm" data-act="backup">${esc(t('log_backup'))}</button>
        </div>
      </div>
      <p class="small muted" style="margin-top:8px">${nDays} ${esc(t('log_days'))}</p>
    </section>
    <section class="totals">${totalsHTML(key)}</section>
    <section class="card">
      <div class="cardhead"><h2>${esc(t('ribbon_title'))}</h2><span class="sub">${esc(t('ribbon_sub'))}</span></div>
      <div class="ribbon" id="ribbon-log"></div>
      <div class="legend"><span class="sleep"><i></i>${esc(t('leg_sleep'))}</span><span class="feed"><i></i>${esc(t('leg_feed'))}</span><span class="diaper"><i></i>${esc(t('leg_diaper'))}</span><span class="care"><i></i>${esc(t('leg_care'))}</span></div>
    </section>
    <section class="card"><div class="cardhead"><h2>${esc(t('entries'))}</h2></div><div class="entries" id="entries-log"></div></section>`;
  renderRibbon($('#ribbon-log'), key);
  renderEntries($('#entries-log'), key);
  $('#logdate').addEventListener('change', ev => { if (ev.target.value){ ui.logDay = ev.target.value; renderLog(); } });
}
function summaryText(key){
  const s = G.summarize(key);
  const lines = [];
  lines.push((lang === 'es' ? 'Gonzalo · ' : 'Gonzalo · ') + G.fmtDateLong(key, lang) + ' · ' + ageString(key, true));
  const fb = [];
  if (s.breastMin) fb.push(t('tot_breast') + ' ' + fmtD(s.breastMin));
  if (s.bottleMl) fb.push(t('bottle').toLowerCase() + ' ' + G.units.vol(s.bottleMl, G.prefs.vol));
  if (s.solids) fb.push(t('solids').toLowerCase() + ' ×' + s.solids);
  lines.push(t('sum_feeds') + ': ' + s.feeds + (fb.length ? ' (' + fb.join(', ') + ')' : ''));
  lines.push(t('sum_sleep') + ': ' + fmtD(s.sleepMin) + ', ' + s.naps + ' ' + t('tot_naps'));
  lines.push(t('sum_diapers') + ': ' + s.wet + ' ' + t('tot_wet') + ', ' + s.dirty + ' ' + t('tot_dirty'));
  const feeds = G.dayEvents(key).filter(e => e.t === 'feed');
  if (feeds.length){ const lf = feeds[feeds.length - 1]; lines.push(t('sum_last') + ': ' + fmtT(lf.s) + ' ' + evLabel(lf).replace(t('breast') + ' · ', '') + (evDetail(lf) ? ' ' + evDetail(lf) : '')); }
  if (s.vitd) lines.push(t('sum_vitd') + ' ✓');
  const gl = G.growthList();
  if (gl.length){ const m = gl[gl.length - 1]; const bits = []; if (m.w != null) bits.push(G.units.wt(m.w, G.prefs.wt)); if (m.l != null) bits.push(G.units.len(m.l, G.prefs.len)); lines.push(t('sum_growth') + ' (' + G.fmtDateShort(m.d, lang) + '): ' + bits.join(', ')); }
  return lines.join('\n');
}
function openShare(){
  const key = ui.tab === 'log' ? ui.logDay : G.todayKey();
  const text = summaryText(key);
  openSheet(`<h2>${esc(t('sh_share'))}</h2><p class="small muted">${esc(t('share_sub'))}</p>
    <textarea id="sharetext" class="mono" style="width:100%;min-height:150px;border:1px solid var(--rule);border-radius:10px;padding:10px;background:var(--card-2);font-size:12.5px">${esc(text)}</textarea>
    <div class="actionsrow">
      ${navigator.share ? `<button class="btn" data-act="share-native">${esc(t('share_native'))}</button>` : ''}
      <a class="btn" href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank" rel="noopener">${esc(t('share_wa'))}</a>
      <button class="btn primary" data-act="share-copy">${esc(t('share_copy'))}</button>
    </div>`);
}

/* ---------------- GROWTH ---------------- */
const MEAS = { w: { ind: 'wfa', key: 'w', label: 'g_weight', fmt: v => G.units.wt(v, G.prefs.wt), unit: () => G.prefs.wt }, l: { ind: 'lfa', key: 'l', label: 'g_length', fmt: v => G.units.len(v, G.prefs.len), unit: () => G.prefs.len }, h: { ind: 'hcfa', key: 'h', label: 'g_head', fmt: v => G.units.len(v, G.prefs.len), unit: () => G.prefs.len } };
function renderGrowth(){
  const p = $('#p-growth');
  const list = G.growthList();
  const latest = {};
  for (const m of list) for (const k of ['w', 'l', 'h']) if (m[k] != null) latest[k] = m;
  const tiles = ['w', 'l', 'h'].map(k => {
    const m = latest[k];
    if (!m) return `<div class="stat"><div class="k">${esc(t(MEAS[k].label))}</div><div class="v muted">—</div><div class="d hint">${esc(t('g_add'))}</div></div>`;
    const pc = G.percentile(MEAS[k].ind, m[k], G.ageDaysAt(m.d));
    return `<div class="stat"><div class="k">${esc(t(MEAS[k].label))}</div><div class="v">${esc(MEAS[k].fmt(m[k]))}</div><div class="d">${esc(t('g_pct', { p: G.fmtPct(pc.p, lang) }))}</div><div class="d hint">${esc(G.fmtDateShort(m.d, lang))} · ${esc(t('g_ageAt', { age: ageString(m.d) }))}</div></div>`;
  }).join('');
  const bw = list.find(m => m.w != null && m.d === G.PROFILE.dobKey);
  let gain = '';
  if (latest.w && bw && latest.w !== bw){ const diff = latest.w.w - bw.w; gain = `<p class="small muted" style="margin-top:8px">${esc(t('g_bw'))}: ${esc(G.units.wt(bw.w, G.prefs.wt))} · ${diff >= 0 ? '+' : ''}${esc(G.units.wt(Math.abs(diff), G.prefs.wt))} ${esc(t('g_since'))}</p>`; }
  const seg = (name, opts, cur) => `<div class="seg">${opts.map(o => `<button data-act="${name}" data-v="${o[0]}" aria-pressed="${String(o[0]) === String(cur)}">${esc(o[1])}</button>`).join('')}</div>`;
  p.innerHTML = `
    <section class="pctbig">${tiles}</section>
    <section class="card">
      <div class="cardhead"><h2>${esc(t(MEAS[ui.gMeasure].label))}</h2><span class="sub">${esc(t('g_who'))}</span></div>
      <div class="row" style="justify-content:space-between;margin-bottom:10px">
        ${seg('gm', [['w', t('g_weight')], ['l', t('g_length')], ['h', t('g_head')]], ui.gMeasure)}
        ${seg('gr', [[3, t('g_range3')], [6, t('g_range6')], [12, t('g_range12')], [24, t('g_range24')]], ui.gRange)}
        ${seg('gt', [['0', t('g_chart')], ['1', t('g_table')]], ui.gTable ? '1' : '0')}
      </div>
      <div id="gchart" class="chart" ${ui.gTable ? 'hidden' : ''}></div>
      <div id="gtable" class="tblwrap" ${ui.gTable ? '' : 'hidden'}></div>
      ${gain}
      ${list.length ? `<p class="small muted" style="margin-top:6px">${esc(t('g_hover'))}</p>` : `<div class="empty" style="margin-top:8px">${esc(t('g_empty'))}</div>`}
    </section>
    <section class="card">
      <div class="cardhead"><h2>${esc(t('g_add'))}</h2><span class="sub">${esc(t('g_hint'))}</span></div>
      <form id="gform" class="gform">
        <div class="field"><label>${esc(t('g_date'))}</label><input type="date" name="d" value="${G.todayKey()}" min="${G.PROFILE.dobKey}" max="${G.todayKey()}" required></div>
        <div class="field"><label>${esc(t('g_weight'))} (${G.prefs.wt})</label><input type="number" step="any" inputmode="decimal" name="w" placeholder="${G.prefs.wt === 'lb' ? '8.9' : '4.05'}"></div>
        <div class="field"><label>${esc(t('g_length'))} (${G.prefs.len})</label><input type="number" step="any" inputmode="decimal" name="l" placeholder="${G.prefs.len === 'in' ? '21' : '53.5'}"></div>
        <div class="field"><label>${esc(t('g_head'))} (${G.prefs.len})</label><input type="number" step="any" inputmode="decimal" name="h" placeholder="${G.prefs.len === 'in' ? '14.4' : '36.5'}"></div>
        <button class="btn primary" type="submit" style="grid-column:1/-1">${esc(t('add'))}</button>
      </form>
    </section>`;
  renderGrowthChart($('#gchart'), ui.gMeasure, ui.gRange);
  renderGrowthTable($('#gtable'));
  $('#gform').addEventListener('submit', async ev => {
    ev.preventDefault();
    const f = ev.target;
    const d = f.d.value; if (!d) return;
    const w = f.w.value ? G.units.toKg(+f.w.value, G.prefs.wt) : null;
    const l = f.l.value ? G.units.toCm(+f.l.value, G.prefs.len) : null;
    const h = f.h.value ? G.units.toCm(+f.h.value, G.prefs.len) : null;
    if (w == null && l == null && h == null) return;
    await G.putGrowth({ id: G.uid(), d, w: w != null ? Math.round(w * 1000) / 1000 : null, l: l != null ? Math.round(l * 10) / 10 : null, h: h != null ? Math.round(h * 10) / 10 : null, by: G.prefs.who || '', c: Date.now() });
    toast(t('saved'));
  });
}
function renderGrowthTable(container){
  const list = G.growthList();
  if (!list.length){ container.innerHTML = ''; return; }
  container.innerHTML = `<table class="gtable"><thead><tr><th>${esc(t('g_date'))}</th><th>${esc(t('chart_age'))}</th><th>${esc(t('g_weight'))}</th><th>%</th><th>${esc(t('g_length'))}</th><th>%</th><th>${esc(t('g_head'))}</th><th>%</th><th></th></tr></thead><tbody>
    ${list.map(m => { const d = G.ageDaysAt(m.d); const pc = k => m[k] != null ? G.fmtPct(G.percentile(MEAS[k].ind, m[k], d).p, lang) : ''; return `<tr>
      <td class="num">${esc(G.fmtDateShort(m.d, lang))}</td><td class="num">${esc(ageString(m.d))}</td>
      <td class="num">${m.w != null ? esc(MEAS.w.fmt(m.w)) : ''}</td><td class="num">${pc('w')}</td>
      <td class="num">${m.l != null ? esc(MEAS.l.fmt(m.l)) : ''}</td><td class="num">${pc('l')}</td>
      <td class="num">${m.h != null ? esc(MEAS.h.fmt(m.h)) : ''}</td><td class="num">${pc('h')}</td>
      <td><button class="btn sm ghost" data-act="gedit" data-id="${esc(m.id)}">${esc(t('edit'))}</button></td></tr>`; }).join('')}
  </tbody></table>`;
}
function renderGrowthChart(container, mk, rangeMonths){
  const meas = MEAS[mk];
  const W = Math.max(300, container.clientWidth || 640), H = 300;
  const padL = 44, padR = 44, padT = 14, padB = 34;
  const maxDay = Math.round(rangeMonths * 30.4375);
  const list = G.growthList().filter(m => m[mk] != null);
  const pts = list.map(m => ({ day: G.ageDaysAt(m.d), v: m[mk], m }));
  const conv = v => mk === 'w' ? (G.prefs.wt === 'lb' ? v / 0.45359237 : v) : (G.prefs.len === 'in' ? v / 2.54 : v);
  const unit = mk === 'w' ? G.prefs.wt : G.prefs.len;
  const curves = {};
  const stepD = maxDay <= 92 ? 1 : maxDay <= 183 ? 2 : 4;
  let yMin = Infinity, yMax = -Infinity;
  for (const pkey of Object.keys(G.zOfP)){
    const z = G.zOfP[pkey]; const arr = [];
    for (let d = 0; d <= maxDay; d += stepD){ const v = conv(G.xOfZ(z, G.lmsAt(meas.ind, d))); arr.push([d, v]); }
    curves[pkey] = arr; yMin = Math.min(yMin, arr[0][1]); yMax = Math.max(yMax, arr[arr.length - 1][1]);
  }
  for (const p of pts) if (p.day <= maxDay){ yMin = Math.min(yMin, conv(p.v)); yMax = Math.max(yMax, conv(p.v)); }
  const span = yMax - yMin; yMin -= span * 0.08; yMax += span * 0.08;
  const X = d => padL + d / maxDay * (W - padL - padR);
  const Y = v => padT + (1 - (v - yMin) / (yMax - yMin)) * (H - padT - padB);
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(t(meas.label))}">`;
  // y grid
  const niceStep = (() => { const raw = (yMax - yMin) / 5; const p = Math.pow(10, Math.floor(Math.log10(raw))); const n = raw / p; return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * p; })();
  s += '<g class="grid">';
  for (let v = Math.ceil(yMin / niceStep) * niceStep; v <= yMax; v += niceStep) s += `<line x1="${padL}" x2="${W - padR}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/>`;
  s += '</g><g class="axis">';
  for (let v = Math.ceil(yMin / niceStep) * niceStep; v <= yMax; v += niceStep) s += `<text x="${padL - 6}" y="${(Y(v) + 3.5).toFixed(1)}" text-anchor="end">${+v.toFixed(2)}</text>`;
  // x axis
  const xt = [];
  if (maxDay <= 92) for (let w = 0; w <= 13; w += (maxDay <= 92 ? 1 : 2)) xt.push([w * 7, w + (lang === 'es' ? ' s' : 'w')]);
  else { const step = maxDay <= 183 ? 1 : maxDay <= 366 ? 2 : 3; for (let m = 0; m <= rangeMonths; m += step) xt.push([Math.round(m * 30.4375), m + (lang === 'es' ? ' m' : 'm')]); }
  for (const [d, lab] of xt){ if (d > maxDay) continue; s += `<line x1="${X(d).toFixed(1)}" x2="${X(d).toFixed(1)}" y1="${H - padB}" y2="${H - padB + 4}"/><text x="${X(d).toFixed(1)}" y="${H - padB + 16}" text-anchor="middle">${lab}</text>`; }
  s += `<line x1="${padL}" x2="${W - padR}" y1="${H - padB}" y2="${H - padB}"/>`;
  s += `<text x="${padL - 6}" y="${padT - 3}" text-anchor="end">${unit}</text>`;
  s += '</g>';
  // bands 3–97 and 15–85
  const path = arr => arr.map((p, i) => (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join(' ');
  const band = (a, b) => path(curves[a]) + ' ' + curves[b].slice().reverse().map(p => 'L' + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join(' ') + ' Z';
  s += `<path class="band" d="${band(3, 97)}"/><path class="band" d="${band(15, 85)}"/>`;
  for (const pkey of ['3', '15', '50', '85', '97']){
    s += `<path class="pct ${pkey === '50' ? 'p50' : ''}" d="${path(curves[pkey])}"/>`;
    const last = curves[pkey][curves[pkey].length - 1];
    s += `<text class="plab" x="${(W - padR + 5)}" y="${(Y(last[1]) + 3.5).toFixed(1)}">${pkey}${lang === 'es' ? '' : (pkey === '3' ? 'rd' : 'th')}</text>`;
  }
  // his line + points
  const vis = pts.filter(p => p.day <= maxDay);
  if (vis.length > 1) s += `<path class="me" d="${vis.map((p, i) => (i ? 'L' : 'M') + X(p.day).toFixed(1) + ' ' + Y(conv(p.v)).toFixed(1)).join(' ')}"/>`;
  vis.forEach((p, i) => { s += `<circle class="pt" data-pt="${i}" cx="${X(p.day).toFixed(1)}" cy="${Y(conv(p.v)).toFixed(1)}" r="5"/>`; });
  vis.forEach((p, i) => { s += `<circle class="hit" data-pt="${i}" cx="${X(p.day).toFixed(1)}" cy="${Y(conv(p.v)).toFixed(1)}" r="14" fill="transparent" style="cursor:pointer"/>`; });
  // today marker
  const td = G.ageDays(); if (td <= maxDay) s += `<line class="xh" x1="${X(td).toFixed(1)}" x2="${X(td).toFixed(1)}" y1="${padT}" y2="${H - padB}" stroke-dasharray="0" opacity=".5"/>`;
  s += '</svg>';
  container.innerHTML = s;
  const svg = container.querySelector('svg');
  const show = (p, cx, cy) => {
    let tip = container.querySelector('.tip'); if (!tip){ tip = document.createElement('div'); tip.className = 'tip'; container.appendChild(tip); }
    const pc = G.percentile(meas.ind, p.v, p.day);
    tip.innerHTML = `<b>${esc(meas.fmt(p.v))}</b> · ${esc(t('g_pct', { p: G.fmtPct(pc.p, lang) }))}<br>${esc(G.fmtDateShort(p.m.d, lang))} · ${esc(ageString(p.m.d))} · z ${pc.z.toFixed(2)}`;
    tip.style.left = cx + 'px'; tip.style.top = cy + 'px';
  };
  svg.addEventListener('pointermove', ev => {
    const el = ev.target.closest('[data-pt]');
    if (el){ const r = container.getBoundingClientRect(); const p = vis[+el.dataset.pt]; show(p, X(p.day) / W * r.width, Y(conv(p.v)) / H * r.height); }
    else { const tp = container.querySelector('.tip'); if (tp) tp.remove(); }
  });
  svg.addEventListener('pointerleave', () => { const tp = container.querySelector('.tip'); if (tp) tp.remove(); });
  svg.addEventListener('click', ev => { const el = ev.target.closest('[data-pt]'); if (el) openGrowthEdit(vis[+el.dataset.pt].m); });
}
function openGrowthEdit(m){
  openSheet(`<h2>${esc(t('sh_growth'))}</h2>
    <div class="grid2">
      <div class="field"><label>${esc(t('g_date'))}</label><input type="date" name="d" value="${m.d}" min="${G.PROFILE.dobKey}" max="${G.todayKey()}"></div>
      <div class="field"><label>${esc(t('g_weight'))} (${G.prefs.wt})</label><input type="number" step="any" inputmode="decimal" name="w" value="${m.w != null ? (G.prefs.wt === 'lb' ? (m.w / 0.45359237).toFixed(2) : m.w) : ''}"></div>
      <div class="field"><label>${esc(t('g_length'))} (${G.prefs.len})</label><input type="number" step="any" inputmode="decimal" name="l" value="${m.l != null ? (G.prefs.len === 'in' ? (m.l / 2.54).toFixed(1) : m.l) : ''}"></div>
      <div class="field"><label>${esc(t('g_head'))} (${G.prefs.len})</label><input type="number" step="any" inputmode="decimal" name="h" value="${m.h != null ? (G.prefs.len === 'in' ? (m.h / 2.54).toFixed(1) : m.h) : ''}"></div>
    </div>
    <div class="actionsrow"><button class="btn danger left" data-act="gdel" data-id="${esc(m.id)}">${esc(t('delete'))}</button><button class="btn" data-act="sheet-close">${esc(t('cancel'))}</button><button class="btn primary" data-act="gsave" data-id="${esc(m.id)}">${esc(t('save'))}</button></div>`);
}

/* ---------------- GUIDE ---------------- */
function renderGuide(){
  const p = $('#p-guide');
  const todayDays = G.ageDays();
  const cur = C.bandFor(todayDays);
  const band = ui.guideBand != null ? C.GUIDE[ui.guideBand] : cur;
  const bandDays = band === cur ? todayDays : band.from;
  const bandKey = G.keyAtAgeDays(bandDays);
  const months = G.ageMonths(bandKey).months;
  const cp = C.msCheckpointFor(months);
  const ms = C.MILESTONES[cp];
  const wake = C.wakeFor(bandDays);
  const checked = G.state.data.health.ms || {};
  const cat = (k, arr) => `<div class="cat">${esc(t('gu_msCat_' + k))}</div>` + arr.map((m, i) => { const id = cp + '-' + k + '-' + i; const on = !!(checked[id] && checked[id].on); return `<label class="${on ? 'on' : ''}"><input type="checkbox" data-act="ms" data-id="${id}" ${on ? 'checked' : ''}><span>${esc(L(m))}</span></label>`; }).join('');
  const sec = (cls, ico, title, body) => `<div class="gsec ${cls}"><div class="ico">${ico}</div><div><h3>${esc(title)}</h3>${body}</div></div>`;
  const ul = arr => `<ul>${arr.map(x => `<li>${esc(pair(x))}</li>`).join('')}</ul>`;
  // upcoming
  const upcoming = [];
  const visitsDone = G.state.data.health.visits || {};
  const nextVisit = C.VISITS.find(v => !visitsDone[v.id]);
  if (nextVisit) upcoming.push(`<dt>${esc(t('gu_nextVisit'))}</dt><dd>${esc(L(nextVisit.label))} · ${esc(G.fmtDateShort(visitKeyFor(nextVisit), lang))}</dd>`);
  const vaxDone = G.state.data.health.vax || {};
  const nextVax = []; for (const g of C.VAX) for (const v of g.items) if (!vaxDone[v.id] && v.due >= months - 0.01) nextVax.push(v);
  if (nextVax.length){ const first = nextVax[0]; const same = nextVax.filter(v => Math.abs(v.due - first.due) < 0.01); upcoming.push(`<dt>${esc(t('gu_nextShots'))}</dt><dd>${esc(G.fmtDateShort(dueKeyFor(first.due), lang))} · ${esc(same.map(v => L(v.name).replace(/, (dose|dosis) \d/, '')).join(', '))}</dd>`); }
  p.innerHTML = `
    <section class="card">
      <div class="guidehead"><div><div class="eyebrow">${esc(band === cur ? t('gu_thisWeek') : t('gu_showing'))}</div><h2>${esc(L(band.title))}</h2></div><div class="small muted">${esc(band === cur ? t('gu_at', { age: ageString(G.todayKey(), true) }) : '')}</div></div>
      <div class="agepick" style="margin-top:12px">${C.GUIDE.map((g, i) => `<button data-act="gband" data-v="${i}" aria-pressed="${g === band}">${esc(L(g.title).split(':')[0])}${g === cur ? ' ●' : ''}</button>`).join('')}</div>
    </section>
    <section class="card stack" style="gap:16px">
      ${sec('sleep', I.sleep, t('gu_sleep'), `<p>${esc(L(band.sleep))}</p><dl class="kv" style="margin-top:8px"><dt>${esc(t('gu_wake'))}</dt><dd>${wake.min}–${wake.max} ${esc(t('min'))}</dd><dt>${esc(t('gu_total'))}</dt><dd>${esc(C.sleepHoursFor(bandDays))} h</dd></dl><p class="src">${esc(t('gu_ww_src'))}</p>`)}
      ${sec('feed', I.bottle, t('gu_feed'), `<p>${esc(L(band.feed))}</p>`)}
      ${sec('diaper', I.wet, t('gu_diapers'), `<p>${esc(L(band.diapers))}</p>`)}
      ${sec('dev', I.dev, t('gu_dev'), ul(band.dev))}
      ${sec('warn', I.warn, t('gu_watch'), ul(band.watch))}
      ${sec('', I.tip, t('gu_tips'), ul(band.tips))}
      ${upcoming.length ? sec('', I.next, t('gu_next'), `<dl class="kv">${upcoming.join('')}</dl>`) : ''}
      <p class="src">${esc(t('gu_norms'))}</p>
    </section>
    <section class="card">
      <div class="cardhead"><h2>${esc(t('gu_ms', { age: cp + ' ' + (lang === 'es' ? 'meses' : 'months') }))}</h2><span class="sub">${esc(G.fmtDateShort(G.keyAtAgeMonths(cp), lang))}</span></div>
      <p class="small muted" style="margin-bottom:8px">${esc(t('gu_msSub'))}</p>
      <div class="milest">${cat('se', ms.se)}${cat('lc', ms.lc)}${cat('cg', ms.cg)}${cat('mv', ms.mv)}</div>
      <p class="src"><a href="https://www.cdc.gov/act-early/milestones/index.html" target="_blank" rel="noopener">CDC Learn the Signs. Act Early.</a></p>
    </section>`;
}

/* ---------------- HEALTH ---------------- */
function renderHealth(){
  const p = $('#p-health');
  const today = G.todayKey(), months = G.ageMonths(today).months, days = G.ageDays();
  const h = G.state.data.health;
  // temperature alert
  const now = Date.now();
  const temps = G.eventsBetween(now - 86400000, now).filter(e => e.t === 'care' && e.sub === 'temp' && e.a != null);
  const hot = temps.filter(e => G.units.toF(e.a, e.u || 'F') >= 100.4).pop();
  const alert = hot && days < 90 ? `<div class="note bad"><b>${esc(t('h_temp'))}</b>${esc(t('h_tempAlert', { t: G.units.temp(G.prefs.temp === 'C' ? (hot.u === 'C' ? hot.a : (hot.a - 32) * 5 / 9) : G.units.toF(hot.a, hot.u || 'F'), G.prefs.temp), ago: agoStr(hot.s) }))}</div>` : '';
  const ped = h.ped || {};
  const vaxRow = v => {
    const done = (h.vax || {})[v.id];
    const dueKeyExact = dueKeyFor(v.due);
    const endKey = dueKeyFor(v.win[1]);
    const d0 = G.daysBetween(today, dueKeyExact);
    const cls = done ? 'done' : (today > endKey ? 'over' : (d0 <= 14 && d0 >= -30 ? 'due' : ''));
    const when = done ? t('h_givenOn', { date: G.fmtDateShort(done.d, lang) }) : (v.win[0] === v.win[1] || v.win[1] - v.win[0] < 0.6 ? t('h_due', { date: G.fmtDateShort(v.due === 0 ? G.PROFILE.dobKey : dueKeyExact, lang) }) : t('h_window', { a: G.fmtDateShort(dueKeyExact, lang), b: G.fmtDateShort(endKey, lang) }));
    return `<div class="vaxrow ${cls}">
      <input type="checkbox" class="check" data-act="vax" data-id="${v.id}" ${done ? 'checked' : ''} aria-label="${esc(L(v.name))}">
      <div class="what"><b>${esc(L(v.name))}</b><span>${esc(when)}${v.tier === 'scdm' ? ' · <span class="pill warn" style="font-size:10px;padding:1px 6px">' + esc(t('h_scdm')) + '</span>' : ''}${v.note ? '<br>' + esc(L(v.note)) : ''}${done && done.where ? '<br>' + esc(done.where) : ''}</span></div>
      <div class="when">${cls === 'over' ? '<span class="pill bad">' + esc(t('h_overdue')) + '</span>' : cls === 'due' ? '<span class="pill warn">' + esc(t('h_soon')) + '</span>' : ''}</div>
    </div>`;
  };
  const visitRow = v => {
    const done = (h.visits || {})[v.id];
    const key = visitKeyFor(v);
    return `<div class="vaxrow ${done ? 'done' : (key <= today ? 'due' : '')}">
      <input type="checkbox" class="check" data-act="visit" data-id="${v.id}" ${done ? 'checked' : ''} aria-label="${esc(L(v.label))}">
      <div class="what"><b>${esc(L(v.label))}</b><span>${esc(done ? t('h_visitDone', { date: G.fmtDateShort(done.d, lang) }) : G.fmtDateShort(key, lang))} · ${esc(L(v.what))}${done && done.n ? '<br>' + esc(done.n) : ''}</span></div>
      <div class="when"></div></div>`;
  };
  p.innerHTML = `
    ${alert}
    <section class="card">
      <div class="cardhead"><h2>${esc(t('h_ped'))}</h2><button class="btn sm" data-act="ped">${esc(t('edit'))}</button></div>
      ${ped.name || ped.phone ? `<div class="spread"><div><b>${esc(ped.name || '')}</b><div class="small muted">${esc(ped.notes || '')}</div></div>${ped.phone ? `<a class="btn" href="tel:${esc(ped.phone.replace(/[^+\d]/g, ''))}">${I.phone}${esc(ped.phone)}</a>` : ''}</div>` : `<p class="small muted">${esc(t('h_pedEmpty'))}</p>`}
      <div class="note" style="margin-top:12px"><b>${esc(t('h_temp'))}</b>${esc(t('h_tempSub'))} <button class="btn sm" data-act="care" data-v="temp" style="margin-left:6px">${esc(t('h_tempLog'))}</button></div>
    </section>
    <section class="card">
      <div class="cardhead"><h2>${esc(t('h_vax'))}</h2></div>
      <p class="small muted" style="margin-bottom:12px">${esc(t('h_vaxSub'))}</p>
      <div class="stack" style="gap:16px">
        ${C.VAX.map(g => `<div class="vaxgroup"><h3>${esc(L(g.label))} <span>${esc(g.key === 'birth' ? G.fmtDateShort(G.PROFILE.dobKey, lang) : g.key === 'rsv' ? '' : G.fmtDateShort(dueKeyFor(g.items[0].due), lang))}</span></h3>${g.items.map(vaxRow).join('')}</div>`).join('')}
      </div>
      <div class="note" style="margin-top:14px"><b>${esc(t('h_shots'))}</b>${esc(t('h_shotsText'))}</div>
      <p class="src">${esc(t('h_disclaimer'))}</p>
    </section>
    <section class="card">
      <div class="cardhead"><h2>${esc(t('h_visits'))}</h2><span class="sub">${esc(t('h_visitsSub'))}</span></div>
      <div class="vax">${C.VISITS.map(visitRow).join('')}</div>
    </section>`;
}

/* ---------------- ASK ---------------- */
function askHTML(){
  return `<section class="card ask">
    <div class="cardhead"><h2>${esc(t('ask_title'))}</h2></div>
    <p class="small muted" style="margin-bottom:8px">${esc(t('ask_sub'))}</p>
    <div class="presets" style="margin-bottom:8px">${['ask_p1', 'ask_p2', 'ask_p3'].map(k => `<button data-act="askpreset" data-v="${k}">${esc(t(k))}</button>`).join('')}</div>
    <div class="field"><textarea id="askq" placeholder="${esc(t('ask_ph'))}"></textarea></div>
    <div class="actionsrow"><button class="btn primary" data-act="ask">${esc(t('ask_send'))}</button></div>
    <div class="out" id="askout"></div>
  </section>`;
}
async function ask(q){
  if (!G.state.sample || ui.askBusy || !q) return;
  const out = $('#askout'); if (!out) return;
  ui.askBusy = true; out.textContent = t('ask_thinking');
  const now = Date.now();
  const evs = G.eventsBetween(now - 48 * 3600000, now);
  const log = evs.map(e => `${G.localInputValue(e.s).replace('T', ' ')}${e.e != null ? '–' + G.localInputValue(e.e).slice(11) : ''} ${evLabel(e)}${evDetail(e) ? ' ' + evDetail(e) : ''}${e.n ? ' note: ' + e.n : ''}`).join('\n');
  const days = G.ageDays(); const band = C.bandFor(days); const wake = C.wakeFor(days);
  const s1 = G.summarize(G.todayKey()), s2 = G.summarize(G.addDays(G.todayKey(), -1));
  const gl = G.growthList(); const gtxt = gl.length ? gl.slice(-3).map(m => `${m.d}: ${m.w != null ? m.w + ' kg' : ''} ${m.l != null ? m.l + ' cm' : ''} ${m.h != null ? 'head ' + m.h + ' cm' : ''}`).join('; ') : 'none logged';
  const prompt = `You are a warm, concise assistant helping the parents of a baby boy. Answer in ${lang === 'es' ? 'Spanish' : 'English'}, in under 180 words, plain text, no markdown headers. You are not a doctor: give general, evidence-based context (AAP, CDC, WHO) and say clearly when something should go to the pediatrician. Never diagnose.
Baby: Gonzalo, born 2026-08-17 in Miami. Age now: ${days} days (${ageString(G.todayKey(), true)}). Current local time (Miami): ${G.localInputValue(now).replace('T', ' ')}.
Typical ranges for his age (context, not targets): sleep ${C.sleepHoursFor(days)} h/day, wake windows ${wake.min}-${wake.max} min, feeds ${C.feedsPerDayFor(days)} per day, feed interval ${C.feedIntervalFor(days).en}. Stage note: ${band.sleep.en} ${band.feed.en}
Today so far: ${s1.feeds} feeds (breast ${Math.round(s1.breastMin)} min, bottle ${Math.round(s1.bottleMl)} ml), sleep ${Math.round(s1.sleepMin)} min in ${s1.naps} sleeps, diapers ${s1.wet} wet / ${s1.dirty} dirty. Yesterday: ${s2.feeds} feeds, sleep ${Math.round(s2.sleepMin)} min, diapers ${s2.wet} wet / ${s2.dirty} dirty.
Growth log: ${gtxt}.
Log of the last 48 hours (Miami time):
${log || '(no entries yet)'}

Question: ${q}`;
  try {
    const res = await G.state.sample(prompt, { onText: u => { out.textContent = u.text; }, modelTier: 'default', cache: false });
    out.textContent = res.text;
  } catch (e) {
    out.textContent = (e && e.text) ? e.text : t('ask_err');
    console.warn(e);
  }
  ui.askBusy = false;
}

/* ---------------- SHEETS ---------------- */
function openSheet(html){
  closeSheet();
  const root = $('#sheetroot');
  root.innerHTML = `<div class="scrim" data-act="scrim"><div class="sheet" role="dialog" aria-modal="true"><div class="handle"></div>${html}</div></div>`;
  ui.sheet = root.firstElementChild;
  const first = ui.sheet.querySelector('input:not([type=checkbox]):not([type=date]):not([type=datetime-local]),textarea');
  if (first && window.innerWidth > 900) first.focus();
}
function closeSheet(){ $('#sheetroot').innerHTML = ''; ui.sheet = null; }
const timeField = (name, label, ms, req) => `<div class="field"><label>${esc(label)}</label><input type="datetime-local" name="${name}" value="${ms != null ? G.localInputValue(ms) : ''}" ${req ? 'required' : ''} max="${G.localInputValue(Date.now() + 60000)}"></div>`;
const noteField = v => `<div class="field"><label>${esc(t('f_note'))}</label><input type="text" name="n" value="${esc(v || '')}" maxlength="200"></div>`;
const amountField = (ml, unit) => { const v = ml != null ? G.units.volNum(ml, unit) : ''; const step = unit === 'oz' ? 0.5 : 10; return `<div class="field"><label>${esc(t('f_amount'))} (${unit})</label>
  <div class="stepper"><button type="button" data-act="step" data-v="-${step}">−</button><input type="number" step="any" inputmode="decimal" name="a" value="${v}"><button type="button" data-act="step" data-v="${step}">+</button></div>
  <div class="presets">${(unit === 'oz' ? [1, 2, 3, 4, 5, 6] : [30, 60, 90, 120, 150, 180]).map(x => `<button type="button" data-act="preset" data-v="${x}">${x} ${unit}</button>`).join('')}</div></div>`; };
function sheetFooter(delId){ return `<div class="actionsrow">${delId ? `<button class="btn danger left" data-act="ev-del" data-id="${esc(delId)}">${esc(t('delete'))}</button>` : ''}<button class="btn" data-act="sheet-close">${esc(t('cancel'))}</button><button class="btn primary" data-act="ev-save">${esc(t('save'))}</button></div>`; }
function openBottle(e){
  openSheet(`<h2>${esc(t('sh_bottle'))}</h2><form data-kind="bottle" data-id="${e ? esc(e.id) : ''}">${amountField(e ? e.a : (G.prefs.vol === 'oz' ? 3 * 29.5735 : 90), G.prefs.vol)}${timeField('s', t('f_time'), e ? e.s : Date.now(), true)}${noteField(e && e.n)}</form>${sheetFooter(e && e.id)}`);
}
function openPump(e){
  const running = e && e.e == null && e.a == null;
  openSheet(`<h2>${esc(t('sh_pump'))}</h2><form data-kind="pump" data-id="${e ? esc(e.id) : ''}">
    <div class="field"><label>${esc(t('f_side'))}</label><div class="seg full">${['L', 'R', 'both'].map(s => `<button type="button" data-act="segpick" data-name="sub" data-v="${s}" aria-pressed="${(e ? e.sub : 'both') === s}">${esc(t('side_' + s))}</button>`).join('')}</div><input type="hidden" name="sub" value="${e ? e.sub || 'both' : 'both'}"></div>
    ${amountField(e ? e.a : null, G.prefs.vol)}${timeField('s', t('f_start'), e ? e.s : Date.now(), true)}${timeField('e', t('f_end'), e && e.e != null ? e.e : (e ? null : Date.now()), false)}${noteField(e && e.n)}</form>${sheetFooter(e && e.id)}`);
}
function openDiaper(e){
  openSheet(`<h2>${esc(t('sh_diaper'))}</h2><form data-kind="diaper" data-id="${e ? esc(e.id) : ''}">
    <div class="field"><label>${esc(t('f_type'))}</label><div class="seg full">${['wet', 'dirty', 'both', 'dry'].map(s => `<button type="button" data-act="segpick" data-name="sub" data-v="${s}" aria-pressed="${(e ? e.sub : 'wet') === s}">${esc(t('d_' + s))}</button>`).join('')}</div><input type="hidden" name="sub" value="${e ? e.sub || 'wet' : 'wet'}"></div>
    ${timeField('s', t('f_time'), e ? e.s : Date.now(), true)}${noteField(e && e.n)}</form>${sheetFooter(e && e.id)}`);
}
function openSleepEdit(e){
  openSheet(`<h2>${esc(t('sh_sleep'))}</h2><form data-kind="sleep" data-id="${esc(e.id)}">${timeField('s', t('f_start'), e.s, true)}${timeField('e', t('f_end') + (e.e == null ? ' (' + t('f_stillRunning') + ')' : ''), e.e, false)}${noteField(e.n)}</form>${sheetFooter(e.id)}`);
}
function openBreastEdit(e){
  openSheet(`<h2>${esc(t('sh_breast'))}</h2><form data-kind="breast" data-id="${esc(e.id)}">
    <div class="field"><label>${esc(t('f_side'))}</label><div class="seg full">${['L', 'R'].map(s => `<button type="button" data-act="segpick" data-name="sub" data-v="${s}" aria-pressed="${e.sub === s}">${esc(t('side_' + s))}</button>`).join('')}</div><input type="hidden" name="sub" value="${e.sub}"></div>
    ${timeField('s', t('f_start'), e.s, true)}${timeField('e', t('f_end') + (e.e == null ? ' (' + t('f_stillRunning') + ')' : ''), e.e, false)}${noteField(e.n)}</form>${sheetFooter(e.id)}`);
}
function openCare(sub, e){
  const kinds = ['vitd', 'tummy', 'bath', 'temp', 'meds', 'note', 'solids'];
  const cur = sub || (e && (e.t === 'feed' ? 'solids' : e.sub)) || 'vitd';
  const extra = k => k === 'tummy' ? `<div class="field"><label>${esc(t('f_minutes'))}</label><input type="number" inputmode="numeric" name="a" value="${e && e.a != null ? e.a : 5}" min="0" max="180"></div>`
    : k === 'temp' ? `<div class="field"><label>${esc(t('c_temp'))} (°${G.prefs.temp})</label><input type="number" step="0.1" inputmode="decimal" name="a" value="${e && e.a != null ? (G.prefs.temp === (e.u || 'F') ? e.a : (G.prefs.temp === 'C' ? ((e.a - 32) * 5 / 9).toFixed(1) : (e.a * 9 / 5 + 32).toFixed(1))) : (G.prefs.temp === 'C' ? '36.8' : '98.2')}"></div>` : '';
  openSheet(`<h2>${esc(t('sh_care'))}</h2><form data-kind="care" data-id="${e ? esc(e.id) : ''}">
    <div class="field"><label>${esc(t('f_type'))}</label><div class="presets" id="carekinds">${kinds.map(k => `<button type="button" data-act="carekind" data-v="${k}" aria-pressed="${k === cur}" style="${k === cur ? 'background:var(--accent);color:var(--accent-ink);border-color:var(--accent)' : ''}">${esc(k === 'solids' ? t('solids') : t('c_' + k))}</button>`).join('')}</div><input type="hidden" name="sub" value="${cur}"></div>
    <div id="careextra">${extra(cur)}</div>
    ${timeField('s', t('f_time'), e ? e.s : Date.now(), true)}${noteField(e && e.n)}</form>${sheetFooter(e && e.id)}`);
  ui.sheet._extra = extra;
}
function openEdit(e){
  if (e.t === 'feed' && (e.sub === 'L' || e.sub === 'R')) return openBreastEdit(e);
  if (e.t === 'feed' && e.sub === 'bottle') return openBottle(e);
  if (e.t === 'feed') return openCare('solids', e);
  if (e.t === 'sleep') return openSleepEdit(e);
  if (e.t === 'diaper') return openDiaper(e);
  if (e.t === 'pump') return openPump(e);
  return openCare(e.sub, e);
}
function findEvent(id){ for (const k of Object.keys(G.state.data.days)){ const d = G.state.data.days[k]; if (d && d.ev && d.ev[id]) return d.ev[id]; } return null; }
async function saveSheetForm(){
  const form = ui.sheet && ui.sheet.querySelector('form'); if (!form) return;
  const kind = form.dataset.kind, id = form.dataset.id;
  const old = id ? findEvent(id) : null;
  const f = n => form.elements[n];
  const s = G.msFromInput(f('s') && f('s').value);
  if (s == null){ f('s').focus(); return; }
  let e = old ? Object.assign({}, old) : { id: G.uid(), c: Date.now() };
  e.by = old ? (old.by || G.prefs.who || '') : (G.prefs.who || '');
  e.s = s; e.n = (f('n') && f('n').value.trim()) || '';
  if (kind === 'bottle'){ e.t = 'feed'; e.sub = 'bottle'; const a = parseFloat(f('a').value); e.a = isNaN(a) ? null : Math.round(G.units.toMl(a, G.prefs.vol)); e.u = 'ml'; e.e = null; }
  else if (kind === 'pump'){ e.t = 'pump'; e.sub = f('sub').value; const a = parseFloat(f('a').value); e.a = isNaN(a) ? null : Math.round(G.units.toMl(a, G.prefs.vol)); e.u = 'ml'; e.e = G.msFromInput(f('e').value); }
  else if (kind === 'diaper'){ e.t = 'diaper'; e.sub = f('sub').value; e.e = null; }
  else if (kind === 'sleep'){ e.t = 'sleep'; e.e = G.msFromInput(f('e').value); }
  else if (kind === 'breast'){ e.t = 'feed'; e.sub = f('sub').value; e.e = G.msFromInput(f('e').value); }
  else if (kind === 'care'){
    const sub = f('sub').value;
    if (sub === 'solids'){ e.t = 'feed'; e.sub = 'solids'; e.a = null; e.e = null; }
    else { e.t = 'care'; e.sub = sub; e.e = null; const a = f('a') ? parseFloat(f('a').value) : NaN; e.a = isNaN(a) ? null : a; e.u = sub === 'temp' ? G.prefs.temp : (sub === 'tummy' ? 'min' : null); }
  }
  if (e.e != null && e.e < e.s){ const [a, b] = [e.e, e.s]; e.s = a; e.e = b; }
  closeSheet();
  if (old) await G.moveEvent(old, e); else await G.putEvent(e);
  toast(t(old ? 'saved' : 'logged', { x: evLabel(e) }));
}

/* who / settings / ped / vax sheets */
function openWho(force){
  const cg = (G.state.data.profile.caregivers || ['Jose', 'Minerva']);
  openSheet(`<h2>${esc(t('who'))}</h2><p class="small muted">${esc(t('who_sub'))}</p>
    <div class="presets" style="gap:8px">${cg.map(n => `<button type="button" class="btn ${G.prefs.who === n ? 'primary' : ''}" data-act="who-pick" data-v="${esc(n)}">${esc(n)}</button>`).join('')}</div>
    <div class="field"><label>${esc(t('who_other'))}</label><input type="text" id="whoname" placeholder="${esc(t('who_name'))}" maxlength="30"></div>
    <div class="actionsrow">${force ? '' : `<button class="btn" data-act="sheet-close">${esc(t('cancel'))}</button>`}<button class="btn primary" data-act="who-save">${esc(t('who_save'))}</button></div>`);
}
function openSettings(){
  const seg = (name, opts, cur) => `<div class="seg">${opts.map(o => `<button data-act="pref" data-name="${name}" data-v="${o[0]}" aria-pressed="${o[0] === cur}">${esc(o[1])}</button>`).join('')}</div>`;
  const hasLocal = !!G.lsGet(G.LS_DATA, null);
  openSheet(`<h2>${esc(t('s_title'))}</h2>
    <div class="grid2">
      <div class="field"><label>${esc(t('s_lang'))}</label>${seg('lang', [['en', 'English'], ['es', 'Español']], lang)}</div>
      <div class="field"><label>${esc(t('s_vol'))}</label>${seg('vol', [['ml', 'ml'], ['oz', 'oz']], G.prefs.vol)}</div>
      <div class="field"><label>${esc(t('s_wt'))}</label>${seg('wt', [['kg', 'kg'], ['lb', 'lb']], G.prefs.wt)}</div>
      <div class="field"><label>${esc(t('s_len'))}</label>${seg('len', [['cm', 'cm'], ['in', 'in']], G.prefs.len)}</div>
      <div class="field"><label>${esc(t('s_temp'))}</label>${seg('temp', [['F', '°F'], ['C', '°C']], G.prefs.temp)}</div>
      <div class="field"><label>${esc(t('s_who'))}</label><button class="btn" data-act="who">${esc(G.prefs.who || t('who'))}</button></div>
    </div>
    <div class="field"><label>${esc(t('s_caregivers'))}</label><div class="row"><span class="small">${esc((G.state.data.profile.caregivers || []).join(', '))}</span></div><div class="row"><input type="text" id="newcg" placeholder="${esc(t('who_name'))}" maxlength="30" style="flex:1;border:1px solid var(--rule);border-radius:8px;padding:8px;background:var(--card-2)"><button class="btn sm" data-act="addcg">${esc(t('s_addCg'))}</button></div></div>
    <div class="row"><button class="btn sm" data-act="backup">${esc(t('log_backup'))}</button><button class="btn sm" data-act="export">${esc(t('log_export'))}</button><label class="btn sm" style="cursor:pointer">${esc(t('s_restore'))}<input type="file" id="restore" accept="application/json,.json" hidden></label></div>
    ${G.state.mode === 'db' && hasLocal ? `<button class="btn" data-act="merge">${esc(t('s_merge'))}</button>` : ''}
    <div><div class="eyebrow" style="margin-bottom:4px">${esc(t('s_about'))}</div><p class="small muted">${esc(t('s_aboutText'))}</p></div>
    <div><div class="eyebrow" style="margin-bottom:4px">${esc(t('s_sources'))}</div><ul class="small muted" style="margin:0;padding-left:18px">${C.SOURCES.map(s => `<li><a href="${esc(s[1])}" target="_blank" rel="noopener">${esc(s[0])}</a></li>`).join('')}</ul></div>
    <div class="actionsrow"><button class="btn primary" data-act="sheet-close">${esc(t('done'))}</button></div>`);
  const r = $('#restore'); if (r) r.addEventListener('change', async ev => {
    const file = ev.target.files[0]; if (!file) return;
    try { const data = JSON.parse(await file.text()); let n = 0;
      for (const k of Object.keys(data.days || {})) for (const e of Object.values(data.days[k].ev || {})) if (e && !e.del && !findEvent(e.id)) { await G.putEvent(e); n++; }
      for (const m of Object.values((data.growth && data.growth.m) || {})) if (m && !m.del && !G.state.data.growth.m[m.id]) { await G.putGrowth(m); n++; }
      toast(t('s_merged', { n })); } catch (e) { toast(t('fail_save')); }
  });
}
function openPed(){
  const p = G.state.data.health.ped || {};
  openSheet(`<h2>${esc(t('sh_ped'))}</h2><form data-kind="ped">
    <div class="field"><label>${esc(t('h_pedName'))}</label><input type="text" name="name" value="${esc(p.name || '')}" maxlength="80"></div>
    <div class="field"><label>${esc(t('h_pedPhone'))}</label><input type="tel" name="phone" value="${esc(p.phone || '')}" maxlength="30"></div>
    <div class="field"><label>${esc(t('h_pedNotes'))}</label><textarea name="notes" maxlength="300">${esc(p.notes || '')}</textarea></div></form>
    <div class="actionsrow"><button class="btn" data-act="sheet-close">${esc(t('cancel'))}</button><button class="btn primary" data-act="ped-save">${esc(t('save'))}</button></div>`);
}
function openVax(id){
  let v = null; for (const g of C.VAX) for (const x of g.items) if (x.id === id) v = x;
  const done = (G.state.data.health.vax || {})[id];
  openSheet(`<h2>${esc(t('sh_vax'))}</h2><p><b>${esc(L(v.name))}</b></p><form data-kind="vax" data-id="${id}">
    <div class="field"><label>${esc(t('h_dateGiven'))}</label><input type="date" name="d" value="${done ? done.d : G.todayKey()}" min="${G.PROFILE.dobKey}" max="${G.todayKey()}" required></div>
    <div class="field"><label>${esc(t('h_where'))}</label><input type="text" name="where" value="${esc(done ? done.where || '' : '')}" maxlength="80"></div></form>
    <div class="actionsrow">${done ? `<button class="btn danger left" data-act="vax-clear" data-id="${id}">${esc(t('delete'))}</button>` : ''}<button class="btn" data-act="sheet-close">${esc(t('cancel'))}</button><button class="btn primary" data-act="vax-save" data-id="${id}">${esc(t('save'))}</button></div>`);
}
function openVisit(id){
  const v = C.VISITS.find(x => x.id === id); const done = (G.state.data.health.visits || {})[id];
  openSheet(`<h2>${esc(t('sh_visit'))}</h2><p><b>${esc(L(v.label))}</b> · ${esc(L(v.what))}</p><form data-kind="visit" data-id="${id}">
    <div class="field"><label>${esc(t('g_date'))}</label><input type="date" name="d" value="${done ? done.d : G.todayKey()}" min="${G.PROFILE.dobKey}" max="${G.todayKey()}" required></div>
    <div class="field"><label>${esc(t('f_note'))}</label><input type="text" name="n" value="${esc(done ? done.n || '' : '')}" maxlength="200"></div></form>
    <div class="actionsrow">${done ? `<button class="btn danger left" data-act="visit-clear" data-id="${id}">${esc(t('delete'))}</button>` : ''}<button class="btn" data-act="sheet-close">${esc(t('cancel'))}</button><button class="btn primary" data-act="visit-save" data-id="${id}">${esc(t('save'))}</button></div>`);
}

/* ---------------- quick actions ---------------- */
async function quickDiaper(sub){
  const e = { id: G.uid(), t: 'diaper', sub, s: Date.now(), e: null, a: null, n: '', by: G.prefs.who || '', c: Date.now() };
  await G.putEvent(e);
  const acts = [{ label: t('undo'), fn: () => G.deleteEvent(e) }];
  if (sub !== 'both') acts.unshift({ label: t('d_both'), fn: () => G.putEvent(Object.assign({}, e, { sub: 'both' })) });
  toast(t('logged', { x: t('d_' + sub) }), acts);
}
async function toggleBreast(side){
  const running = G.runningEvents().filter(e => e.t === 'feed');
  const now = Date.now();
  for (const r of running){ await G.putEvent(Object.assign({}, r, { e: now })); if (r.sub === side){ toast(t('saved')); return; } }
  await G.putEvent({ id: G.uid(), t: 'feed', sub: side, s: now, e: null, a: null, n: '', by: G.prefs.who || '', c: now });
}
async function toggleSleep(){
  const r = G.runningEvents().find(e => e.t === 'sleep');
  const now = Date.now();
  if (r){ await G.putEvent(Object.assign({}, r, { e: now })); toast(t('saved')); return; }
  await G.putEvent({ id: G.uid(), t: 'sleep', s: now, e: null, a: null, n: '', by: G.prefs.who || '', c: now });
}
async function togglePump(){
  const r = G.runningEvents().find(e => e.t === 'pump');
  if (r) return openPump(r);
  await G.putEvent({ id: G.uid(), t: 'pump', sub: 'both', s: Date.now(), e: null, a: null, n: '', by: G.prefs.who || '', c: Date.now() });
}
async function copyText(text){
  try { await navigator.clipboard.writeText(text); toast(t('copied')); }
  catch (e){ const ta = $('#sharetext'); if (ta){ ta.select(); try { document.execCommand('copy'); toast(t('copied')); } catch (e2){} } }
}

/* ---------------- events ---------------- */
document.addEventListener('click', async ev => {
  const el = ev.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act, v = el.dataset.v;
  if (act === 'scrim'){ if (ev.target === el) closeSheet(); return; }
  if (el.tagName === 'A') return;
  if (act !== 'ms' && act !== 'vax' && act !== 'visit') ev.preventDefault();
  const ro = G.state.mode === 'readonly' || G.state.mode === 'connecting';
  const writes = ['breast', 'bottle', 'sleep', 'diaper', 'pump', 'more', 'ev-save', 'ev-del', 'ms', 'vax', 'visit', 'gsave', 'gdel', 'care'];
  if (ro && writes.includes(act) && G.state.mode === 'readonly'){ toast(t('ro_banner')); return; }
  switch (act){
    case 'tab': ui.tab = v; showTab(); break;
    case 'lang': setLang(v); break;
    case 'who': openWho(false); break;
    case 'who-pick': G.prefs.who = v; G.savePrefs(); closeSheet(); renderHeader(); break;
    case 'who-save': { const n = ($('#whoname') && $('#whoname').value.trim()); if (n){ G.prefs.who = n; G.savePrefs(); const cg = G.state.data.profile.caregivers || []; if (!cg.includes(n)) await G.putProfile({ caregivers: cg.concat([n]) }); } else if (!G.prefs.who) return; closeSheet(); renderHeader(); break; }
    case 'settings': openSettings(); break;
    case 'pref': { if (el.dataset.name === 'lang') setLang(v); else { G.prefs[el.dataset.name] = v; G.savePrefs(); renderAll(); } openSettings(); break; }
    case 'addcg': { const n = $('#newcg').value.trim(); if (!n) return; const cg = G.state.data.profile.caregivers || []; if (!cg.includes(n)) await G.putProfile({ caregivers: cg.concat([n]) }); openSettings(); break; }
    case 'merge': { const n = await G.mergeLocalIntoShared(); toast(t('s_merged', { n })); break; }
    case 'breast': toggleBreast(v); break;
    case 'bottle': openBottle(null); break;
    case 'sleep': toggleSleep(); break;
    case 'diaper': quickDiaper(v); break;
    case 'pump': togglePump(); break;
    case 'more': openCare(null, null); break;
    case 'care': openCare(v, null); break;
    case 'edit': { const e = findEvent(el.dataset.id); if (e) openEdit(e); break; }
    case 'sheet-close': closeSheet(); break;
    case 'ev-save': saveSheetForm(); break;
    case 'ev-del': { const e = findEvent(el.dataset.id); closeSheet(); if (e){ await G.deleteEvent(e); toast(t('deleted'), [{ label: t('undo'), fn: () => G.putEvent(Object.assign({}, e, { del: false })) }]); } break; }
    case 'segpick': { const form = el.closest('form'); form.elements[el.dataset.name].value = v; $$('[data-act=segpick][data-name=' + el.dataset.name + ']', form).forEach(b => b.setAttribute('aria-pressed', String(b === el))); break; }
    case 'carekind': { const form = el.closest('form'); form.elements.sub.value = v; $$('[data-act=carekind]', form).forEach(b => { const on = b === el; b.setAttribute('aria-pressed', String(on)); b.style.cssText = on ? 'background:var(--accent);color:var(--accent-ink);border-color:var(--accent)' : ''; }); $('#careextra').innerHTML = ui.sheet._extra(v); break; }
    case 'step': { const inp = el.parentElement.querySelector('input'); inp.value = Math.max(0, Math.round(((parseFloat(inp.value) || 0) + parseFloat(v)) * 10) / 10); break; }
    case 'preset': { const inp = el.closest('.field').querySelector('input[name=a]'); inp.value = v; break; }
    case 'toastact': { const a = $('#toast')._actions[+el.dataset.i]; $('#toast').hidden = true; if (a) a.fn(); break; }
    case 'logday': { const nk = G.addDays(ui.logDay, +v); if (nk <= G.todayKey() && nk >= G.PROFILE.dobKey) { ui.logDay = nk; renderLog(); } break; }
    case 'share': openShare(); break;
    case 'share-copy': copyText($('#sharetext').value); break;
    case 'share-native': { try { await navigator.share({ text: $('#sharetext').value }); } catch (e){} break; }
    case 'export': { const r = await G.saveFile('gonzalo-days-' + G.todayKey() + '.csv', G.csvExport()); if (r === 'saved') toast(t('saved')); break; }
    case 'backup': { const r = await G.saveFile('gonzalo-days-backup-' + G.todayKey() + '.json', JSON.stringify(G.state.data, null, 1)); if (r === 'saved') toast(t('saved')); break; }
    case 'gm': ui.gMeasure = v; renderGrowth(); break;
    case 'gr': ui.gRange = +v; renderGrowth(); break;
    case 'gt': ui.gTable = v === '1'; renderGrowth(); break;
    case 'gedit': { const m = G.state.data.growth.m[el.dataset.id]; if (m) openGrowthEdit(m); break; }
    case 'gsave': { const form = ui.sheet.querySelector('form') || ui.sheet; const g = n => ui.sheet.querySelector('[name=' + n + ']').value; const old = G.state.data.growth.m[el.dataset.id]; const m = Object.assign({}, old, { d: g('d') || old.d, w: g('w') ? Math.round(G.units.toKg(+g('w'), G.prefs.wt) * 1000) / 1000 : null, l: g('l') ? Math.round(G.units.toCm(+g('l'), G.prefs.len) * 10) / 10 : null, h: g('h') ? Math.round(G.units.toCm(+g('h'), G.prefs.len) * 10) / 10 : null }); closeSheet(); await G.putGrowth(m); toast(t('saved')); break; }
    case 'gdel': { const old = G.state.data.growth.m[el.dataset.id]; closeSheet(); if (old){ await G.putGrowth(Object.assign({}, old, { del: true })); toast(t('deleted')); } break; }
    case 'gband': ui.guideBand = +v; if (C.GUIDE[ui.guideBand] === C.bandFor(G.ageDays())) ui.guideBand = null; renderGuide(); break;
    case 'ms': { const on = el.checked; await G.putHealth('ms', el.dataset.id, { on, by: G.prefs.who || '', d: G.todayKey() }); break; }
    case 'vax': { ev.preventDefault(); openVax(el.dataset.id); break; }
    case 'vax-save': { const d = ui.sheet.querySelector('[name=d]').value; if (!d) return; const where = ui.sheet.querySelector('[name=where]').value.trim(); closeSheet(); await G.putHealth('vax', el.dataset.id, { d, where, by: G.prefs.who || '' }); toast(t('saved')); break; }
    case 'vax-clear': closeSheet(); await G.putHealth('vax', el.dataset.id, null); break;
    case 'visit': { ev.preventDefault(); openVisit(el.dataset.id); break; }
    case 'visit-save': { const d = ui.sheet.querySelector('[name=d]').value; if (!d) return; const n = ui.sheet.querySelector('[name=n]').value.trim(); closeSheet(); await G.putHealth('visits', el.dataset.id, { d, n, by: G.prefs.who || '' }); toast(t('saved')); break; }
    case 'visit-clear': closeSheet(); await G.putHealth('visits', el.dataset.id, null); break;
    case 'ped': openPed(); break;
    case 'ped-save': { const g = n => ui.sheet.querySelector('[name=' + n + ']').value.trim(); const ped = { name: g('name'), phone: g('phone'), notes: g('notes') }; closeSheet(); G.state.data.health.ped = ped; G.emit(); await G.putHealth('ped', 'name', ped.name); await G.putHealth('ped', 'phone', ped.phone); await G.putHealth('ped', 'notes', ped.notes); toast(t('saved')); break; }
    case 'askpreset': { $('#askq').value = t(v); ask(t(v)); break; }
    case 'ask': ask($('#askq').value.trim()); break;
  }
});
document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && ui.sheet) closeSheet(); if (ev.key === 'Enter' && ui.sheet && ev.target.tagName === 'INPUT' && ev.target.type !== 'file'){ const btn = ui.sheet.querySelector('[data-act=ev-save],[data-act=gsave],[data-act=vax-save],[data-act=visit-save],[data-act=ped-save],[data-act=who-save]'); if (btn){ ev.preventDefault(); btn.click(); } } });
document.addEventListener('submit', ev => { if (ev.target.closest('.sheet')) ev.preventDefault(); });

/* ---------------- render orchestration ---------------- */
function showTab(){
  for (const k of ['today', 'log', 'growth', 'guide', 'health']){ $('#p-' + k).hidden = ui.tab !== k; }
  $$('nav.tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.v === ui.tab)));
  renderTab();
  window.scrollTo({ top: 0 });
}
function renderTab(){
  if (ui.tab === 'today') renderToday();
  else if (ui.tab === 'log') renderLog();
  else if (ui.tab === 'growth') renderGrowth();
  else if (ui.tab === 'guide') renderGuide();
  else renderHealth();
}
let raf = null;
function renderAll(){ if (raf) return; raf = requestAnimationFrame(() => { raf = null; renderHeader(); renderTab(); }); }
function setLang(v){ lang = v; G.prefs.lang = v; G.savePrefs(); document.documentElement.lang = v; renderShell(); showTab(); }
function tick(){
  const now = Date.now();
  $$('[data-elapsed]').forEach(el => { el.textContent = G.fmtClock(now - (+el.dataset.elapsed)); });
  $$('[data-ago]').forEach(el => { el.textContent = fmtD((now - (+el.dataset.ago)) / 60000); });
}
let lastMinute = -1;
setInterval(() => {
  tick();
  const m = Math.floor(Date.now() / 60000);
  if (m !== lastMinute){ lastMinute = m; if (ui.tab === 'today' && !ui.sheet){ const ns = $('#nowstrip'); if (ns) ns.innerHTML = nowTilesHTML(); const rb = $('#ribbon-today'); if (rb) renderRibbon(rb, G.todayKey()); } if (G.todayKey() !== ui._day){ ui._day = G.todayKey(); renderAll(); } }
}, 1000);
window.addEventListener('resize', () => { clearTimeout(ui._rt); ui._rt = setTimeout(() => { if (ui.tab === 'today'){ const r = $('#ribbon-today'); if (r) renderRibbon(r, G.todayKey()); } else if (ui.tab === 'log'){ const r = $('#ribbon-log'); if (r) renderRibbon(r, ui.logDay); } else if (ui.tab === 'growth'){ const g = $('#gchart'); if (g && !ui.gTable) renderGrowthChart(g, ui.gMeasure, ui.gRange); } }, 150); });

/* ---------------- init ---------------- */
document.documentElement.lang = lang;
ui._day = G.todayKey();
renderShell();
showTab();
G.onChange(renderAll);
G.boot().then(() => { renderAll(); if (!G.prefs.who) openWho(true); });
})();
