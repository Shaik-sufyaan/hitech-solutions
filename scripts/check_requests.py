"""Checks for the assistant card, Glance photo and hero/strip fold.
Usage: python -I scripts/check_requests.py <base_url> <out_dir>
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

base, out = sys.argv[1].rstrip('/'), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
r = {}

with sync_playwright() as p:
    b = p.chromium.launch()

    # --- Hero + partner strip fill the first screen on desktop ---
    for w, h in [(1280, 720), (1440, 900), (1580, 760), (1920, 1080)]:
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.emulate_media(reduced_motion='reduce')
        pg.goto(base + '/', wait_until='networkidle')
        pg.wait_for_timeout(500)
        m = pg.evaluate("""(() => {
          const hero = document.querySelector('.hero').getBoundingClientRect();
          const strip = document.querySelector('.credentials').getBoundingClientRect();
          const inner = document.querySelector('.hero__inner').getBoundingClientRect();
          const cta = document.querySelector('.hero__actions').getBoundingClientRect();
          return {heroBottom: Math.round(hero.bottom), stripBottom: Math.round(strip.bottom), viewport: innerHeight,
                  ctaBottom: Math.round(cta.bottom), innerTop: Math.round(inner.top)};
        })()""")
        r[f'fold_{w}x{h}'] = m
        pg.screenshot(path=str(out / f'fold-{w}x{h}.png'))
        pg.close()

    # --- Glance photo is square and top-aligned ---
    for w, h, n in [(1440, 900, 'desktop'), (390, 844, 'mobile')]:
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.emulate_media(reduced_motion='reduce')
        pg.goto(base + '/', wait_until='networkidle')
        sec = pg.locator('#at-a-glance')
        sec.scroll_into_view_if_needed()
        pg.wait_for_timeout(600)
        r[f'glance_{n}'] = pg.evaluate("""(() => {
          const photo = document.querySelector('.glance__photography .editorial-photo') || document.querySelector('.glance__photography');
          const p = photo.getBoundingClientRect();
          const title = document.querySelector('#glance-title').getBoundingClientRect();
          const content = document.querySelector('.glance__content').getBoundingClientRect();
          return {photoW: Math.round(p.width), photoH: Math.round(p.height), photoTop: Math.round(p.top),
                  titleTop: Math.round(title.top), contentBottom: Math.round(content.bottom), photoBottom: Math.round(p.bottom)};
        })()""")
        sec.screenshot(path=str(out / f'glance-{n}.png'))
        pg.close()

    # --- Assistant card ---
    for w, h, n in [(1440, 900, 'desktop'), (390, 844, 'mobile')]:
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.emulate_media(reduced_motion='reduce')
        pg.goto(base + '/how-we-work', wait_until='networkidle')
        pg.wait_for_timeout(400)
        pg.screenshot(path=str(out / f'assistant-closed-{n}.png'))
        launcher = pg.locator('[data-chat-launcher]')
        launcher.click()
        pg.wait_for_timeout(300)
        r[f'assistant_{n}_open'] = {
            'expanded': launcher.get_attribute('aria-expanded'),
            'focus_in_input': pg.evaluate('document.activeElement.id === "assistant-message"'),
            'choices': pg.locator('[data-chat-suggestions] button').all_inner_texts(),
            'welcome': pg.locator('[data-chat-messages] .chat-message__text').first.inner_text()[:60],
            'overflowX': pg.evaluate('document.documentElement.scrollWidth - innerWidth'),
        }
        pg.screenshot(path=str(out / f'assistant-open-{n}.png'))
        if n == 'desktop':
            # Type to light the send button, then use a starter choice.
            pg.fill('#assistant-message', 'What specialties do you recruit for?')
            r['send_lit'] = pg.evaluate("getComputedStyle(document.querySelector('[data-chat-send]')).backgroundColor")
            pg.fill('#assistant-message', '')
            pg.locator('[data-chat-suggestions] button').first.click()
            pg.wait_for_function("document.querySelectorAll('[data-chat-messages] .chat-message').length >= 3", timeout=25000)
            pg.wait_for_timeout(300)
            r['after_choice'] = {
                'messages': pg.locator('[data-chat-messages] .chat-message').count(),
                'reply_links': pg.locator('[data-chat-messages] .chat-links a').all_inner_texts(),
                'suggestions_hidden': pg.locator('[data-chat-suggestions]').is_hidden(),
            }
            pg.screenshot(path=str(out / 'assistant-conversation-desktop.png'))
            pg.keyboard.press('Escape')
            pg.wait_for_timeout(150)
            r['escape_closes'] = pg.locator('[data-chat-panel]').is_hidden()
            r['focus_back_on_launcher'] = pg.evaluate('document.activeElement.hasAttribute("data-chat-launcher")')
        pg.close()
    b.close()

print(json.dumps(r, indent=1))
