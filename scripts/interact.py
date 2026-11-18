"""Drive interactive states and capture them. Usage: python -I scripts/interact.py <base_url> <out_dir>"""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

base, out = sys.argv[1].rstrip('/'), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
report = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    # Mobile menu
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.goto(base + '/', wait_until='networkidle')
    t = pg.locator('[data-menu-toggle]')
    t.click(); pg.wait_for_timeout(200)
    report['menu_expanded'] = t.get_attribute('aria-expanded')
    pg.screenshot(path=str(out / 'mobile-menu-open.png'))
    pg.keyboard.press('Escape'); pg.wait_for_timeout(100)
    report['menu_after_escape'] = t.get_attribute('aria-expanded')
    report['focus_after_escape'] = pg.evaluate('document.activeElement.getAttribute("data-menu-toggle") !== null')
    pg.close()
    # Keyboard order + FAQ (desktop)
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.goto(base + '/', wait_until='networkidle')
    order = []
    for i in range(10):
        pg.keyboard.press('Tab')
        order.append(pg.evaluate('(() => { const e = document.activeElement; return (e.tagName + " " + (e.textContent || "").trim().replace(/\s+/g, " ")).slice(0, 50); })()'))
    report['tab_order'] = order
    pg.keyboard.press('Shift+Tab'); pg.keyboard.press('Tab')
    pg.screenshot(path=str(out / 'desktop-focus.png'))
    pg.locator('.faq__item summary').first.focus()
    pg.keyboard.press('Enter'); pg.wait_for_timeout(100)
    report['faq_open'] = pg.evaluate('document.querySelector(".faq__item").open')
    pg.locator('#faq').scroll_into_view_if_needed()
    pg.locator('#faq').screenshot(path=str(out / 'faq-open.png'))
    pg.locator('.site-header__nav a').first.hover(); pg.wait_for_timeout(300)
    pg.evaluate('window.scrollTo(0,0)')
    pg.screenshot(path=str(out / 'nav-hover.png'), clip={'x': 0, 'y': 0, 'width': 1440, 'height': 90})
    pg.close()
    # Form: empty submit, invalid email, preset engagement, valid submit with no endpoint
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.goto(base + '/request-talent?engagement=contract-to-hire', wait_until='networkidle')
    report['engagement_preset'] = pg.locator('#engagement').input_value()
    pg.locator('[data-submit]').click(); pg.wait_for_timeout(200)
    report['summary_visible'] = pg.locator('[data-error-summary]').is_visible()
    report['focus_on_summary'] = pg.evaluate('document.activeElement.hasAttribute("data-error-summary")')
    report['invalid_fields'] = pg.evaluate('[...document.querySelectorAll("[aria-invalid=true]")].map(e => e.id)')
    pg.screenshot(path=str(out / 'form-errors.png'), full_page=True)
    pg.fill('#fullName', 'Test Person'); pg.fill('#workEmail', 'not-an-email'); pg.fill('#company', 'Example Co'); pg.fill('#role', 'Cloud engineer')
    pg.locator('[data-submit]').click(); pg.wait_for_timeout(200)
    report['invalid_after_email'] = pg.evaluate('[...document.querySelectorAll("[aria-invalid=true]")].map(e => e.id)')
    pg.fill('#workEmail', 'test@example.com')
    pg.locator('[data-submit]').click(); pg.wait_for_timeout(200)
    report['status_text'] = pg.locator('[data-status]').inner_text()
    report['values_preserved'] = pg.locator('#fullName').input_value() == 'Test Person'
    pg.screenshot(path=str(out / 'form-not-connected.png'))
    pg.close()
    # Form mobile
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.goto(base + '/request-talent', wait_until='networkidle')
    pg.screenshot(path=str(out / 'form-mobile.png'), full_page=True)
    report['form_mobile_overflow'] = pg.evaluate('document.documentElement.scrollWidth - innerWidth')
    pg.close()
    # 404
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    r = pg.goto(base + '/no-such-page', wait_until='networkidle')
    report['404_status'] = r.status if r else None
    pg.close()
    # Link audit: every internal href resolves
    pg = b.new_page()
    pg.goto(base + '/', wait_until='networkidle')
    hrefs = pg.evaluate('[...new Set([...document.querySelectorAll("a[href]")].map(a => a.getAttribute("href")))]')
    bad = []
    for h in hrefs:
        if h.startswith('http'): continue
        path, _, frag = h.partition('#')
        path = path or '/'
        resp = pg.request.get(base + path)
        if resp.status != 200: bad.append((h, resp.status))
        if frag and path == '/' and not pg.evaluate(f'!!document.getElementById("{frag}")'): bad.append((h, 'missing anchor'))
    report['hrefs'] = hrefs
    report['bad_links'] = bad
    b.close()
print(json.dumps(report, indent=1))
