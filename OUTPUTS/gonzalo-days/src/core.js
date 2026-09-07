/* ============================================================
   Gonzalo's Days — core: profile, time, store, growth math
   ============================================================ */
window.GD = (function(){
'use strict';

const PROFILE = {
  name: 'Gonzalo',
  full: 'Gonzalo Bedoya Fuentes',
  dob: '2026-08-17T11:39:00-04:00',
  dobKey: '2026-08-17',
  dobMs: Date.parse('2026-08-17T11:39:00-04:00'),
  tz: 'America/New_York',
  sex: 'M',
  born: { en: 'Mount Sinai Medical Center, Miami Beach', es: 'Mount Sinai Medical Center, Miami Beach' },
};
const TZ = PROFILE.tz;
const LS_DATA = 'gonzalo-days-v1';
const LS_CACHE = 'gonzalo-days-cache-v1';
const LS_PREFS = 'gonzalo-days-prefs-v1';
const OZ_ML = 29.5735;
const LB_KG = 0.45359237;
const IN_CM = 2.54;

/* ---------------- small helpers ---------------- */
const pad = n => (n < 10 ? '0' : '') + n;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const clone = o => JSON.parse(JSON.stringify(o));
function lsGet(k, fb){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch(e){ return fb; } }
function lsSet(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }

/* ---------------- time in the baby's zone ---------------- */
const partsFmt = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
function parts(ms){
  const p = {};
  for (const x of partsFmt.formatToParts(new Date(ms))) p[x.type] = x.value;
  return { y: +p.year, m: +p.month, d: +p.day, hh: (+p.hour) % 24, mm: +p.minute, ss: +p.second };
}
function dayKey(ms){ const p = parts(ms); return p.y + '-' + pad(p.m) + '-' + pad(p.d); }
function keyParts(key){ const a = key.split('-').map(Number); return { y: a[0], m: a[1], d: a[2] }; }
function tzOffset(ms){ const p = parts(ms); return Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mm, p.ss) - Math.floor(ms / 1000) * 1000; }
function zonedToMs(y, m, d, hh, mm){
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let ms = guess - tzOffset(guess);
  const off2 = tzOffset(ms);
  if (guess - off2 !== ms) ms = guess - off2;
  return ms;
}
function dayStartMs(key){ const k = keyParts(key); return zonedToMs(k.y, k.m, k.d, 0, 0); }
function addDays(key, n){ const k = keyParts(key); return new Date(Date.UTC(k.y, k.m - 1, k.d + n)).toISOString().slice(0, 10); }
function daysBetween(k1, k2){ const a = keyParts(k1), b = keyParts(k2); return Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86400000); }
function todayKey(){ return dayKey(Date.now()); }
function ageDaysAt(key){ return daysBetween(PROFILE.dobKey, key); }
function ageDays(){ return ageDaysAt(todayKey()); }
function ageDaysExact(ms){ return (ms - PROFILE.dobMs) / 86400000; }
/* calendar months + remaining days since the 17th */
function ageMonths(key){
  const a = keyParts(PROFILE.dobKey), b = keyParts(key);
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  if (b.d < a.d) months -= 1;
  // day of last monthiversary
  let my = a.y + Math.floor((a.m - 1 + months) / 12), mm = ((a.m - 1 + months) % 12) + 1;
  let lastKey = my + '-' + pad(mm) + '-' + pad(a.d);
  const rem = daysBetween(lastKey, key);
  return { months, days: rem, weeks: Math.floor(rem / 7) };
}
function keyAtAgeMonths(m){ const a = keyParts(PROFILE.dobKey); const y = a.y + Math.floor((a.m - 1 + m) / 12), mo = ((a.m - 1 + m) % 12) + 1; return y + '-' + pad(mo) + '-' + pad(a.d); }
function keyAtAgeDays(d){ return addDays(PROFILE.dobKey, d); }

