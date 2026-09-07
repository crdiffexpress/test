#!/usr/bin/env python3
"""Build seed.json (sync v1 format) from a read_db dump directory: python3 make-seed.py <dump_dir>"""
import json, sys, pathlib, time
dump = pathlib.Path(sys.argv[1])
out = {"v": 1, "from": "shared log", "at": int(time.time() * 1000), "days": {}, "growth": {}, "health": {}}
for f in sorted((dump / 'days').glob('*.json')):
    doc = json.load(open(f))
    data = doc.get('data', doc)
    ev = {k: v for k, v in (data.get('ev') or {}).items() if v and not v.get('del')}
    entry = {"ev": ev}
    if data.get('tot'): entry["tot"] = data['tot']
    if ev or data.get('tot'): out["days"][f.stem] = entry
g = dump / 'growth' / 'main.json'
if g.exists():
    data = json.load(open(g)); data = data.get('data', data)
    out["growth"] = {k: v for k, v in (data.get('m') or {}).items() if v and not v.get('del')}
h = dump / 'health' / 'main.json'
if h.exists():
    data = json.load(open(h)); data = data.get('data', data)
    out["health"] = {k: data.get(k) or {} for k in ('vax', 'visits', 'ms', 'ped')}
pathlib.Path('seed.json').write_text(json.dumps(out, separators=(',', ':')))
n = sum(len(d['ev']) for d in out['days'].values())
print('seed.json:', len(out['days']), 'days,', n, 'events,', len(out['growth']), 'growth rows')
