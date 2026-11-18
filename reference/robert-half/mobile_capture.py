from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    page=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
    page.goto('https://www.roberthalf.com/us/en/tech-it',wait_until='domcontentloaded',timeout=90000)
    page.wait_for_timeout(5000)
    consent=page.get_by_role('button',name='I understand',exact=True)
    if consent.count() and consent.first.is_visible(): consent.first.click()
    for y in range(0,page.evaluate('document.body.scrollHeight'),650):
        page.evaluate('(y)=>window.scrollTo(0,y)',y)
        page.wait_for_timeout(100)
    page.evaluate('window.scrollTo(0,0)')
    page.screenshot(path=str(root/'screenshots/mobile-full.png'),full_page=True)
    page.screenshot(path=str(root/'mobile-check.png'))
    print('Mobile document width:',page.evaluate('document.documentElement.scrollWidth'))
    browser.close()