function fmtTime(ms, lang){
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: lang !== 'es' }).format(new Date(ms));
}
function fmtDate(key, lang, opts){
  const k = keyParts(key);
  const d = new Date(Date.UTC(k.y, k.m - 1, k.d, 12));
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', Object.assign({ timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' }, opts || {})).format(d);
}
function fmtDateLong(key, lang){ return fmtDate(key, lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }
function fmtDateShort(key, lang){ return fmtDate(key, lang, { weekday: undefined, day: 'numeric', month: 'short', year: 'numeric' }); }
function fmtDur(mins, lang, short){
  mins = Math.max(0, Math.round(mins));
  const h = Math.floor(mins / 60), m = mins % 60;
  if (lang === 'es') return h ? (m ? h + ' h ' + m + ' min' : h + ' h') : m + ' min';
  return h ? (m ? h + 'h ' + m + 'm' : h + 'h') : m + (short ? 'm' : ' min');
}
function fmtClock(ms){ // mm:ss or h:mm:ss for running timers
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return h ? h + ':' + pad(m) + ':' + pad(sec) : m + ':' + pad(sec);
}
function localInputValue(ms){ const p = parts(ms); return p.y + '-' + pad(p.m) + '-' + pad(p.d) + 'T' + pad(p.hh) + ':' + pad(p.mm); }
function msFromInput(v){ // "YYYY-MM-DDTHH:MM" in baby's zone
  if (!v) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(v);
  if (!m) return null;
  return zonedToMs(+m[1], +m[2], +m[3], +m[4], +m[5]);
}

/* ---------------- units ---------------- */
const units = {
  vol: (ml, u) => u === 'oz' ? (Math.round(ml / OZ_ML * 10) / 10) + ' oz' : Math.round(ml) + ' ml',
  volNum: (ml, u) => u === 'oz' ? Math.round(ml / OZ_ML * 10) / 10 : Math.round(ml),
  toMl: (n, u) => u === 'oz' ? n * OZ_ML : n,
  wt: (kg, u) => { if (u === 'lb'){ const lb = kg / LB_KG; const w = Math.floor(lb), oz = Math.round((lb - w) * 16); return (oz === 16 ? (w + 1) + ' lb 0 oz' : w + ' lb ' + oz + ' oz'); } return (Math.round(kg * 1000) / 1000).toFixed(kg >= 10 ? 2 : 3).replace(/0+$/, '').replace(/\.$/, '') + ' kg'; },
  toKg: (n, u) => u === 'lb' ? n * LB_KG : n,
  len: (cm, u) => u === 'in' ? (Math.round(cm / IN_CM * 10) / 10) + ' in' : (Math.round(cm * 10) / 10) + ' cm',
  toCm: (n, u) => u === 'in' ? n * IN_CM : n,
  temp: (v, u) => u === 'C' ? (Math.round(v * 10) / 10) + ' °C' : (Math.round(v * 10) / 10) + ' °F',
  toF: (v, u) => u === 'C' ? v * 9 / 5 + 32 : v,
};

/* ---------------- prefs (per device) ---------------- */
const prefs = Object.assign({ lang: null, who: null, vol: 'ml', wt: 'kg', len: 'cm', temp: 'F', msDone: {} }, lsGet(LS_PREFS, {}));
if (!prefs.lang) prefs.lang = (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
function savePrefs(){ lsSet(LS_PREFS, prefs); }

/* ---------------- state ---------------- */
const emptyData = () => ({ days: {}, growth: { m: {} }, health: { vax: {}, visits: {}, ped: {}, ms: {} }, profile: { caregivers: ['Jose', 'Minerva'] } });
const state = {
  mode: 'connecting',       // connecting | local | db | readonly
  data: emptyData(),
  db: null, downloads: null, sample: null,
  listeners: [],
  writeError: null,
};
function onChange(fn){ state.listeners.push(fn); }
function emit(){ for (const fn of state.listeners) { try { fn(); } catch(e){ console.error(e); } } }

/* ---------------- events ---------------- */
/* event: {id, t, sub, s(ms), e(ms|null), a(number|null), u, n, by, c, del} */
function dayEvents(key){
  const d = state.data.days[key];
  if (!d || !d.ev) return [];
  return Object.values(d.ev).filter(e => e && !e.del && typeof e.s === 'number').sort((a, b) => a.s - b.s);
}
function eventsBetween(fromMs, toMs){
  const out = [];
  let k = dayKey(fromMs - 86400000 * 1.5);
  const end = dayKey(toMs);
  for (let i = 0; i < 6; i++){
    for (const e of dayEvents(k)) if (e.s <= toMs && (e.e == null ? e.s : Math.max(e.e, e.s)) >= fromMs) out.push(e);
    if (k === end) break;
    k = addDays(k, 1);
  }
  return out.sort((a, b) => a.s - b.s);
}
function allEvents(){
  const out = [];
  for (const k of Object.keys(state.data.days)) out.push(...dayEvents(k));
  return out.sort((a, b) => a.s - b.s);
}
function runningEvents(){
  const now = Date.now();
  return eventsBetween(now - 86400000 * 1.5, now + 3600000).filter(e => e.e == null && (e.t === 'sleep' || (e.t === 'feed' && (e.sub === 'L' || e.sub === 'R')) || e.t === 'pump'));
}
function lastOf(type, beforeMs){
  const evs = eventsBetween((beforeMs || Date.now()) - 86400000 * 3, beforeMs || Date.now()).filter(e => e.t === type);
  return evs.length ? evs[evs.length - 1] : null;
}

async function putEvent(ev){
  const key = dayKey(ev.s);
  ev.c = ev.c || Date.now();
  if (!state.data.days[key]) state.data.days[key] = { d: key, ev: {} };
  state.data.days[key].ev[ev.id] = ev;
  emit();
  await persist('days/' + key, 'ev', ev.id, ev);
}
async function deleteEvent(ev){
  const key = dayKey(ev.s);
  const cur = Object.assign({}, ev, { del: true });
  if (state.data.days[key] && state.data.days[key].ev) state.data.days[key].ev[ev.id] = cur;
  emit();
  await persist('days/' + key, 'ev', ev.id, cur);
}
/* move an event whose start day changed: tombstone old, write new */
async function moveEvent(oldEv, newEv){
  const k1 = dayKey(oldEv.s), k2 = dayKey(newEv.s);
  if (k1 === k2) return putEvent(newEv);
  await deleteEvent(oldEv);
  return putEvent(Object.assign({}, newEv, { id: uid() }));
}
async function putGrowth(m){ state.data.growth.m[m.id] = m; emit(); await persist('growth/main', 'm', m.id, m); }
async function putHealth(field, id, obj){ state.data.health[field] = state.data.health[field] || {}; state.data.health[field][id] = obj; emit(); await persist('health/main', field, id, obj); }
async function putProfile(obj){ Object.assign(state.data.profile, obj); emit(); await persistDoc('profile/main', state.data.profile); }

/* ---------------- persistence ---------------- */
async function persist(path, field, id, obj){
  if (state.mode === 'db' && state.db){
    const ref = state.db.doc(path);
    try {
      await ref.update({ [field]: { [id]: obj } });
    } catch (e) {
      if (e && e.code === 'invalid_argument'){
        try {
          const snap = await ref.get();
          const cur = snap.exists ? clone(snap.data()) : {};
          if (path.indexOf('days/') === 0) cur.d = path.slice(5);
          cur[field] = cur[field] || {};
          cur[field][id] = obj;
          await ref.set(cur);
        } catch (e2) { writeFailed(e2); }
      } else writeFailed(e);
    }
  } else {
    lsSet(LS_DATA, state.data);
  }
}
async function persistDoc(path, obj){
  if (state.mode === 'db' && state.db){
    try { await state.db.doc(path).set(clone(obj)); } catch (e) { writeFailed(e); }
  } else lsSet(LS_DATA, state.data);
}
function writeFailed(e){
  console.warn('write failed', e);
  state.writeError = (e && e.code) || 'unavailable';
  if (e && (e.code === 'not_granted' || e.code === 'revoked')) state.mode = 'readonly';
  emit();
}

/* ---------------- boot: capabilities ---------------- */
function applySnapshotDoc(target, id, data){ target[id] = data; }
async function boot(){
  const hasRuntime = !!(window.claude && typeof window.claude.use === 'function');
  if (!hasRuntime){
    state.mode = 'local';
    state.data = Object.assign(emptyData(), lsGet(LS_DATA, {}));
    emit();
    return;
  }
  // paint the cache while the grant resolves
  const cached = lsGet(LS_CACHE, null);
  if (cached) { state.data = Object.assign(emptyData(), cached); emit(); }
  const [db, downloads, sample] = await Promise.all([
    window.claude.use('db').catch(() => null),
    window.claude.use('downloads').catch(() => null),
    window.claude.use('sample').catch(() => null),
  ]);
  state.downloads = downloads; state.sample = sample;
  if (!db){
    state.mode = 'local';
    state.data = Object.assign(emptyData(), lsGet(LS_DATA, {}));
    emit();
    return;
  }
  state.db = db; state.mode = 'db';
  state.data = cached ? Object.assign(emptyData(), cached) : emptyData();
  const onErr = e => { console.warn('subscription error', e); if (e && e.code === 'revoked') { state.mode = 'readonly'; emit(); } };
  db.collection('days').orderBy('d', 'desc').limit(120).onSnapshot(snap => {
    for (const ch of snap.docChanges()){
      if (ch.type === 'removed') delete state.data.days[ch.doc.id];
      else state.data.days[ch.doc.id] = clone(ch.doc.data());
    }
    cacheWrite(); emit();
  }, onErr);
  db.doc('growth/main').onSnapshot(s => { state.data.growth = s.exists ? clone(s.data()) : { m: {} }; if (!state.data.growth.m) state.data.growth.m = {}; cacheWrite(); emit(); }, onErr);
  db.doc('health/main').onSnapshot(s => { const h = s.exists ? clone(s.data()) : {}; state.data.health = Object.assign({ vax: {}, visits: {}, ped: {}, ms: {} }, h); cacheWrite(); emit(); }, onErr);
  db.doc('profile/main').onSnapshot(s => { if (s.exists) state.data.profile = Object.assign({ caregivers: ['Jose', 'Minerva'] }, clone(s.data())); cacheWrite(); emit(); }, onErr);
  emit();
}
let cacheTimer = null;
function cacheWrite(){ clearTimeout(cacheTimer); cacheTimer = setTimeout(() => lsSet(LS_CACHE, state.data), 400); }

/* merge this device's local log into the shared store (one-off) */
async function mergeLocalIntoShared(){
  const local = lsGet(LS_DATA, null);
  if (!local || state.mode !== 'db') return 0;
  let n = 0;
  for (const k of Object.keys(local.days || {})){
    for (const ev of Object.values(local.days[k].ev || {})){
      if (!ev || ev.del) continue;
      const cur = state.data.days[k] && state.data.days[k].ev && state.data.days[k].ev[ev.id];
      if (cur) continue;
      await putEvent(ev); n++;
    }
  }
  for (const m of Object.values((local.growth && local.growth.m) || {})){ if (m && !m.del && !state.data.growth.m[m.id]) { await putGrowth(m); n++; } }
  return n;
}

/* ---------------- growth math (WHO LMS) ---------------- */
const WHO = window.GD_WHO;
function lmsAt(ind, day){
  const t = WHO[ind];
  day = clamp(day, 0, t.length - 1);
  const i = Math.floor(day), f = day - i, a = t[i], b = t[Math.min(i + 1, t.length - 1)];
  return { L: a[1] + (b[1] - a[1]) * f, M: a[2] + (b[2] - a[2]) * f, S: a[3] + (b[3] - a[3]) * f };
}
function zOf(x, p){ return Math.abs(p.L) < 1e-9 ? Math.log(x / p.M) / p.S : (Math.pow(x / p.M, p.L) - 1) / (p.L * p.S); }
function xOfZ(z, p){ return Math.abs(p.L) < 1e-9 ? p.M * Math.exp(p.S * z) : p.M * Math.pow(1 + p.L * p.S * z, 1 / p.L); }
function erf(x){ // Abramowitz & Stegun 7.1.26
  const s = x < 0 ? -1 : 1; x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
const zOfP = { 3: -1.8808, 15: -1.0364, 50: 0, 85: 1.0364, 97: 1.8808 };
function percentile(ind, x, day){ const z = zOf(x, lmsAt(ind, day)); return { z, p: Phi(z) * 100 }; }
function fmtPct(p, lang){
  if (p < 1) return lang === 'es' ? '<1.º' : '<1st';
  if (p > 99) return lang === 'es' ? '>99.º' : '>99th';
  const n = Math.round(p);
  if (lang === 'es') return n + '.º';
  const s = (n % 100 >= 11 && n % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th');
  return n + s;
}
function growthList(){ return Object.values(state.data.growth.m || {}).filter(m => m && !m.del && m.d).sort((a, b) => a.d < b.d ? -1 : 1); }

/* ---------------- day summaries ---------------- */
function summarize(key, nowMs){
  const evs = dayEvents(key);
  const start = dayStartMs(key), end = start + 86400000;
  const now = nowMs || Date.now();
  const s = { feeds: 0, breastMin: 0, L: 0, R: 0, bottleMl: 0, bottles: 0, solids: 0, sleepMin: 0, naps: 0, wet: 0, dirty: 0, diapers: 0, pumpMl: 0, pumps: 0, vitd: false, tummy: 0, temps: [], longestSleep: 0 };
  // sleeps that overlap the day, including those started yesterday
  const sleeps = eventsBetween(start, Math.min(end, now)).filter(e => e.t === 'sleep');
  for (const e of sleeps){
    const a = Math.max(e.s, start), b = Math.min(e.e == null ? now : e.e, end, now);
    if (b > a){ const mins = (b - a) / 60000; s.sleepMin += mins; if (e.s >= start && e.s < end) s.naps++; s.longestSleep = Math.max(s.longestSleep, (Math.min(e.e == null ? now : e.e, now) - e.s) / 60000); }
  }
  for (const e of evs){
    if (e.t === 'feed'){
      s.feeds++;
      if (e.sub === 'L' || e.sub === 'R'){ const mins = ((e.e == null ? now : e.e) - e.s) / 60000; s.breastMin += mins; s[e.sub] += mins; }
      else if (e.sub === 'bottle'){ s.bottles++; s.bottleMl += e.a || 0; }
      else if (e.sub === 'solids') s.solids++;
    } else if (e.t === 'diaper'){
      s.diapers++;
      if (e.sub === 'wet' || e.sub === 'both') s.wet++;
      if (e.sub === 'dirty' || e.sub === 'both') s.dirty++;
    } else if (e.t === 'pump'){ s.pumps++; s.pumpMl += e.a || 0; }
    else if (e.t === 'care'){
      if (e.sub === 'vitd') s.vitd = true;
      if (e.sub === 'tummy') s.tummy += e.a || 0;
      if (e.sub === 'temp' && e.a != null) s.temps.push(e);
    }
  }
  return s;
}

/* ---------------- export ---------------- */
function csvExport(){
  const rows = [['date', 'start_local', 'end_local', 'type', 'subtype', 'amount', 'unit', 'minutes', 'note', 'by']];
  for (const e of allEvents()){
    const mins = e.e != null ? Math.round((e.e - e.s) / 60000) : '';
    rows.push([dayKey(e.s), localInputValue(e.s).replace('T', ' '), e.e != null ? localInputValue(e.e).replace('T', ' ') : '', e.t, e.sub || '', e.a != null ? e.a : '', e.u || '', mins, e.n || '', e.by || '']);
  }
  rows.push([]);
  rows.push(['growth_date', 'weight_kg', 'length_cm', 'head_cm', 'by']);
  for (const m of growthList()) rows.push([m.d, m.w != null ? m.w : '', m.l != null ? m.l : '', m.h != null ? m.h : '', m.by || '']);
  return rows.map(r => r.map(v => { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(',')).join('\n');
}
async function saveFile(filename, data){
  if (state.downloads){
    try { await state.downloads.save({ filename, data }); return 'saved'; }
    catch (e){ if (e && e.code === 'declined') return 'declined'; console.warn(e); }
  }
  try {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return 'saved';
  } catch (e) { return 'failed'; }
}

return {
  PROFILE, TZ, prefs, savePrefs, state, onChange, emit,
  pad, clamp, esc, uid, clone, units,
  parts, dayKey, keyParts, dayStartMs, addDays, daysBetween, todayKey, ageDays, ageDaysAt, ageDaysExact, ageMonths, keyAtAgeMonths, keyAtAgeDays,
  fmtTime, fmtDate, fmtDateLong, fmtDateShort, fmtDur, fmtClock, localInputValue, msFromInput,
  dayEvents, eventsBetween, allEvents, runningEvents, lastOf, putEvent, deleteEvent, moveEvent, putGrowth, putHealth, putProfile,
  boot, mergeLocalIntoShared, lsGet, LS_DATA,
  lmsAt, zOf, xOfZ, Phi, zOfP, percentile, fmtPct, growthList, summarize, csvExport, saveFile,
};
})();
