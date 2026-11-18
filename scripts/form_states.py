"""Settled captures of the request-talent form states. Usage: python -I scripts/form_states.py <base> <out>"""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

base, out = sys.argv[1].rstrip('/'), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)

def settle(pg):
    pg.wait_for_function('''() => new Promise(r => { let last = scrollY, same = 0;
      const tick = () => { if (scrollY === last) { if (++same > 3) return r(true); } else { same = 0; last = scrollY; } requestAnimationFrame(tick); };
      requestAnimationFrame(tick); })''')
    pg.wait_for_timeout(600)

def rect(pg, sel):
    return pg.evaluate(f'''(() => {{ const r = document.querySelector('{sel}').getBoundingClientRect();
      const h = document.querySelector('[data-header]').getBoundingClientRect();
      return {{top: Math.round(r.top), bottom: Math.round(r.bottom), headerBottom: Math.round(h.bottom), scrollY: Math.round(scrollY)}}; }})()''')

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h, tag in [(1440, 900, 'desktop'), (390, 844, 'mobile')]:
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.goto(base + '/request-talent', wait_until='networkidle')
        pg.evaluate('document.fonts.ready')
        pg.locator('#fullName').scroll_into_view_if_needed()
        pg.locator('[data-submit]').click()
        settle(pg)
        print(tag, 'errors', json.dumps(rect(pg, '[data-error-summary]')))
        pg.screenshot(path=str(out / f'form-errors-{tag}.png'))
        if tag == 'desktop':
            pg.evaluate('scrollTo(0,0)'); settle(pg)
            pg.screenshot(path=str(out / 'form-errors-fields.png'), full_page=True)
        pg.fill('#fullName', 'Test Person'); pg.fill('#workEmail', 'test@example.com')
        pg.fill('#company', 'Example Co'); pg.fill('#role', 'Cloud engineer')
        pg.locator('[data-submit]').click()
        settle(pg)
        print(tag, 'status', json.dumps(rect(pg, '[data-status]')))
        pg.screenshot(path=str(out / f'form-not-connected-{tag}.png'))
        pg.close()
    b.close()
