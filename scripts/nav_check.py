"""Menu panel states + full-site link crawl.
Usage: python -I scripts/nav_check.py <base_url> <out_dir>
"""
import json
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright

base, out = sys.argv[1].rstrip('/'), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
report = {}

with sync_playwright() as p:
    b = p.chromium.launch()

    # Desktop panels
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.goto(base + '/', wait_until='networkidle')
    pg.evaluate('document.fonts.ready')
    triggers = pg.locator('[data-mega-trigger]')
    for i in range(triggers.count()):
        triggers.nth(i).click()
        pg.wait_for_timeout(150)
        pg.screenshot(path=str(out / f'panel-{i + 1}.png'))
        report[f'panel_{i + 1}_expanded'] = triggers.nth(i).get_attribute('aria-expanded')
    # Opening the second closed the first?
    report['only_one_open'] = pg.locator('[data-mega-trigger][aria-expanded="true"]').count() == 1
    pg.keyboard.press('Escape')
    pg.wait_for_timeout(100)
    report['escape_closes'] = pg.locator('[data-mega-trigger][aria-expanded="true"]').count() == 0
    report['focus_returns'] = pg.evaluate('document.activeElement.hasAttribute("data-mega-trigger")')
    # Keyboard: open with Enter, tab into panel
    triggers.first.focus()
    pg.keyboard.press('Enter')
    pg.keyboard.press('Tab')
    report['tab_into_panel'] = pg.evaluate('!!document.activeElement.closest("[data-mega-panel]")')
    # Outside click closes
    pg.mouse.click(700, 850)
    pg.wait_for_timeout(100)
    report['outside_click_closes'] = pg.locator('[data-mega-trigger][aria-expanded="true"]').count() == 0
    pg.close()

    # Current-page marker
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.goto(base + '/specialties/cybersecurity', wait_until='networkidle')
    report['current_marked'] = pg.evaluate('[...document.querySelectorAll(".is-current")].map(e => e.textContent.trim())')
    pg.screenshot(path=str(out / 'header-current.png'), clip={'x': 0, 'y': 0, 'width': 1440, 'height': 90})
    pg.close()

    # Mobile drawer with a group expanded
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.goto(base + '/', wait_until='networkidle')
    pg.locator('[data-menu-toggle]').click()
    pg.locator('.mobile-menu__group summary').first.click()
    pg.wait_for_timeout(150)
    pg.screenshot(path=str(out / 'mobile-drawer-group.png'))
    pg.close()

    # Crawl every internal page and verify links + anchors
    seen, queue, bad = set(), ['/'], []
    pg = b.new_page()
    while queue:
        path = queue.pop()
        if path in seen:
            continue
        seen.add(path)
        resp = pg.goto(base + path, wait_until='domcontentloaded')
        if not resp or resp.status != 200:
            bad.append((path, resp.status if resp else None))
            continue
        hrefs = pg.evaluate('[...document.querySelectorAll("a[href]")].map(a => a.getAttribute("href"))')
        for h in hrefs:
            if h.startswith(('http', 'mailto:', 'tel:')):
                continue
            full = urlparse(urljoin(base + path, h))
            target = full.path.rstrip('/') or '/'
            if full.fragment:
                anchor_page = b.new_page()
                anchor_page.goto(base + target, wait_until='domcontentloaded')
                if not anchor_page.evaluate(f'!!document.getElementById({json.dumps(full.fragment)})'):
                    bad.append((path, h, 'missing anchor'))
                anchor_page.close()
            if target not in seen:
                queue.append(target)
    report['pages_crawled'] = sorted(seen)
    report['bad'] = bad
    b.close()

print(json.dumps(report, indent=1))
