#!/usr/bin/env python3
"""Build seed.json (sync v1 format) from a read_db dump directory: python3 make-seed.py <dump_dir>

Tombstones are kept: a device that already merged an event only drops it if the
seed carries the `del` marker, so filtering them out would make deletions
un-syncable. They are compacted the same way core.js compactEvent() does.
"""
import json, sys, pathlib, time

OPT = ('sub', 'e', 'a', 'u', 'n', 'by', 'c', 'del')


def compact(e):
    """Mirror compactEvent() in src/core.js: id/t/s always, the rest when set."""
    o = {"id": e["id"], "t": e.get("t"), "s": e.get("s")}
    for k in OPT:
        v = e.get(k)
        if v is not None and v != '' and v is not False:
            o[k] = v
    return o


dump = pathlib.Path(sys.argv[1])
out = {"v": 1, "from": "shared log", "at": int(time.time() * 1000), "days": {}, "growth": {}, "health": {}}
tombs = 0
for f in sorted((dump / 'days').glob('*.json')):
    doc = json.load(open(f))
    data = doc.get('data', doc)
    ev = {}
    for k, v in (data.get('ev') or {}).items():
        # importSync() skips anything without an id and a numeric start
        if not v or not v.get('id') or not isinstance(v.get('s'), (int, float)):
            continue
        ev[k] = compact(v)
        if v.get('del'):
            tombs += 1
    entry = {"ev": ev}
    if data.get('tot'):
        entry["tot"] = data['tot']
    if ev or data.get('tot'):
        out["days"][f.stem] = entry
g = dump / 'growth' / 'main.json'
if g.exists():
    data = json.load(open(g)); data = data.get('data', data)
    out["growth"] = {k: v for k, v in (data.get('m') or {}).items() if v and v.get('id')}
h = dump / 'health' / 'main.json'
if h.exists():
    data = json.load(open(h)); data = data.get('data', data)
    out["health"] = {k: data.get(k) or {} for k in ('vax', 'visits', 'ms', 'ped')}
pathlib.Path('seed.json').write_text(json.dumps(out, separators=(',', ':')))
n = sum(len(d['ev']) for d in out['days'].values())
print('seed.json:', len(out['days']), 'days,', n, 'events (' + str(tombs), 'tombstones),', len(out['growth']), 'growth rows')
