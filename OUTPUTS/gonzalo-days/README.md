# Gonzalo's Days

A shared, bilingual (EN/ES) baby log for Gonzalo Bedoya Fuentes, born 17 August 2026 in Miami Beach.
Single-file web app published as a Claude artifact:
https://claude.ai/code/artifact/90fb26b5-11ce-4ca6-ba7d-36d1693d9578

Declared capabilities: `db` (shared realtime log), `downloads` (CSV/JSON export), `sample` (ask Claude about the log).
Because `db` is declared, the page is organization-internal: viewers must be signed in to the owner's claude.ai
organization. To hand out a public link instead, republish with `capabilities: {}` and the app falls back to
per-device storage plus the text share.

## What it does

- **Today**: one-tap logging of breast (L/R timers), bottle, sleep timer, wet/dirty diapers, pumping,
  vitamin D, tummy time, bath, medicine, temperature, notes. "Now" strip shows last feed, awake time with a
  nap-window estimate from age-based wake windows, last diaper. Today totals against typical ranges for his age,
  a 24-hour ribbon, and the entry list (tap to edit).
- **Log**: any day since birth, share a plain-text summary (copy / WhatsApp / native share), export CSV, backup JSON.
  A **Patterns** switch (7d / 14d / 30d) shows the daily rhythm dot plot with night shading, daily totals,
  sleep hours, the longest stretch without a feed, and left/right side balance.
- **Growth**: weight, length, head circumference on WHO boys 0-24 month percentile curves (3/15/50/85/97),
  percentile computed from the official LMS tables (daily resolution, days 0-730). Chart and table views.
- **Guide**: age-tuned stage guide (sleep, feeding, diapers, development, red flags, tips, what's next) and the
  CDC "Learn the Signs. Act Early." milestone checklist for the next checkpoint, shared tick state.
- **Health**: a **For the pediatrician** card (last feed/wet/dirty, last 24 h, last 7 days with averages, one-tap
  copy for the appointment) followed by the AAP 2026 vaccine schedule with dates computed from his birthday (CDC shared-decision tier marked),
  Bright Futures well-visit list, pediatrician card with tap-to-call, temperature alert under 3 months,
  Florida SHOTS / DH 680 note.
- **Ask**: when the `sample` capability is available, sends the last 48 h of the log plus his age to Claude.

All times are shown in Miami time (America/New_York) wherever the page is opened.

## Data and sharing

- Day documents may carry a `tot` field (`feeds`, `wet`, `dirty`, `nurseMin`, `src`) with daily totals carried over
  from the previous app (1 to 6 Sep 2026). Summaries use it when it exceeds what the events show.

- With the `db` capability the log is one shared realtime store: `days/YYYY-MM-DD` documents holding an
  `ev` map of events (tombstone deletes), `growth/main`, `health/main`, `profile/main`. Writes are field-level
  merges so two caregivers logging at once do not clobber each other.
- Without it (opened as a plain file, or if the grant is absent) the app falls back to `localStorage`
  and says "This device only". Settings offers a one-off merge of local entries into the shared log.
- Per-device preferences (language, units, caregiver name) live in `localStorage`.

## Build

```
python3 build.py      # assembles index.html from src/
```

`src/who.js` is generated from the WHO expanded LMS tables (boys; weight-for-age, length-for-age,
head-circumference-for-age), cross-checked against three independent redistributions; day 731 (standing height)
is dropped so the length curve stays recumbent.

## Sources

WHO Child Growth Standards; CDC milestone checklists (2022); CDC and AAP 2026 immunization schedules;
AAP Bright Futures periodicity schedule; HealthyChildren.org feeding pages; AAP 2022 safe sleep policy;
AASM sleep duration consensus; Florida DOH immunization pages. Typical ranges are context, not targets, and
never replace the pediatrician.
