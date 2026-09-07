#!/usr/bin/env python3
"""Assemble index.html from the src/ parts. Run: python3 build.py"""
import pathlib, datetime
root = pathlib.Path(__file__).parent
src = root / 'src'
parts = []
parts.append((src / 'head.html').read_text())
parts.append('<style>\n' + (src / 'styles.css').read_text() + '\n</style>\n')
parts.append('<div class="app" id="app"></div>\n')
for js in ('who.js', 'content.js', 'core.js', 'ui.js'):
    parts.append('<script>\n' + (src / js).read_text() + '\n</script>\n')
html = ''.join(parts)
(root / 'index.html').write_text(html)
print('index.html', len(html.encode()), 'bytes', datetime.datetime.now().isoformat(timespec='seconds'))
# Family edition: no runtime capabilities, per-device storage, sync by text
seed = (root / 'seed.json')
seed_tag = ('<script>window.GD_SEED=' + seed.read_text().strip() + ';</script>\n') if seed.exists() else ''
public = html.replace('<div class="app" id="app"></div>', '<script>window.GD_PUBLIC=true;</script>\n' + seed_tag + '<div class="app" id="app"></div>', 1).replace("<title>Gonzalo's Days</title>", '<title>Los días de Gonzalo</title>', 1)
(root / 'index-public.html').write_text(public)
print('index-public.html', len(public.encode()), 'bytes')
