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
