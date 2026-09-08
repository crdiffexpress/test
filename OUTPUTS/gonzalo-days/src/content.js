/* ============================================================
   Gonzalo's Days — content: UI strings (EN/ES), age guide,
   milestones, vaccines, visits, sources.
   ============================================================ */
window.GD_CONTENT = (function(){
'use strict';

/* ---------------- UI strings ---------------- */
const T = {
en: {
  appName: "Gonzalo's Days", tagline: "One shared log for everyone who loves him.",
  nav_today: 'Today', nav_log: 'Log', nav_growth: 'Growth', nav_guide: 'Guide', nav_health: 'Health',
  age_wd: '{w} wk {d} d', age_wd_long: '{w} weeks, {d} days', age_md: '{m} mo {d} d', age_md_long: '{m} months, {d} days', age_days: '{n} days old',
  born: 'born {date}', today: 'Today', yesterday: 'Yesterday',
  sync_live: 'Synced live', sync_local: 'This device only', sync_connecting: 'Connecting…', sync_readonly: 'Read-only', sync_error: 'Save failed',
  sync_live_tip: 'Everyone with this link sees the same log, live.', sync_local_tip: 'Entries are saved in this browser only. Open the shared link on claude.ai to sync.',
  who: 'Who is logging?', who_sub: "Each entry is stamped with the caregiver's name, so Minerva knows what Jose did at 3 am.", who_other: 'Someone else', who_name: 'Name', who_save: 'Start logging',
  now_lastFeed: 'Last feed', now_awake: 'Awake for', now_asleep: 'Asleep for', now_lastDiaper: 'Last diaper', now_none: 'Nothing yet',
  now_ago: '{t} ago', now_nap: 'Nap window ~{a}–{b}', now_napOpen: 'Nap window open until ~{b}', now_napPast: 'Past the typical window', now_napHint: 'Log a sleep to get nap estimates', now_since: 'since {t}',
  side_L: 'Left', side_R: 'Right', side_both: 'Both', bottle: 'Bottle', solids: 'Solids', breast: 'Breast',
  next_side: 'next: {s}', typical_feed: 'typical: every {x}',
  act_L: 'Left', act_R: 'Right', act_bottle: 'Bottle', act_sleep: 'Sleep', act_wet: 'Wet', act_dirty: 'Dirty', act_pump: 'Pump', act_more: 'More', act_stop: 'Tap to stop', act_wake: 'Tap to wake',
  tot_feeds: 'Feeds', tot_sleep: 'Sleep', tot_diapers: 'Diapers', tot_breast: 'breast', tot_naps: 'naps', tot_wet: 'wet', tot_dirty: 'dirty', tot_typical: 'typical {x}', tot_wetTarget: 'aim for ≥6 wet',
  ribbon_title: '24 hours', ribbon_sub: 'Miami time', leg_sleep: 'Sleep', leg_feed: 'Feed', leg_diaper: 'Diaper', leg_care: 'Care', now_marker: 'now',
  entries: 'Entries', entries_empty: 'Nothing logged yet. Tap a button above and it lands here.', running: 'running', vitd_done: 'Vitamin D given', vitd_not: 'Vitamin D not logged today',
  e_feed: 'Feed', e_sleep: 'Sleep', e_diaper: 'Diaper', e_pump: 'Pump', e_care: 'Care',
  d_wet: 'Wet', d_dirty: 'Dirty', d_both: 'Wet + dirty', d_dry: 'Dry',
  c_tummy: 'Tummy time', c_bath: 'Bath', c_vitd: 'Vitamin D', c_meds: 'Medicine', c_temp: 'Temperature', c_note: 'Note',
  f_amount: 'Amount', f_time: 'Time', f_start: 'Start', f_end: 'End', f_dur: 'Duration', f_note: 'Note', f_side: 'Side', f_type: 'Type', f_minutes: 'Minutes', f_stillRunning: 'still running',
  save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', close: 'Close', add: 'Add', done: 'Done', undo: 'Undo', back: 'Back',
  logged: '{x} logged', deleted: 'Deleted', saved: 'Saved', copied: 'Copied', fail_save: "Couldn't save. Check the connection and try again.",
  sh_bottle: 'Bottle feed', sh_pump: 'Pumping', sh_care: 'Care & notes', sh_edit: 'Edit entry', sh_diaper: 'Diaper', sh_sleep: 'Sleep', sh_breast: 'Breastfeed', sh_growth: 'New measurement', sh_settings: 'Settings', sh_vax: 'Mark as given', sh_ped: 'Pediatrician', sh_share: 'Share the day', sh_visit: 'Well visit',
  log_title: 'Log', log_share: 'Share', log_export: 'Export CSV', log_backup: 'Backup', log_days: 'days logged', log_pick: 'Pick a day',
  share_copy: 'Copy text', share_wa: 'WhatsApp', share_native: 'Share…', share_sub: 'A plain-text summary for the family group.',
  sum_feeds: 'Feeds', sum_sleep: 'Sleep', sum_diapers: 'Diapers', sum_last: 'Last feed', sum_growth: 'Latest', sum_vitd: 'Vitamin D',
  g_title: 'Growth', g_weight: 'Weight', g_length: 'Length', g_head: 'Head', g_add: 'Add measurement', g_date: 'Date', g_pct: '{p} percentile', g_empty: 'No measurements yet. Add the birth weight from the hospital papers, then each pediatrician visit.', g_who: 'WHO Child Growth Standards, boys, 0–24 months. Percentile bands: 3rd, 15th, 50th, 85th, 97th.', g_table: 'Table', g_chart: 'Chart', g_latest: 'Latest', g_ageAt: 'at {age}', g_z: 'z-score', g_range3: '3 mo', g_range6: '6 mo', g_range12: '1 yr', g_range24: '2 yr', g_bw: 'Birth weight', g_since: 'since birth', g_noBw: 'add birth weight to see gain', g_hint: 'Weight at each pediatrician visit is enough. Length and head circumference are usually measured there too.', g_hover: 'Hover or tap a point for its percentile.',
  gu_title: 'Guide', gu_thisWeek: 'This week', gu_at: 'Gonzalo at {age}', gu_sleep: 'Sleep', gu_feed: 'Feeding', gu_diapers: 'Diapers', gu_dev: "What he's working on", gu_watch: 'Call the pediatrician if', gu_tips: 'Tips for this stage', gu_next: 'Coming up', gu_ms: 'Milestones by {age}', gu_msSub: 'CDC "Learn the Signs. Act Early." checklist. Most children (75% or more) do these by this age. Tick what you have seen. If several are missing at the checkpoint, mention it at the visit.', gu_msCat_se: 'Social / emotional', gu_msCat_lc: 'Language / communication', gu_msCat_cg: 'Cognitive', gu_msCat_mv: 'Movement / physical', gu_norms: 'Typical ranges, not targets.', gu_wake: 'Wake window', gu_total: 'Total sleep', gu_naps: 'Naps', gu_ww_src: 'Wake windows are commonly cited by pediatric sleep sources, not a clinical standard.', gu_showing: 'Showing', gu_currentAge: 'his age now', gu_nextVisit: 'Next well visit', gu_nextShots: 'Next vaccines',
  h_title: 'Health', h_vax: 'Vaccines', h_vaxSub: 'AAP 2026 schedule with dates computed from his birthday. Where the CDC schedule (Jan 2026) lists a vaccine under shared clinical decision-making instead of routine, it is marked. Tick each dose as it is given.', h_visits: 'Well-child visits', h_visitsSub: 'Bright Futures / AAP periodicity schedule.', h_ped: 'Pediatrician', h_pedName: 'Name / practice', h_pedPhone: 'Phone', h_pedNotes: 'Notes (portal, address, after-hours line)', h_pedEmpty: 'Add the pediatrician so anyone with the app can call.', h_call: 'Call', h_given: 'Given', h_givenOn: 'given {date}', h_due: 'due {date}', h_window: '{a} – {b}', h_overdue: 'past window', h_soon: 'due soon', h_scdm: 'CDC: shared decision', h_routine: 'routine', h_dateGiven: 'Date given', h_where: 'Where / lot (optional)', h_shots: 'Florida SHOTS', h_shotsText: 'Florida SHOTS is the free state immunization registry. Ask the pediatrician for the certified DH 680 form, the certificate Florida licensed childcare requires before entry.', h_disclaimer: 'Schedules compiled 7 Sep 2026 from CDC, AAP and Florida DOH reports. Confirm every dose with the pediatrician: this is a checklist, not medical advice.', h_rsv: 'RSV antibody (nirsevimab or clesrovimab)', h_rsvNote: 'One dose entering his first RSV season if Minerva did not get the maternal RSV vaccine in pregnancy. Southern Florida\'s season runs longer than the national Oct–Mar window; ask the pediatrician when to give it.', h_temp: 'Temperature', h_tempSub: 'Under 3 months, a rectal temperature of 100.4 °F (38 °C) or higher is a call-now situation.', h_tempLog: 'Log temperature', h_tempAlert: '{t} logged {ago}. Under 3 months this needs a call to the pediatrician now.', h_visitDone: 'done {date}', h_markVisit: 'Mark done', h_visitAt: 'at {age}',
  ask_title: 'Ask about today', ask_sub: 'Sends the last 24 hours of his log plus his age to Claude\'s quick model and answers here. Not medical advice; nothing replaces the pediatrician.', ask_ph: 'e.g. Is his feeding pattern normal for 3 weeks?', ask_send: 'Ask', ask_thinking: 'Thinking…', ask_p1: 'Summarize the last 24 hours for the pediatrician', ask_p2: 'How does his sleep compare with his age?', ask_p3: 'Is he feeding often enough?', ask_err: "Couldn't get an answer right now.",
  s_title: 'Settings', s_lang: 'Language', s_units: 'Units', s_vol: 'Volume', s_wt: 'Weight', s_len: 'Length', s_temp: 'Temperature', s_who: 'I am', s_caregivers: 'Caregivers', s_addCg: 'Add caregiver', s_merge: 'Copy this device\'s offline entries into the shared log', s_merged: '{n} entries copied', s_about: 'About', s_aboutText: 'Built for Gonzalo Bedoya Fuentes, born 17 August 2026 at 11:39 at Mount Sinai Medical Center, Miami Beach. Times are always shown in Miami time, wherever you open it. Growth percentiles come from the WHO Child Growth Standards. Guidance follows the AAP, CDC and WHO; typical ranges are not targets.', s_sources: 'Sources', s_theme: 'Theme', s_restore: 'Restore backup', s_restoreSub: 'Choose a backup .json exported from this app.',
  units_ml: 'ml', units_oz: 'oz', units_kg: 'kg', units_lb: 'lb', units_cm: 'cm', units_in: 'in',
  wk: 'wk', mo: 'mo', d: 'd', h: 'h', min: 'min',
  dur_short: '{h}h {m}m',
  foot_1: 'Times in Miami (America/New_York). Typical ranges come from the AAP, CDC, WHO and commonly cited sleep references; they are context, not targets, and never replace the pediatrician.',
  foot_2: 'Made for Gonzalo. Built with care by his dad, with Claude.',
  ro_banner: 'You can view this log but not add to it.',
  chart_age: 'Age', chart_days: 'days', chart_months: 'months', chart_p: 'percentile',
  log_day: 'Day', log_patterns: 'Patterns', pat_rhythm: 'Daily rhythm', pat_rhythmSub: 'when things happen · Miami time', pat_totals: 'Daily totals', pat_stretch: 'Longest stretch without a feed', pat_longest: 'longest so far', pat_side: 'Side balance', pat_night: 'night', pat_totalsOnly: 'totals only', pat_sleepHours: 'Sleep hours', pat_empty: 'Patterns appear once a few days are logged.', pat_avg: 'avg', pat_feeds: 'feeds', pat_wet: 'wet', pat_dirty: 'dirty', pat_sleep: 'sleep', pat_left: 'Left', pat_right: 'Right', pat_noSides: 'No timed breast feeds in this range yet.',
  hero_since: 'since last feed', hero_nursing: 'nursing now', hero_next: 'next side', hero_none: 'no feed logged yet', hero_last: 'last', hero_hrs: 'h',
  doc_title: 'For the pediatrician', doc_sub: 'Everything the visit will ask, in one copy.', doc_24h: 'Last 24 hours', doc_7d: 'Last 7 days', doc_copy: 'Copy for the appointment', doc_feeds: 'Feeds', doc_nursing: 'nursing', doc_bottle: 'bottle', doc_wet: 'Wet diapers', doc_dirty: 'Dirty diapers', doc_stretch: 'Longest stretch between feeds', doc_sides: 'Left vs right', doc_since: 'Since last feed', doc_sleep: 'Sleep', doc_day: 'Day', doc_min: 'Nursing min', doc_avg: 'avg', doc_lastFeed: 'Last feed', doc_lastWet: 'Last wet diaper', doc_lastDirty: 'Last dirty diaper', doc_growth: 'Latest measurements', doc_vax: 'Vaccines given', doc_none: 'none yet', doc_backfill: 'Sep 1–6 are daily totals carried over from the previous app.',
  tot_backfill: 'totals from the previous app',
  sync_chip: 'Sync', dl_title: 'Copy the file', dl_sub: 'This page cannot save files to your phone, so here is the content. Copy it and paste it wherever you keep it.', sync_or: 'or send yours', sync_link: 'Send my log as a link', sync_linkSub: 'Send this on WhatsApp. Whoever opens it taps Paste and everything merges.', sync_pasteBtn: 'Paste from clipboard', sync_pasteFail: 'Nothing to paste. Copy the message first, then tap Paste.', sync_wa: 'Send on WhatsApp',
  sync_title: 'Sync with the other phone', sync_sub: 'No account needed. Copy the log as text, send it on WhatsApp, and paste it on the other phone. Entries merge by id, so pasting twice never duplicates.', sync_copy: 'Copy sync text', sync_paste: 'Paste sync text', sync_range3: 'last 3 days', sync_range7: 'last 7 days', sync_rangeAll: 'everything', sync_pasteSub: 'Paste the text that starts with GONZALO-SYNC-1.', sync_merge: 'Merge', sync_done: '{a} added, {u} updated{from}', sync_from: ' from {who}', sync_bad: 'That does not look like a sync text.', sync_hint: 'Send this to the other phone and paste it there under Settings, Paste sync text.',
  public_chip: 'Family edition', public_tip: 'This phone keeps its own log. Use Settings, Sync with the other phone to exchange entries with Jose\'s phone.',
  months_short: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
},
es: {
  appName: 'Los días de Gonzalo', tagline: 'Un solo registro para todos los que lo quieren.',
  nav_today: 'Hoy', nav_log: 'Registro', nav_growth: 'Crecimiento', nav_guide: 'Guía', nav_health: 'Salud',
  age_wd: '{w} sem {d} d', age_wd_long: '{w} semanas y {d} días', age_md: '{m} m {d} d', age_md_long: '{m} meses y {d} días', age_days: '{n} días',
  born: 'nació el {date}', today: 'Hoy', yesterday: 'Ayer',
  sync_live: 'Sincronizado', sync_local: 'Solo este dispositivo', sync_connecting: 'Conectando…', sync_readonly: 'Solo lectura', sync_error: 'No se guardó',
  sync_live_tip: 'Todos los que abren este enlace ven el mismo registro, en directo.', sync_local_tip: 'Las entradas se guardan solo en este navegador. Abre el enlace compartido en claude.ai para sincronizar.',
  who: '¿Quién registra?', who_sub: 'Cada entrada lleva el nombre de quien la anotó, así Minerva sabe qué hizo Jose a las 3 de la mañana.', who_other: 'Otra persona', who_name: 'Nombre', who_save: 'Empezar',
  now_lastFeed: 'Última toma', now_awake: 'Despierto', now_asleep: 'Dormido', now_lastDiaper: 'Último pañal', now_none: 'Nada aún',
  now_ago: 'hace {t}', now_nap: 'Siesta ~{a}–{b}', now_napOpen: 'Ventana de siesta hasta ~{b}', now_napPast: 'Pasó la ventana típica', now_napHint: 'Registra un sueño para estimar la siesta', now_since: 'desde {t}',
  side_L: 'Izquierdo', side_R: 'Derecho', side_both: 'Ambos', bottle: 'Biberón', solids: 'Sólidos', breast: 'Pecho',
  next_side: 'siguiente: {s}', typical_feed: 'típico: cada {x}',
  act_L: 'Izq.', act_R: 'Der.', act_bottle: 'Biberón', act_sleep: 'Sueño', act_wet: 'Pipí', act_dirty: 'Caca', act_pump: 'Extraer', act_more: 'Más', act_stop: 'Toca para parar', act_wake: 'Toca al despertar',
  tot_feeds: 'Tomas', tot_sleep: 'Sueño', tot_diapers: 'Pañales', tot_breast: 'pecho', tot_naps: 'siestas', tot_wet: 'pipí', tot_dirty: 'caca', tot_typical: 'típico {x}', tot_wetTarget: 'meta ≥6 con pipí',
  ribbon_title: '24 horas', ribbon_sub: 'hora de Miami', leg_sleep: 'Sueño', leg_feed: 'Toma', leg_diaper: 'Pañal', leg_care: 'Cuidados', now_marker: 'ahora',
  entries: 'Entradas', entries_empty: 'Nada registrado todavía. Toca un botón arriba y aparecerá aquí.', running: 'en curso', vitd_done: 'Vitamina D dada', vitd_not: 'Vitamina D sin registrar hoy',
  e_feed: 'Toma', e_sleep: 'Sueño', e_diaper: 'Pañal', e_pump: 'Extracción', e_care: 'Cuidados',
  d_wet: 'Pipí', d_dirty: 'Caca', d_both: 'Pipí + caca', d_dry: 'Seco',
  c_tummy: 'Boca abajo', c_bath: 'Baño', c_vitd: 'Vitamina D', c_meds: 'Medicamento', c_temp: 'Temperatura', c_note: 'Nota',
  f_amount: 'Cantidad', f_time: 'Hora', f_start: 'Inicio', f_end: 'Fin', f_dur: 'Duración', f_note: 'Nota', f_side: 'Lado', f_type: 'Tipo', f_minutes: 'Minutos', f_stillRunning: 'todavía en curso',
  save: 'Guardar', cancel: 'Cancelar', delete: 'Borrar', edit: 'Editar', close: 'Cerrar', add: 'Añadir', done: 'Listo', undo: 'Deshacer', back: 'Volver',
  logged: '{x} registrado', deleted: 'Borrado', saved: 'Guardado', copied: 'Copiado', fail_save: 'No se pudo guardar. Revisa la conexión e inténtalo de nuevo.',
  sh_bottle: 'Biberón', sh_pump: 'Extracción', sh_care: 'Cuidados y notas', sh_edit: 'Editar entrada', sh_diaper: 'Pañal', sh_sleep: 'Sueño', sh_breast: 'Pecho', sh_growth: 'Nueva medida', sh_settings: 'Ajustes', sh_vax: 'Marcar como puesta', sh_ped: 'Pediatra', sh_share: 'Compartir el día', sh_visit: 'Revisión',
  log_title: 'Registro', log_share: 'Compartir', log_export: 'Exportar CSV', log_backup: 'Copia', log_days: 'días registrados', log_pick: 'Elegir día',
  share_copy: 'Copiar texto', share_wa: 'WhatsApp', share_native: 'Compartir…', share_sub: 'Un resumen en texto para el grupo de la familia.',
  sum_feeds: 'Tomas', sum_sleep: 'Sueño', sum_diapers: 'Pañales', sum_last: 'Última toma', sum_growth: 'Última medida', sum_vitd: 'Vitamina D',
  g_title: 'Crecimiento', g_weight: 'Peso', g_length: 'Talla', g_head: 'Cabeza', g_add: 'Añadir medida', g_date: 'Fecha', g_pct: 'percentil {p}', g_empty: 'Sin medidas todavía. Añade el peso al nacer de los papeles del hospital y luego cada visita al pediatra.', g_who: 'Patrones de crecimiento de la OMS, niños, 0–24 meses. Bandas: percentiles 3, 15, 50, 85 y 97.', g_table: 'Tabla', g_chart: 'Gráfico', g_latest: 'Última', g_ageAt: 'a los {age}', g_z: 'puntuación z', g_range3: '3 m', g_range6: '6 m', g_range12: '1 año', g_range24: '2 años', g_bw: 'Peso al nacer', g_since: 'desde el nacimiento', g_noBw: 'añade el peso al nacer para ver la ganancia', g_hint: 'Con el peso de cada visita al pediatra basta. Allí suelen medir también la talla y el perímetro cefálico.', g_hover: 'Toca un punto para ver su percentil.',
  gu_title: 'Guía', gu_thisWeek: 'Esta semana', gu_at: 'Gonzalo a los {age}', gu_sleep: 'Sueño', gu_feed: 'Alimentación', gu_diapers: 'Pañales', gu_dev: 'En qué está trabajando', gu_watch: 'Llama al pediatra si', gu_tips: 'Consejos para esta etapa', gu_next: 'Próximamente', gu_ms: 'Hitos a los {age}', gu_msSub: 'Lista de los CDC «Aprenda los signos. Reaccione pronto». La mayoría de los niños (75 % o más) los hacen a esta edad. Marca lo que hayas visto. Si faltan varios al llegar al control, coméntalo en la visita.', gu_msCat_se: 'Social / emocional', gu_msCat_lc: 'Lenguaje / comunicación', gu_msCat_cg: 'Cognitivo', gu_msCat_mv: 'Movimiento / físico', gu_norms: 'Rangos típicos, no metas.', gu_wake: 'Ventana de vigilia', gu_total: 'Sueño total', gu_naps: 'Siestas', gu_ww_src: 'Las ventanas de vigilia son cifras habituales en fuentes de sueño infantil, no un estándar clínico.', gu_showing: 'Mostrando', gu_currentAge: 'su edad ahora', gu_nextVisit: 'Próxima revisión', gu_nextShots: 'Próximas vacunas',
  h_title: 'Salud', h_vax: 'Vacunas', h_vaxSub: 'Calendario AAP 2026 con fechas calculadas desde su cumpleaños. Donde el calendario de los CDC (ene. 2026) pasa una vacuna a decisión compartida en vez de rutinaria, se indica. Marca cada dosis cuando se la pongan.', h_visits: 'Revisiones del niño sano', h_visitsSub: 'Calendario Bright Futures / AAP.', h_ped: 'Pediatra', h_pedName: 'Nombre / consulta', h_pedPhone: 'Teléfono', h_pedNotes: 'Notas (portal, dirección, línea de urgencias)', h_pedEmpty: 'Añade al pediatra para que cualquiera con la app pueda llamar.', h_call: 'Llamar', h_given: 'Puesta', h_givenOn: 'puesta el {date}', h_due: 'toca el {date}', h_window: '{a} – {b}', h_overdue: 'fuera de ventana', h_soon: 'pronto', h_scdm: 'CDC: decisión compartida', h_routine: 'rutinaria', h_dateGiven: 'Fecha', h_where: 'Dónde / lote (opcional)', h_shots: 'Florida SHOTS', h_shotsText: 'Florida SHOTS es el registro estatal de vacunas, gratuito. Pide al pediatra el formulario certificado DH 680, el certificado que exigen las guarderías con licencia en Florida antes de entrar.', h_disclaimer: 'Calendarios compilados el 7 sep 2026 a partir de informes de los CDC, la AAP y el DOH de Florida. Confirma cada dosis con el pediatra: es una lista de control, no consejo médico.', h_rsv: 'Anticuerpo VRS (nirsevimab o clesrovimab)', h_rsvNote: 'Una dosis al entrar en su primera temporada de VRS si Minerva no recibió la vacuna materna del VRS en el embarazo. En el sur de Florida la temporada es más larga que la ventana nacional oct–mar; pregunta al pediatra cuándo ponerla.', h_temp: 'Temperatura', h_tempSub: 'Con menos de 3 meses, una temperatura rectal de 38 °C (100,4 °F) o más obliga a llamar ya.', h_tempLog: 'Registrar temperatura', h_tempAlert: '{t} registrada {ago}. Con menos de 3 meses hay que llamar al pediatra ahora.', h_visitDone: 'hecha el {date}', h_markVisit: 'Marcar hecha', h_visitAt: 'a los {age}',
  ask_title: 'Pregunta sobre hoy', ask_sub: 'Envía al modelo rápido de Claude las últimas 24 horas del registro y su edad, y responde aquí. No es consejo médico; nada sustituye al pediatra.', ask_ph: 'p. ej. ¿Es normal su patrón de tomas a las 3 semanas?', ask_send: 'Preguntar', ask_thinking: 'Pensando…', ask_p1: 'Resume las últimas 24 horas para el pediatra', ask_p2: '¿Cómo va su sueño para su edad?', ask_p3: '¿Come con suficiente frecuencia?', ask_err: 'No se pudo obtener respuesta ahora.',
  s_title: 'Ajustes', s_lang: 'Idioma', s_units: 'Unidades', s_vol: 'Volumen', s_wt: 'Peso', s_len: 'Talla', s_temp: 'Temperatura', s_who: 'Yo soy', s_caregivers: 'Cuidadores', s_addCg: 'Añadir cuidador', s_merge: 'Copiar las entradas sin conexión de este dispositivo al registro compartido', s_merged: '{n} entradas copiadas', s_about: 'Acerca de', s_aboutText: 'Hecha para Gonzalo Bedoya Fuentes, nacido el 17 de agosto de 2026 a las 11:39 en el Mount Sinai Medical Center, Miami Beach. Las horas se muestran siempre en hora de Miami, desde donde la abras. Los percentiles vienen de los patrones de crecimiento de la OMS. La guía sigue a la AAP, los CDC y la OMS; los rangos típicos no son metas.', s_sources: 'Fuentes', s_theme: 'Tema', s_restore: 'Restaurar copia', s_restoreSub: 'Elige un .json exportado desde esta app.',
  units_ml: 'ml', units_oz: 'oz', units_kg: 'kg', units_lb: 'lb', units_cm: 'cm', units_in: 'in',
  wk: 'sem', mo: 'm', d: 'd', h: 'h', min: 'min',
  dur_short: '{h} h {m} min',
  foot_1: 'Horas de Miami (America/New_York). Los rangos típicos vienen de la AAP, los CDC, la OMS y referencias habituales de sueño; son contexto, no metas, y nunca sustituyen al pediatra.',
  foot_2: 'Hecha para Gonzalo. Con cariño, su papá, con Claude.',
  ro_banner: 'Puedes ver este registro pero no añadir entradas.',
  chart_age: 'Edad', chart_days: 'días', chart_months: 'meses', chart_p: 'percentil',
  log_day: 'Día', log_patterns: 'Patrones', pat_rhythm: 'Ritmo diario', pat_rhythmSub: 'cuándo pasan las cosas · hora de Miami', pat_totals: 'Totales diarios', pat_stretch: 'Tramo más largo sin toma', pat_longest: 'récord', pat_side: 'Equilibrio de lados', pat_night: 'noche', pat_totalsOnly: 'solo totales', pat_sleepHours: 'Horas de sueño', pat_empty: 'Los patrones aparecen cuando hay varios días registrados.', pat_avg: 'media', pat_feeds: 'tomas', pat_wet: 'pipí', pat_dirty: 'caca', pat_sleep: 'sueño', pat_left: 'Izquierdo', pat_right: 'Derecho', pat_noSides: 'Aún no hay tomas de pecho cronometradas en este rango.',
  hero_since: 'desde la última toma', hero_nursing: 'mamando ahora', hero_next: 'siguiente lado', hero_none: 'ninguna toma registrada', hero_last: 'última', hero_hrs: 'h',
  doc_title: 'Para el pediatra', doc_sub: 'Todo lo que preguntan en la visita, en una copia.', doc_24h: 'Últimas 24 horas', doc_7d: 'Últimos 7 días', doc_copy: 'Copiar para la cita', doc_feeds: 'Tomas', doc_nursing: 'pecho', doc_bottle: 'biberón', doc_wet: 'Pañales con pipí', doc_dirty: 'Pañales con caca', doc_stretch: 'Tramo más largo entre tomas', doc_sides: 'Izquierdo vs derecho', doc_since: 'Desde la última toma', doc_sleep: 'Sueño', doc_day: 'Día', doc_min: 'Min pecho', doc_avg: 'media', doc_lastFeed: 'Última toma', doc_lastWet: 'Último pañal con pipí', doc_lastDirty: 'Último pañal con caca', doc_growth: 'Últimas medidas', doc_vax: 'Vacunas puestas', doc_none: 'ninguna aún', doc_backfill: 'Del 1 al 6 de sept. son totales diarios traídos de la app anterior.',
  tot_backfill: 'totales de la app anterior',
  sync_chip: 'Sincronizar', dl_title: 'Copiar el archivo', dl_sub: 'Esta página no puede guardar archivos en el móvil, así que aquí tienes el contenido. Cópialo y pégalo donde lo guardes.', sync_or: 'o envía el tuyo', sync_link: 'Enviar mi registro como enlace', sync_linkSub: 'Envíalo por WhatsApp. Quien lo abra toca Pegar y todo se combina.', sync_pasteBtn: 'Pegar del portapapeles', sync_pasteFail: 'No hay nada que pegar. Copia el mensaje primero y toca Pegar.', sync_wa: 'Enviar por WhatsApp',
  sync_title: 'Sincronizar con el otro móvil', sync_sub: 'Sin cuenta. Copia el registro como texto, envíalo por WhatsApp y pégalo en el otro móvil. Las entradas se combinan por id, así que pegar dos veces nunca duplica.', sync_copy: 'Copiar texto de sincronización', sync_paste: 'Pegar texto de sincronización', sync_range3: 'últimos 3 días', sync_range7: 'últimos 7 días', sync_rangeAll: 'todo', sync_pasteSub: 'Pega el texto que empieza por GONZALO-SYNC-1.', sync_merge: 'Combinar', sync_done: '{a} añadidas, {u} actualizadas{from}', sync_from: ' de {who}', sync_bad: 'Eso no parece un texto de sincronización.', sync_hint: 'Envía esto al otro móvil y pégalo allí en Ajustes, Pegar texto de sincronización.',
  public_chip: 'Edición familiar', public_tip: 'Este móvil guarda su propio registro. Usa Ajustes, Sincronizar con el otro móvil para intercambiar entradas con el móvil de Jose.',
  months_short: ['ene','feb','mar','abr','may','jun','jul','ago','sept','oct','nov','dic'],
}};

/* ---------------- wake windows (commonly cited; minutes) ---------------- */
const WAKE = [
  { maxDays: 28,  min: 35,  max: 60 },
  { maxDays: 60,  min: 45,  max: 90 },
  { maxDays: 90,  min: 60,  max: 120 },
  { maxDays: 120, min: 75,  max: 150 },
  { maxDays: 180, min: 105, max: 180 },
  { maxDays: 270, min: 150, max: 210 },
  { maxDays: 365, min: 180, max: 240 },
  { maxDays: 540, min: 195, max: 300 },
  { maxDays: 9999,min: 240, max: 360 },
];
function wakeFor(days){ return WAKE.find(w => days < w.maxDays) || WAKE[WAKE.length - 1]; }

/* ---------------- age guide bands ---------------- */
const B = (en, es) => ({ en, es });
const GUIDE = [
  { from: 0, to: 13, title: B('Newborn: the first two weeks', 'Recién nacido: las dos primeras semanas'),
    sleep: B('14–17 h a day in short stretches. Awake 35–60 min at a time, then back down. No day–night rhythm yet.', '14–17 h al día en tramos cortos. Despierto 35–60 min seguidos y vuelta a dormir. Aún no distingue día y noche.'),
    feed: B('Breast 8–12 times in 24 h, every 2–3 h, including at night. Formula: 2–3 oz (60–90 ml) every 3–4 h. Wake him if he sleeps past 4 h until he is back to birth weight.', 'Pecho 8–12 veces en 24 h, cada 2–3 h, también de noche. Fórmula: 60–90 ml cada 3–4 h. Despiértalo si pasan 4 h sin comer hasta que recupere el peso del nacimiento.'),
    diapers: B('After day 5, at least 6 wet diapers a day and 3 or more yellow, seedy stools.', 'A partir del día 5, al menos 6 pañales con pipí al día y 3 o más deposiciones amarillas y grumosas.'),
    dev: ['Regaining birth weight by 2 weeks|Recuperar el peso del nacimiento a las 2 semanas', 'Turning toward voices and breast|Girarse hacia las voces y el pecho', 'Brief eye contact in a quiet alert state|Contacto visual breve cuando está tranquilo y alerta', 'Startle (Moro) reflex is normal|El reflejo de sobresalto (Moro) es normal'],
    watch: ['Rectal temperature ≥100.4 °F (38 °C) or below 97.7 °F (36.5 °C)|Temperatura rectal ≥38 °C (100,4 °F) o menor de 36,5 °C', 'Fewer than 6 wet diapers a day after day 5|Menos de 6 pañales con pipí al día tras el día 5', 'Yellowing of skin or eyes that spreads or deepens|Piel u ojos amarillos que se extienden o se intensifican', 'Refuses two feeds in a row, or is too sleepy to feed|Rechaza dos tomas seguidas o está demasiado dormido para comer', 'Fast, labored breathing or a blue tinge around the lips|Respiración rápida o con esfuerzo, o labios azulados'],
    tips: ['Back to sleep, alone, on a firm flat surface, in your room. No pillows, bumpers or blankets.|Boca arriba, solo, en superficie firme y plana, en vuestra habitación. Sin almohadas, protectores ni mantas.', 'Vitamin D 400 IU daily if he is breastfed.|Vitamina D 400 UI al día si toma pecho.', 'Alternate the starting breast; the app suggests the next side.|Alterna el pecho con el que empiezas; la app sugiere el siguiente.', 'Tummy time a few minutes, 2–3 times a day, while awake and watched.|Boca abajo unos minutos, 2–3 veces al día, despierto y vigilado.'] },
  { from: 14, to: 41, title: B('Weeks 2 to 6: settling in', 'Semanas 2 a 6: acomodándose'),
    sleep: B('Still 14–17 h a day. Wake windows 35–60 min, stretching toward 60–90 by week 6. Longest night stretch may reach 3–4 h.', 'Sigue con 14–17 h al día. Ventanas de vigilia de 35–60 min, que se alargan a 60–90 hacia la semana 6. El tramo nocturno más largo puede llegar a 3–4 h.'),
    feed: B('Breast on demand, typically every 2–3 h (8–12 feeds). Formula: by one month 3–4 oz (90–120 ml) every 3–4 h. Growth spurts around 2–3 and 6 weeks bring a day or two of near-constant feeding.', 'Pecho a demanda, típicamente cada 2–3 h (8–12 tomas). Fórmula: al mes, 90–120 ml cada 3–4 h. Los estirones hacia las 2–3 y 6 semanas traen uno o dos días de tomas casi continuas.'),
    diapers: B('6 or more wet a day. Stools vary widely; breastfed babies may go several times a day or, after 6 weeks, several days between.', '6 o más con pipí al día. Las deposiciones varían mucho; con pecho puede hacer varias al día o, pasadas 6 semanas, pasar varios días sin hacer.'),
    dev: ['First social smiles, usually by 6–8 weeks|Primeras sonrisas sociales, normalmente hacia las 6–8 semanas', 'Lifting the head briefly on tummy|Levantar la cabeza un momento boca abajo', 'Following a face or a high-contrast object with the eyes|Seguir una cara o un objeto de alto contraste con la mirada', 'Crying tends to peak around 6 weeks, then eases|El llanto suele alcanzar su máximo hacia las 6 semanas y luego mejora'],
    watch: ['Rectal temperature ≥100.4 °F (38 °C) at any point under 3 months|Temperatura rectal ≥38 °C (100,4 °F) en cualquier momento antes de los 3 meses', 'Not back to birth weight by 2–3 weeks|No recupera el peso del nacimiento a las 2–3 semanas', 'Fewer than 6 wet diapers a day|Menos de 6 pañales con pipí al día', 'Forceful (projectile) vomiting after feeds|Vómitos con fuerza (en proyectil) tras las tomas', 'Inconsolable crying for hours, or unusual floppiness|Llanto inconsolable durante horas o flacidez inusual'],
    tips: ['Start a short, repeatable bedtime routine now; the rhythm comes later.|Empieza ya una rutina corta y repetible para dormir; el ritmo llegará después.', 'Bright light and activity by day, dim and boring at night, helps set his clock.|Luz y actividad de día, penumbra y aburrimiento de noche, ayudan a ajustar su reloj.', 'A pacifier at sleep time is fine once breastfeeding is established.|El chupete para dormir está bien una vez asentada la lactancia.', 'The 1-month well visit checks weight and jaundice. Bring this app.|La revisión del mes revisa peso e ictericia. Lleva esta app.'] },
  { from: 42, to: 89, title: B('6 weeks to 3 months: smiles and patterns', '6 semanas a 3 meses: sonrisas y patrones'),
    sleep: B('About 14–17 h. Wake windows 60–90 min, up to 2 h by 3 months. 4–5 naps. Night sleep starts to consolidate; a 4–6 h stretch is common by 3 months.', 'Unas 14–17 h. Ventanas de vigilia de 60–90 min, hasta 2 h a los 3 meses. 4–5 siestas. El sueño nocturno empieza a consolidarse; un tramo de 4–6 h es habitual a los 3 meses.'),
    feed: B('Breast roughly every 2–3 h by day, often longer at night. Formula: 4–5 oz (120–150 ml) every 3–4 h, about 24–32 oz a day. The rule of thumb is 2.5 oz per pound of weight per day, never more than 32 oz.', 'Pecho más o menos cada 2–3 h de día, a menudo más espaciado de noche. Fórmula: 120–150 ml cada 3–4 h, unos 700–950 ml al día. La regla es 75 ml por cada 450 g de peso al día, nunca más de 950 ml.'),
    diapers: B('6 or more wet. Stool frequency drops for many breastfed babies; soft stools are what matter, not the count.', '6 o más con pipí. Con pecho, muchas veces baja la frecuencia de deposiciones; lo importante es que sean blandas, no cuántas.'),
    dev: ['Smiles at you and coos back when you talk|Sonríe y responde con gorjeos cuando le hablas', 'Holds his head up on tummy; steadier when held|Sostiene la cabeza boca abajo; más estable en brazos', 'Watches you move and follows objects side to side|Te sigue con la mirada y sigue objetos de lado a lado', 'Discovers his hands and brings them to his mouth|Descubre sus manos y se las lleva a la boca'],
    watch: ['Rectal temperature ≥100.4 °F (38 °C) under 3 months|Temperatura rectal ≥38 °C (100,4 °F) antes de los 3 meses', 'Does not smile at people or watch things move by 2 months|No sonríe a las personas ni sigue cosas con la mirada a los 2 meses', 'Cannot hold his head up on tummy by 2 months|No sostiene la cabeza boca abajo a los 2 meses', 'Fewer wet diapers, dark urine, or a sunken soft spot|Menos pañales mojados, orina oscura o fontanela hundida'],
    tips: ['The 2-month visit (17 Oct) brings the first big round of vaccines. Expect a fussy day; feed and hold him more.|La revisión de los 2 meses (17 oct) trae la primera tanda grande de vacunas. Espera un día inquieto; más tomas y más brazos.', 'Put him down drowsy but awake sometimes so he practices settling.|Acuéstalo a veces somnoliento pero despierto para que practique dormirse.', 'Tummy time can grow to 15–30 min total a day.|El tiempo boca abajo puede llegar a 15–30 min en total al día.', 'Talk and sing in both languages; he is sorting the sounds of Spanish and English already.|Háblale y cántale en los dos idiomas; ya está separando los sonidos del español y del inglés.'] },
  { from: 90, to: 119, title: B('3 to 4 months: the big stretch', '3 a 4 meses: el gran cambio'),
    sleep: B('Wake windows 75 min to 2 h. 3–4 naps. Many babies sleep a 6 h stretch at night; a temporary regression around 4 months as sleep cycles mature is common.', 'Ventanas de vigilia de 75 min a 2 h. 3–4 siestas. Muchos duermen un tramo de 6 h de noche; es común una regresión pasajera hacia los 4 meses al madurar los ciclos de sueño.'),
    feed: B('Breast 6–8 times a day, feeds get faster. Formula 5–6 oz (150–180 ml) every 4 h or so. No solids, water or juice yet.', 'Pecho 6–8 veces al día, tomas más rápidas. Fórmula 150–180 ml cada 4 h aproximadamente. Aún sin sólidos, agua ni zumos.'),
    diapers: B('5–6+ wet. Drooling starts; that is not teething yet.', '5–6 o más con pipí. Empieza a babear; eso aún no son los dientes.'),
    dev: ['Laughs and chuckles; makes sounds to get your attention|Ríe y hace sonidos para llamar tu atención', 'Holds head steady; pushes up on forearms|Cabeza firme; se apoya en los antebrazos', 'Swats at and holds a toy briefly|Manotea y sostiene un juguete un momento', 'May roll tummy to back|Puede girar de boca abajo a boca arriba'],
    watch: ['Does not watch things as they move, or does not smile at people|No sigue cosas con la mirada o no sonríe a las personas', 'Cannot hold head steady by 4 months|No sostiene la cabeza firme a los 4 meses', 'Does not make cooing sounds|No hace sonidos de gorjeo', 'Fever ≥100.4 °F (38 °C) that lasts more than 24 h, or with a rash|Fiebre ≥38 °C que dura más de 24 h, o con erupción'],
    tips: ['Consistent nap and bedtime routines pay off now.|Las rutinas de siesta y noche empiezan a rendir ahora.', 'Ask about iron: exclusively breastfed babies are often started on an iron supplement around 4 months.|Pregunta por el hierro: a los bebés con pecho exclusivo suelen darles suplemento hacia los 4 meses.', 'Remove mobiles and hanging toys he can now reach.|Retira móviles y juguetes colgantes que ya alcanza.', 'The 4-month visit (17 Dec): second round of vaccines.|La revisión de los 4 meses (17 dic): segunda tanda de vacunas.'] },
  { from: 120, to: 179, title: B('4 to 6 months: reaching out', '4 a 6 meses: alcanzando el mundo'),
    sleep: B('12–16 h a day including naps. Wake windows 1.5–2.5 h; 3 naps. A predictable schedule usually emerges.', '12–16 h al día con siestas. Ventanas de vigilia de 1,5–2,5 h; 3 siestas. Suele aparecer un horario predecible.'),
    feed: B('Breast 5–7 times a day. Formula 6–8 oz (180–240 ml), 4–5 times a day. Solids start around 6 months, when he sits with support and shows interest.', 'Pecho 5–7 veces al día. Fórmula 180–240 ml, 4–5 veces al día. Los sólidos empiezan hacia los 6 meses, cuando se sienta con apoyo y muestra interés.'),
    diapers: B('5+ wet. Stools change color and smell once solids begin.', '5 o más con pipí. Las deposiciones cambian de color y olor al empezar los sólidos.'),
    dev: ['Rolls both ways; pushes up with straight arms|Gira en ambos sentidos; se levanta con los brazos estirados', 'Reaches for and grabs toys; everything goes to the mouth|Alcanza y agarra juguetes; todo va a la boca', 'Blows raspberries, squeals, takes turns with sounds|Hace pedorretas, chilla, alterna sonidos contigo', 'Knows familiar people; likes the mirror|Reconoce a los suyos; le gusta el espejo'],
    watch: ['Does not roll in either direction by 6 months|No gira en ninguna dirección a los 6 meses', 'Does not reach for things or bring them to the mouth|No alcanza cosas ni se las lleva a la boca', 'Seems very stiff or very floppy|Está muy rígido o muy flácido', 'Fever with poor drinking, few wet diapers, or unusual sleepiness|Fiebre con poca ingesta, pocos pañales mojados o somnolencia inusual'],
    tips: ['Babyproof at floor level before he moves.|Asegura la casa a ras de suelo antes de que se desplace.', 'Introduce one new food at a time; include peanut and egg early unless the pediatrician says otherwise.|Introduce un alimento nuevo cada vez; incluye cacahuete y huevo pronto salvo indicación del pediatra.', 'Flu shot from 6 months: two doses 4 weeks apart the first season.|Vacuna de la gripe desde los 6 meses: dos dosis con 4 semanas de diferencia la primera temporada.', 'The 6-month visit (17 Feb 2027): third round of vaccines.|La revisión de los 6 meses (17 feb 2027): tercera tanda de vacunas.'] },
  { from: 180, to: 269, title: B('6 to 9 months: sitting, sounds, solids', '6 a 9 meses: sentarse, sonidos y sólidos'),
    sleep: B('12–16 h total. Wake windows 2–3 h; 2–3 naps. Night wakings for comfort are common; separation anxiety begins.', '12–16 h en total. Ventanas de vigilia de 2–3 h; 2–3 siestas. Son comunes los despertares por consuelo; empieza la ansiedad por separación.'),
    feed: B('Milk stays the main food: breast 4–6 times or formula 24–32 oz. Solids once, then twice a day, moving from purées to soft finger foods. No honey before 12 months. Sips of water with meals.', 'La leche sigue siendo lo principal: pecho 4–6 veces o fórmula 700–950 ml. Sólidos una y luego dos veces al día, de purés a trocitos blandos. Nada de miel antes de los 12 meses. Sorbos de agua con las comidas.'),
    diapers: B('Firmer stools with solids. Constipation shows as hard pellets, not as fewer stools.', 'Deposiciones más firmes con los sólidos. El estreñimiento se ve en bolitas duras, no en menos deposiciones.'),
    dev: ['Sits without support; gets into sitting alone|Se sienta sin apoyo; llega a sentarse solo', 'Passes objects hand to hand; rakes food with fingers|Pasa objetos de una mano a otra; rastrilla la comida con los dedos', 'Babbles "mamamama", "bababa"; responds to his name|Balbucea «mamamama», «bababa»; responde a su nombre', 'Looks for a dropped toy; may be shy with strangers|Busca un juguete caído; puede ser tímido con desconocidos'],
    watch: ['Does not sit with help by 9 months|No se sienta con ayuda a los 9 meses', 'Does not babble or respond to his name|No balbucea ni responde a su nombre', 'Does not bear weight on legs with support|No apoya peso en las piernas con ayuda', 'Fever ≥104 °F (40 °C), or any fever with a stiff neck, rash or trouble breathing|Fiebre ≥40 °C, o cualquier fiebre con rigidez de cuello, erupción o dificultad para respirar'],
    tips: ['Gates on stairs, latches on cabinets, cords out of reach.|Barreras en escaleras, cierres en armarios, cables fuera del alcance.', 'Read the same books daily, in Spanish and English.|Lee los mismos libros cada día, en español y en inglés.', 'Offer a cup with water at meals to practice.|Ofrece un vaso con agua en las comidas para practicar.', 'The 9-month visit (17 May 2027) includes a developmental screening.|La revisión de los 9 meses (17 may 2027) incluye un cribado del desarrollo.'] },
  { from: 270, to: 364, title: B('9 to 12 months: on the move', '9 a 12 meses: en movimiento'),
    sleep: B('12–16 h total. Wake windows 2.5–4 h; 2 naps. Night sleep 10–12 h is typical.', '12–16 h en total. Ventanas de vigilia de 2,5–4 h; 2 siestas. Lo típico es dormir 10–12 h de noche.'),
    feed: B('Three meals plus snacks of family food, chopped small. Breast 3–5 times or formula 16–24 oz. Cup skills improve; the bottle winds down by 12–18 months.', 'Tres comidas más tentempiés de comida familiar en trocitos. Pecho 3–5 veces o fórmula 470–700 ml. Mejora con el vaso; el biberón se retira entre los 12 y 18 meses.'),
    diapers: B('Fewer, more formed stools. Diaper changes get acrobatic.', 'Menos deposiciones y más formadas. Los cambios de pañal se vuelven acrobáticos.'),
    dev: ['Crawls, pulls to stand, cruises along furniture|Gatea, se pone de pie agarrado, se desplaza por los muebles', 'Pincer grasp: picks up small bits of food|Pinza: coge trocitos pequeños de comida', 'Waves bye-bye, plays peek-a-boo, says "mama" or "dada"|Dice adiós con la mano, juega al cucú, dice «mamá» o «papá»', 'Understands "no"; looks for hidden things|Entiende «no»; busca cosas escondidas'],
    watch: ['Does not crawl or bear weight on legs by 12 months|No gatea ni apoya peso en las piernas a los 12 meses', 'Does not say single words like "mama" or point|No dice palabras sueltas como «mamá» ni señala', 'Loses skills he once had|Pierde habilidades que ya tenía'],
    tips: ['Anchor furniture and TVs; he will climb.|Ancla muebles y televisores; va a trepar.', 'Whole milk and the MMR, varicella, hepatitis A and booster shots come at the 12-month visit (17 Aug 2027).|La leche entera y las vacunas triple vírica, varicela, hepatitis A y refuerzos llegan en la revisión de los 12 meses (17 ago 2027).', 'First dentist visit by the first tooth or first birthday.|Primera visita al dentista con el primer diente o al cumplir un año.', 'Two US, Spanish and Bolivian passports later: renew the Spanish one around 2028.|Pasaportes: el español caduca a los 2 años, renovar hacia 2028.'] },
  { from: 365, to: 546, title: B('12 to 18 months: first steps, first words', '12 a 18 meses: primeros pasos, primeras palabras'),
    sleep: B('11–14 h a day. Wake windows 3–5 h; 2 naps merging into 1 around 15–18 months.', '11–14 h al día. Ventanas de vigilia de 3–5 h; de 2 siestas a 1 hacia los 15–18 meses.'),
    feed: B('Family meals, whole milk 16–24 oz a day (or continued breastfeeding), water in a cup. Appetite drops as growth slows; that is normal.', 'Comidas familiares, leche entera 470–700 ml al día (o seguir con pecho), agua en vaso. El apetito baja al frenarse el crecimiento; es normal.'),
    diapers: B('One or two stools a day is common. Signs of readiness for the potty come later, around 2.', 'Una o dos deposiciones al día es lo común. Las señales para el orinal llegan más tarde, hacia los 2.'),
    dev: ['Walks alone; climbs on furniture|Camina solo; trepa a los muebles', 'Says 3–10 words; follows one-step directions|Dice 3–10 palabras; sigue órdenes de un paso', 'Points to show you things; copies chores|Señala para enseñarte cosas; imita tareas', 'Scribbles, stacks two blocks, uses a spoon|Garabatea, apila dos bloques, usa la cuchara'],
    watch: ['Not walking by 18 months|No camina a los 18 meses', 'Fewer than 6 words by 18 months, or no pointing|Menos de 6 palabras a los 18 meses, o no señala', 'Does not notice or mind when a caregiver leaves or returns|No nota ni le importa cuando un cuidador se va o vuelve'],
    tips: ['Screen time: none before 18 months except video calls with the abuelos.|Pantallas: ninguna antes de los 18 meses salvo videollamadas con los abuelos.', 'The 15-month (17 Nov 2027) and 18-month (17 Feb 2028) visits finish the toddler vaccine series and repeat the developmental screening.|Las revisiones de los 15 (17 nov 2027) y 18 meses (17 feb 2028) completan las vacunas del segundo año y repiten el cribado del desarrollo.', 'Keep both languages going: bilingual toddlers may mix, and that is expected.|Sigue con los dos idiomas: los niños bilingües los mezclan, y es lo esperado.'] },
  { from: 547, to: 9999, title: B('18 to 24 months: a small person', '18 a 24 meses: una personita'),
    sleep: B('11–14 h a day. Wake windows 4–6 h; one afternoon nap.', '11–14 h al día. Ventanas de vigilia de 4–6 h; una siesta por la tarde.'),
    feed: B('Three meals and two snacks. Milk 16–24 oz. Expect picky phases; keep offering without pressure.', 'Tres comidas y dos tentempiés. Leche 470–700 ml. Habrá fases de rechazo; sigue ofreciendo sin presionar.'),
    diapers: B('Potty readiness (staying dry 2 h, telling you, interest in the toilet) usually appears between 2 and 3.', 'La preparación para el orinal (2 h seco, avisar, interés por el baño) suele aparecer entre los 2 y los 3 años.'),
    dev: ['Runs, kicks a ball, climbs stairs holding on|Corre, chuta una pelota, sube escaleras agarrado', 'Two-word phrases; points to body parts; 50+ words by 2|Frases de dos palabras; señala partes del cuerpo; 50+ palabras a los 2', 'Pretend play; notices when others are upset|Juego simbólico; nota cuando otros están tristes', 'Uses switches and knobs; plays with more than one toy at once|Usa interruptores y botones; juega con más de un juguete a la vez'],
    watch: ['Not using two-word phrases by 24 months|No usa frases de dos palabras a los 24 meses', 'Does not know what to do with common things like a spoon or phone|No sabe qué hacer con objetos comunes como una cuchara o un teléfono', 'Does not copy actions or words, or loses skills|No imita acciones ni palabras, o pierde habilidades'],
    tips: ['Autism screening (M-CHAT) at 18 and 24 months is routine; the 24-month visit is 17 Aug 2028.|El cribado de autismo (M-CHAT) a los 18 y 24 meses es rutinario; la revisión de los 24 meses es el 17 ago 2028.', 'Second hepatitis A dose falls in this window.|La segunda dosis de hepatitis A cae en esta ventana.', 'Start daycare waitlists early: Miami infant and toddler rooms fill months ahead.|Apúntalo pronto a las listas de espera: en Miami las salas de bebés y de 2 años se llenan con meses de antelación.'] },
];
function bandFor(days){ return GUIDE.find(g => days >= g.from && days <= g.to) || GUIDE[GUIDE.length - 1]; }

/* feed interval hint (hours) by age */
function feedIntervalFor(days){
  if (days < 42) return B('2–3 h', '2–3 h');
  if (days < 120) return B('2–4 h', '2–4 h');
  if (days < 180) return B('3–4 h', '3–4 h');
  if (days < 365) return B('3–5 h', '3–5 h');
  return B('meals + snacks', 'comidas y tentempiés');
}
function feedsPerDayFor(days){
  if (days < 42) return '8–12';
  if (days < 120) return '7–10';
  if (days < 180) return '5–8';
  if (days < 365) return '4–6';
  return '3–5';
}
function sleepHoursFor(days){
  if (days < 120) return '14–17';
  if (days < 365) return '12–16';
  return '11–14';
}

/* ---------------- CDC milestones (2022 checklists) ---------------- */
const M = (en, es) => ({ en, es });
const MILESTONES = {
  2: { se: [M('Calms down when spoken to or picked up', 'Se calma cuando le hablan o lo cargan'), M('Looks at your face', 'Mira tu cara'), M('Seems happy to see you when you walk up to him', 'Parece contento de verte cuando te acercas'), M('Smiles when you talk to or smile at him', 'Sonríe cuando le hablas o le sonríes')],
       lc: [M('Makes sounds other than crying', 'Hace sonidos además de llorar'), M('Reacts to loud sounds', 'Reacciona a los sonidos fuertes')],
       cg: [M('Watches you as you move', 'Te observa mientras te mueves'), M('Looks at a toy for several seconds', 'Mira un juguete durante varios segundos')],
       mv: [M('Holds head up when on tummy', 'Levanta la cabeza cuando está boca abajo'), M('Moves both arms and both legs', 'Mueve ambos brazos y ambas piernas'), M('Opens hands briefly', 'Abre las manos brevemente')] },
  4: { se: [M('Smiles on his own to get your attention', 'Sonríe por sí solo para llamar tu atención'), M('Chuckles (not yet a full laugh) when you try to make him laugh', 'Se ríe entre dientes (aún no a carcajadas) cuando intentas hacerlo reír'), M('Looks at you, moves, or makes sounds to get or keep your attention', 'Te mira, se mueve o hace sonidos para captar o mantener tu atención')],
       lc: [M('Makes sounds like "oooo", "aahh" (cooing)', 'Hace sonidos como «oooo», «aahh» (gorjeos)'), M('Makes sounds back when you talk to him', 'Responde con sonidos cuando le hablas'), M('Turns head toward the sound of your voice', 'Gira la cabeza hacia el sonido de tu voz')],
       cg: [M('If hungry, opens mouth when he sees breast or bottle', 'Si tiene hambre, abre la boca al ver el pecho o el biberón'), M('Looks at his hands with interest', 'Se mira las manos con interés')],
       mv: [M('Holds head steady without support when you are holding him', 'Mantiene la cabeza firme sin apoyo cuando lo sostienes'), M('Holds a toy when you put it in his hand', 'Sostiene un juguete cuando se lo pones en la mano'), M('Uses his arm to swing at toys', 'Usa el brazo para manotear juguetes'), M('Brings hands to mouth', 'Se lleva las manos a la boca'), M('Pushes up onto elbows/forearms when on tummy', 'Se levanta sobre los codos/antebrazos cuando está boca abajo')] },
  6: { se: [M('Knows familiar people', 'Reconoce a las personas conocidas'), M('Likes to look at himself in a mirror', 'Le gusta mirarse en el espejo'), M('Laughs', 'Se ríe')],
       lc: [M('Takes turns making sounds with you', 'Alterna sonidos contigo'), M('Blows "raspberries" (sticks tongue out and blows)', 'Hace «pedorretas» (saca la lengua y sopla)'), M('Makes squealing noises', 'Hace chillidos')],
       cg: [M('Puts things in his mouth to explore them', 'Se lleva cosas a la boca para explorarlas'), M('Reaches to grab a toy he wants', 'Estira el brazo para agarrar un juguete que quiere'), M('Closes lips to show he does not want more food', 'Cierra los labios para mostrar que no quiere más comida')],
       mv: [M('Rolls from tummy to back', 'Gira de boca abajo a boca arriba'), M('Pushes up with straight arms when on tummy', 'Se levanta con los brazos estirados cuando está boca abajo'), M('Leans on hands to support himself when sitting', 'Se apoya en las manos para sostenerse sentado')] },
  9: { se: [M('Is shy, clingy, or fearful around strangers', 'Es tímido, pegajoso o temeroso con desconocidos'), M('Shows several facial expressions, like happy, sad, angry, and surprised', 'Muestra varias expresiones faciales: contento, triste, enfadado, sorprendido'), M('Looks when you call his name', 'Mira cuando lo llamas por su nombre'), M('Reacts when you leave (looks, reaches for you, or cries)', 'Reacciona cuando te vas (mira, estira los brazos o llora)'), M('Smiles or laughs when you play peek-a-boo', 'Sonríe o se ríe cuando juegas al cucú')],
       lc: [M('Makes different sounds like "mamamama" and "babababa"', 'Hace distintos sonidos como «mamamama» y «babababa»'), M('Lifts arms up to be picked up', 'Levanta los brazos para que lo cojan')],
       cg: [M('Looks for objects when dropped out of sight (like a spoon or toy)', 'Busca objetos que caen fuera de su vista (una cuchara, un juguete)'), M('Bangs two things together', 'Golpea dos cosas entre sí')],
       mv: [M('Gets to a sitting position by himself', 'Llega a sentarse por sí solo'), M('Moves things from one hand to his other hand', 'Pasa cosas de una mano a la otra'), M('Uses fingers to "rake" food toward himself', 'Usa los dedos para «rastrillar» la comida hacia él'), M('Sits without support', 'Se sienta sin apoyo')] },
  12: { se: [M('Plays games with you, like pat-a-cake', 'Juega contigo a juegos como palmas palmitas')],
        lc: [M('Waves "bye-bye"', 'Dice «adiós» con la mano'), M('Calls a parent "mama" or "dada" or another special name', 'Llama a un padre «mamá» o «papá» u otro nombre especial'), M('Understands "no" (pauses briefly or stops when you say it)', 'Entiende «no» (se detiene un momento cuando lo dices)')],
        cg: [M('Puts something in a container, like a block in a cup', 'Mete algo en un recipiente, como un bloque en una taza'), M('Looks for things he sees you hide, like a toy under a blanket', 'Busca cosas que ve que escondes, como un juguete bajo una manta')],
        mv: [M('Pulls up to stand', 'Se pone de pie agarrándose'), M('Walks, holding on to furniture', 'Camina agarrado a los muebles'), M('Drinks from a cup without a lid, as you hold it', 'Bebe de un vaso sin tapa mientras lo sostienes'), M('Picks things up between thumb and pointer finger, like small bits of food', 'Coge cosas entre el pulgar y el índice, como trocitos de comida')] },
  15: { se: [M('Copies other children while playing, like taking toys out of a container when another child does', 'Imita a otros niños al jugar, como sacar juguetes de una caja cuando otro lo hace'), M('Shows you an object he likes', 'Te enseña un objeto que le gusta'), M('Claps when excited', 'Aplaude cuando se emociona'), M('Hugs stuffed doll or other toy', 'Abraza un muñeco de peluche u otro juguete'), M('Shows you affection (hugs, cuddles, or kisses you)', 'Te muestra cariño (te abraza, se acurruca o te besa)')],
        lc: [M('Tries to say one or two words besides "mama" or "dada", like "ba" for ball', 'Intenta decir una o dos palabras además de «mamá» o «papá», como «ba» por bola'), M('Looks at a familiar object when you name it', 'Mira un objeto conocido cuando lo nombras'), M('Follows directions given with both a gesture and words', 'Sigue indicaciones dadas con gesto y palabras'), M('Points to ask for something or to get help', 'Señala para pedir algo o para pedir ayuda')],
        cg: [M('Tries to use things the right way, like a phone, cup, or book', 'Intenta usar las cosas correctamente: un teléfono, un vaso, un libro'), M('Stacks at least two small objects, like blocks', 'Apila al menos dos objetos pequeños, como bloques')],
        mv: [M('Takes a few steps on his own', 'Da unos pasos por sí solo'), M('Uses fingers to feed himself some food', 'Usa los dedos para comer algo por sí solo')] },
  18: { se: [M('Moves away from you, but looks to make sure you are close by', 'Se aleja de ti, pero mira para asegurarse de que estás cerca'), M('Points to show you something interesting', 'Señala para mostrarte algo interesante'), M('Puts hands out for you to wash them', 'Extiende las manos para que se las laves'), M('Looks at a few pages in a book with you', 'Mira unas páginas de un libro contigo'), M('Helps you dress him by pushing arm through sleeve or lifting up foot', 'Ayuda a vestirse metiendo el brazo en la manga o levantando el pie')],
        lc: [M('Tries to say three or more words besides "mama" or "dada"', 'Intenta decir tres o más palabras además de «mamá» o «papá»'), M('Follows one-step directions without any gestures', 'Sigue indicaciones de un paso sin gestos')],
        cg: [M('Copies you doing chores, like sweeping with a broom', 'Te imita haciendo tareas, como barrer'), M('Plays with toys in a simple way, like pushing a toy car', 'Juega con juguetes de forma sencilla, como empujar un cochecito')],
        mv: [M('Walks without holding on to anyone or anything', 'Camina sin agarrarse a nadie ni a nada'), M('Scribbles', 'Garabatea'), M('Drinks from a cup without a lid and may spill sometimes', 'Bebe de un vaso sin tapa, aunque a veces derrame'), M('Feeds himself with his fingers', 'Come solo con los dedos'), M('Tries to use a spoon', 'Intenta usar la cuchara'), M('Climbs on and off a couch or chair without help', 'Se sube y baja de un sofá o silla sin ayuda')] },
  24: { se: [M('Notices when others are hurt or upset, like pausing or looking sad when someone is crying', 'Nota cuando otros están heridos o tristes, por ejemplo se detiene o pone cara triste si alguien llora'), M('Looks at your face to see how to react in a new situation', 'Mira tu cara para saber cómo reaccionar ante algo nuevo')],
        lc: [M('Points to things in a book when you ask', 'Señala cosas en un libro cuando se lo pides'), M('Says at least two words together, like "more milk"', 'Dice al menos dos palabras juntas, como «más leche»'), M('Points to at least two body parts when you ask', 'Señala al menos dos partes del cuerpo cuando se lo pides'), M('Uses more gestures than just waving and pointing, like blowing a kiss or nodding yes', 'Usa más gestos que saludar y señalar, como tirar un beso o asentir')],
        cg: [M('Holds something in one hand while using the other hand', 'Sostiene algo con una mano mientras usa la otra'), M('Tries to use switches, knobs, or buttons on a toy', 'Intenta usar interruptores, perillas o botones de un juguete'), M('Plays with more than one toy at the same time', 'Juega con más de un juguete a la vez')],
        mv: [M('Kicks a ball', 'Chuta una pelota'), M('Runs', 'Corre'), M('Walks (not climbs) up a few stairs with or without help', 'Sube (no trepa) unos escalones con o sin ayuda'), M('Eats with a spoon', 'Come con cuchara')] },
};
const MS_AGES = [2, 4, 6, 9, 12, 15, 18, 24];
function msCheckpointFor(months){ // the checkpoint he is heading toward
  for (const a of MS_AGES) if (months < a) return a;
  return 24;
}

/* ---------------- vaccines (AAP 2026; CDC tier noted) ---------------- */
/* due: months from birth (fractional allowed); win: [monthsFrom, monthsTo]; tier: 'all' | 'scdm' (CDC shared clinical decision-making, AAP routine) */
const V = (id, en, es, due, win, tier, note) => ({ id, name: { en, es }, due, win, tier, note });
const VAX = [
  { key: 'birth', label: B('Birth', 'Al nacer'), items: [
    V('hepb1', 'Hepatitis B, dose 1', 'Hepatitis B, dosis 1', 0, [0, 0.1], 'scdm', B('AAP: within 24 h of birth. CDC (Dec 2025): individual decision if the mother is HBsAg-negative; if deferred, no earlier than 2 months.', 'AAP: en las primeras 24 h. CDC (dic. 2025): decisión individual si la madre es HBsAg negativa; si se pospone, no antes de los 2 meses.')),
  ]},
  { key: 'rsv', label: B('First RSV season', 'Primera temporada de VRS'), items: [
    V('rsv', 'RSV antibody (nirsevimab or clesrovimab)', 'Anticuerpo VRS (nirsevimab o clesrovimab)', 1.5, [1.5, 7], 'all', B('One dose entering the first RSV season if Minerva did not get the maternal RSV vaccine. Nirsevimab 50 mg under 5 kg, 100 mg from 5 kg; clesrovimab 105 mg. Season in South Florida runs longer than Oct–Mar.', 'Una dosis al entrar en la primera temporada si Minerva no recibió la vacuna materna. Nirsevimab 50 mg por debajo de 5 kg, 100 mg desde 5 kg; clesrovimab 105 mg. En el sur de Florida la temporada dura más que oct–mar.')),
  ]},
  { key: 'm1', label: B('1–2 months', '1–2 meses'), items: [
    V('hepb2', 'Hepatitis B, dose 2', 'Hepatitis B, dosis 2', 1, [1, 2], 'scdm', null),
  ]},
  { key: 'm2', label: B('2 months', '2 meses'), items: [
    V('dtap1', 'DTaP, dose 1', 'DTaP, dosis 1', 2, [2, 2.5], 'all', null),
    V('ipv1', 'Polio (IPV), dose 1', 'Polio (IPV), dosis 1', 2, [2, 2.5], 'all', null),
    V('hib1', 'Hib, dose 1', 'Hib, dosis 1', 2, [2, 2.5], 'all', null),
    V('pcv1', 'Pneumococcal (PCV), dose 1', 'Neumococo (PCV), dosis 1', 2, [2, 2.5], 'all', null),
    V('rv1', 'Rotavirus, dose 1', 'Rotavirus, dosis 1', 2, [1.5, 3.5], 'scdm', B('Oral. First dose must be given before 15 weeks. RV1 is 2 doses, RV5 is 3.', 'Oral. La primera dosis debe darse antes de las 15 semanas. RV1 son 2 dosis, RV5 son 3.')),
  ]},
  { key: 'm4', label: B('4 months', '4 meses'), items: [
    V('dtap2', 'DTaP, dose 2', 'DTaP, dosis 2', 4, [4, 4.5], 'all', null),
    V('ipv2', 'Polio (IPV), dose 2', 'Polio (IPV), dosis 2', 4, [4, 4.5], 'all', null),
    V('hib2', 'Hib, dose 2', 'Hib, dosis 2', 4, [4, 4.5], 'all', null),
    V('pcv2', 'Pneumococcal (PCV), dose 2', 'Neumococo (PCV), dosis 2', 4, [4, 4.5], 'all', null),
    V('rv2', 'Rotavirus, dose 2', 'Rotavirus, dosis 2', 4, [4, 4.5], 'scdm', null),
  ]},
  { key: 'm6', label: B('6 months', '6 meses'), items: [
    V('dtap3', 'DTaP, dose 3', 'DTaP, dosis 3', 6, [6, 6.5], 'all', null),
    V('pcv3', 'Pneumococcal (PCV), dose 3', 'Neumococo (PCV), dosis 3', 6, [6, 6.5], 'all', null),
    V('hib3', 'Hib, dose 3 (brand-dependent)', 'Hib, dosis 3 (según la marca)', 6, [6, 6.5], 'all', B('Only with 3-dose primary-series brands (e.g. ActHIB, Pentacel). PedvaxHIB needs no 6-month dose.', 'Solo con marcas de serie primaria de 3 dosis (p. ej. ActHIB, Pentacel). PedvaxHIB no necesita dosis a los 6 meses.')),
    V('rv3', 'Rotavirus, dose 3 (RV5 only)', 'Rotavirus, dosis 3 (solo RV5)', 6, [6, 8], 'scdm', B('Not needed with RV1 (Rotarix). Last dose by 8 months.', 'No hace falta con RV1 (Rotarix). Última dosis antes de los 8 meses.')),
    V('hepb3', 'Hepatitis B, dose 3', 'Hepatitis B, dosis 3', 6, [6, 18], 'scdm', null),
    V('ipv3', 'Polio (IPV), dose 3', 'Polio (IPV), dosis 3', 6, [6, 18], 'all', null),
    V('flu1', 'Influenza, dose 1 (first season)', 'Gripe, dosis 1 (primera temporada)', 6, [6, 8], 'scdm', B('Two doses 4 weeks apart the first season, then yearly. Gonzalo turns 6 months on 17 Feb 2027, late in the 2026–27 season; ask whether to give it then or start in fall 2027.', 'Dos dosis con 4 semanas de diferencia la primera temporada, luego anual. Gonzalo cumple 6 meses el 17 feb 2027, al final de la temporada 2026–27; pregunta si ponerla entonces o empezar en otoño de 2027.')),
    V('flu2', 'Influenza, dose 2 (first season)', 'Gripe, dosis 2 (primera temporada)', 7, [7, 9], 'scdm', null),
    V('covid1', 'COVID-19 (6–23 months)', 'COVID-19 (6–23 meses)', 6, [6, 23], 'scdm', B('AAP: recommended for all 6–23 months. CDC: individual decision; Moderna is the only product for this age.', 'AAP: recomendada para todos de 6 a 23 meses. CDC: decisión individual; Moderna es el único producto para esta edad.')),
  ]},
  { key: 'm12', label: B('12–15 months', '12–15 meses'), items: [
    V('mmr1', 'MMR, dose 1', 'Triple vírica (SRP), dosis 1', 12, [12, 15], 'all', B('CDC (Sept 2025): separate MMR and varicella shots under age 4 rather than combined MMRV. AAP still allows MMRV.', 'CDC (sept. 2025): triple vírica y varicela por separado antes de los 4 años, en vez de la combinada MMRV. La AAP sigue permitiendo MMRV.')),
    V('var1', 'Varicella, dose 1', 'Varicela, dosis 1', 12, [12, 15], 'all', null),
    V('hib4', 'Hib, booster', 'Hib, refuerzo', 12, [12, 15], 'all', null),
    V('pcv4', 'Pneumococcal (PCV), dose 4', 'Neumococo (PCV), dosis 4', 12, [12, 15], 'all', null),
    V('hepa1', 'Hepatitis A, dose 1', 'Hepatitis A, dosis 1', 12, [12, 23], 'scdm', B('Two doses at least 6 months apart, both between 12 and 23 months.', 'Dos dosis con al menos 6 meses de diferencia, ambas entre los 12 y 23 meses.')),
  ]},
  { key: 'm15', label: B('15–18 months', '15–18 meses'), items: [
    V('dtap4', 'DTaP, dose 4', 'DTaP, dosis 4', 15, [15, 18], 'all', null),
  ]},
  { key: 'm18', label: B('18–23 months', '18–23 meses'), items: [
    V('hepa2', 'Hepatitis A, dose 2', 'Hepatitis A, dosis 2', 18, [18, 23], 'scdm', null),
  ]},
];

/* ---------------- well-child visits ---------------- */
const VISITS = [
  { id: 'v3d', months: 0.15, label: B('3–5 days', '3–5 días'), what: B('Weight, jaundice, feeding check', 'Peso, ictericia, revisión de las tomas') },
  { id: 'v1m', months: 1, label: B('1 month', '1 mes'), what: B('Weight gain, hearing screen result, hepatitis B dose 2', 'Ganancia de peso, resultado del cribado auditivo, hepatitis B dosis 2') },
  { id: 'v2m', months: 2, label: B('2 months', '2 meses'), what: B('First vaccine round, maternal depression screen', 'Primera tanda de vacunas, cribado de depresión materna') },
  { id: 'v4m', months: 4, label: B('4 months', '4 meses'), what: B('Second vaccine round', 'Segunda tanda de vacunas') },
  { id: 'v6m', months: 6, label: B('6 months', '6 meses'), what: B('Third round, solids talk, flu shot', 'Tercera tanda, charla sobre sólidos, gripe') },
  { id: 'v9m', months: 9, label: B('9 months', '9 meses'), what: B('Developmental screening, no routine shots', 'Cribado del desarrollo, sin vacunas rutinarias') },
  { id: 'v12m', months: 12, label: B('12 months', '12 meses'), what: B('MMR, varicella, hep A, boosters; anemia and lead checks', 'Triple vírica, varicela, hep. A, refuerzos; análisis de anemia y plomo') },
  { id: 'v15m', months: 15, label: B('15 months', '15 meses'), what: B('DTaP dose 4 window opens', 'Se abre la ventana de DTaP dosis 4') },
  { id: 'v18m', months: 18, label: B('18 months', '18 meses'), what: B('Developmental and autism screening, hep A dose 2', 'Cribado del desarrollo y del autismo, hep. A dosis 2') },
  { id: 'v24m', months: 24, label: B('24 months', '24 meses'), what: B('Autism screening repeat, BMI begins', 'Repetición del cribado de autismo, empieza el IMC') },
];

/* ---------------- sources ---------------- */
const SOURCES = [
  ['WHO Child Growth Standards (LMS tables, boys 0–24 months)', 'https://www.who.int/tools/child-growth-standards/standards'],
  ['CDC Learn the Signs. Act Early. milestone checklists', 'https://www.cdc.gov/act-early/milestones/index.html'],
  ['CDC child and adolescent immunization schedule', 'https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-age.html'],
  ['AAP 2026 immunization schedule', 'https://www.aap.org/en/patient-care/immunizations/'],
  ['AAP Bright Futures periodicity schedule', 'https://www.aap.org/en/practice-management/care-delivery-approaches/periodicity-schedule/'],
  ['HealthyChildren.org: how often and how much should your baby eat', 'https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/how-often-and-how-much-should-your-baby-eat.aspx'],
  ['HealthyChildren.org: amount and schedule of formula feedings', 'https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/amount-and-schedule-of-formula-feedings.aspx'],
  ['AAP 2022 safe sleep recommendations', 'https://publications.aap.org/pediatrics/article/150/1/e2022057990/188304/Sleep-Related-Infant-Deaths-Updated-2022'],
  ['AASM pediatric sleep duration consensus', 'https://aasm.org/resources/pdf/pediatricsleepdurationconsensus.pdf'],
  ['CDC RSV immunization guidance for infants', 'https://www.cdc.gov/rsv/hcp/vaccine-clinical-guidance/infants-young-children.html'],
  ['Florida DOH immunization requirements and Florida SHOTS', 'https://www.floridahealth.gov/individual-family-health/immunization/'],
];

return { T, WAKE, wakeFor, GUIDE, bandFor, feedIntervalFor, feedsPerDayFor, sleepHoursFor, MILESTONES, MS_AGES, msCheckpointFor, VAX, VISITS, SOURCES };
})();
