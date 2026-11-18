import json, time
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width":1440,"height":1000}, device_scale_factor=1)
    page.goto('https://www.roberthalf.com/us/en/tech-it', wait_until='domcontentloaded', timeout=90000)
    page.wait_for_timeout(6000)
    page.screenshot(path=str(ROOT/'screenshots/00-initial-desktop.png'))
    print(page.title(), page.url, flush=True)
    print(page.locator('body').inner_text()[:300], flush=True)
    for name in ['I understand','Reject All','Reject all','Accept All Cookies','Accept all cookies']:
        button=page.get_by_role('button',name=name,exact=True)
        if button.count() and button.first.is_visible():
            button.first.click()
            break
    for y in range(0, page.evaluate('document.body.scrollHeight'), 750):
        page.evaluate('(y)=>window.scrollTo(0,y)',y)
        page.wait_for_timeout(250)
    page.evaluate('window.scrollTo(0,0)')
    page.wait_for_timeout(1000)
    page.screenshot(path=str(ROOT/'screenshots/01-desktop-full.png'),full_page=True)
    meta=page.evaluate('''() => ({title:document.title,height:document.body.scrollHeight, headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({tag:e.tagName,text:e.textContent.trim(),y:Math.round(e.getBoundingClientRect().top+scrollY),parent:e.parentElement.className})), images:[...document.images].map(e=>({src:e.currentSrc,alt:e.alt,width:e.naturalWidth,height:e.naturalHeight,visible:!!e.getClientRects().length,rect:{x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y+scrollY,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}})), videos:[...document.querySelectorAll('video,iframe')].map(e=>({tag:e.tagName,src:e.src,poster:e.poster})), typography:[...document.querySelectorAll('h1,h2,h3,p,a,button')].filter(e=>e.getBoundingClientRect().width).slice(0,100).map(e=>({tag:e.tagName,font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize,weight:getComputedStyle(e).fontWeight,color:getComputedStyle(e).color})), sections:[...document.querySelectorAll('main > *,main section')].map(e=>({tag:e.tagName,class:e.className,id:e.id,y:Math.round(e.getBoundingClientRect().top+scrollY),height:Math.round(e.getBoundingClientRect().height)}))})''')
    meta['images']=[im for im in meta['images'] if im['width']>10]
    meta['videos']=[v for v in meta['videos'] if 'doubleclick' not in v['src']]
    meta['backgrounds']=page.evaluate('''() => [...document.querySelectorAll('*')].map(e=>({tag:e.tagName,background:getComputedStyle(e).backgroundImage,rect:{x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y+scrollY,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}})).filter(e=>e.background.includes('url(')&&e.rect.width>30)''')
    (ROOT/'inspection.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')
    for i,el in enumerate(page.locator('*').all()):
        try:
            if el.evaluate('(e)=>getComputedStyle(e).backgroundImage.includes("url(")') and el.is_visible():
                box=el.bounding_box()
                if box and box['width']>30 and box['height']>30:
                    el.screenshot(path=str(ROOT/f'images/background-{i:04d}.png'),timeout=2000)
        except Exception: pass
    for i,y in enumerate(range(0,meta['height'],850)):
        page.evaluate('(y)=>window.scrollTo(0,y)',y)
        page.wait_for_timeout(150)
        page.screenshot(path=str(ROOT/f'screenshots/desktop-{i+1:02d}.png'))
    for i,img in enumerate(page.locator('img').all()):
        try:
            box=img.bounding_box()
            if img.is_visible() and box and box['width']>30 and box['height']>30:
                img.screenshot(path=str(ROOT/f'images/image-{i:02d}.png'),timeout=5000)
        except Exception: pass
    page.set_viewport_size({'width':390,'height':844})
    page.evaluate('window.scrollTo(0,0)')
    page.wait_for_timeout(1000)
    page.screenshot(path=str(ROOT/'screenshots/mobile-full.png'),full_page=True)
    browser.close()
    print('Captured',meta['height'],'px;',len(meta['images']),'image elements;',len(meta['videos']),'video/iframe elements',flush=True)
