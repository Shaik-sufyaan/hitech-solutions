import json, html, base64
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent
data=json.loads((root/'inspection.json').read_text())
names=['hero','staffing-overview','technical-specialties','industries','engagement-models','hiring-process','office-search','case-studies','recognition','insights','faqs','related-services','closing-cta']
hs=[h for i,h in enumerate(data['headings']) if h['tag']=='H2' and h['y']>500 and i not in [16,17,18]]
starts=[0]+[max(0,h['y']-96) for h in hs]+[9435]
full=Image.open(root/'screenshots/01-desktop-full.png')
(root/'sections').mkdir(exist_ok=True)
for i,name in enumerate(names+['footer']):
    end=starts[i+1] if i+1<len(starts) else full.height
    full.crop((0,starts[i],full.width,end)).save(root/f'sections/{i+1:02d}-{name}.png')
manifest=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    page=browser.new_page(viewport={'width':900,'height':900})
    for i,item in enumerate(data['images']):
        url=item['src']
        if not url or 'scene7.com' not in url: continue
        try:
            page.goto(url,wait_until='load',timeout=30000)
            page.locator('img').evaluate('(e)=>e.decode()')
            name=f'asset-{i+1:02d}.png'
            page.locator('img').screenshot(path=str(root/'images'/name))
            manifest.append({'file':name,'source':url,'width':item['width'],'height':item['height'],'status':'captured'})
        except Exception as e: manifest.append({'source':url,'status':'failed','error':str(e)})
    browser.close()
(root/'asset-manifest.json').write_text(json.dumps(manifest,indent=2))
# Keep geometry and typography; omit a verbatim heading transcription.
for i,h in enumerate(data['headings']): h['text']=f'heading-{i+1:02d}'
(root/'inspection.json').write_text(json.dumps(data,indent=2))
files=list((root/'sections').glob('*.png'))
sheet=Image.new('RGB',(1400,((len(files)+3)//4)*290),'#eee')
draw=ImageDraw.Draw(sheet)
for i,f in enumerate(files):
    x,y=(i%4)*350,(i//4)*290
    draw.text((x+8,y+8),f.stem,fill='black')
    sheet.paste(ImageOps.contain(Image.open(f),(334,250)),(x+8,y+30))
sheet.save(root/'contact-sheet.jpg')
parts=['<!doctype html><html><meta charset="utf-8"><title>Hitech Solutions — reference capture</title><style>body{font:16px system-ui;background:#eef2f3;color:#17282e;margin:40px auto;max-width:1200px}a{color:#0b6e76}img{max-width:100%;background:white;border:1px solid #ccd5d8}section{margin:48px 0}.assets{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.assets img{max-height:300px}small{display:block;overflow-wrap:anywhere}</style><h1>Hitech Solutions · reference capture</h1><p>Source: <a href="https://www.roberthalf.com/us/en/tech-it">Robert Half technology landing page</a>. Captured November 16, 2026. Reference-only images, not production assets.</p><p>Desktop: 1440 × 1000. Mobile: 390 × 844. Some embedded third-party content displayed Access Denied; the source captures preserve those errors. Section crops show the initial carousel/tab/FAQ states, not all interaction states.</p><p><a href="screenshots/01-desktop-full.png">Full desktop</a> · <a href="screenshots/mobile-full.png">Full mobile</a> · <a href="screenshots/00-initial-desktop.png">Initial consent overlay</a> · <a href="../../docs/superpowers/plans/2026-11-16-hitech-homepage.md">Hitech plan</a></p>']
for f in files: parts.append(f'<section><h2>{html.escape(f.stem)}</h2><a href="sections/{f.name}"><img loading="lazy" src="sections/{f.name}"></a></section>')
parts.append('<h2>Individual source image captures</h2><div class="assets">')
for item in manifest:
    if item['status']=='captured': parts.append(f'<figure><a href="images/{item["file"]}"><img loading="lazy" src="images/{item["file"]}"></a><figcaption>{item["file"]} · {item["width"]} × {item["height"]}<small><a href="{html.escape(item["source"])}">Source asset</a></small></figcaption></figure>')
parts.append('</div></html>')
(root/'index.html').write_text(''.join(parts),encoding='utf-8')
print('Sections:',len(files),'asset captures:',sum(i['status']=='captured' for i in manifest),'failed:',sum(i['status']=='failed' for i in manifest))
