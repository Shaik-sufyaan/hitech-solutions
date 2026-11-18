"""Capture review screenshots of the local preview.

Usage: python -I scripts/capture.py <base_url> <out_dir> [path ...]
Writes desktop (1440), tablet (834) and mobile (390) full-page captures plus
first-viewport crops, and prints basic layout diagnostics (horizontal overflow,
missing alt text, broken images).
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

VIEWPORTS = {
    "desktop": (1440, 900),
    "tablet": (834, 1112),
    "mobile": (390, 844),
}


def main() -> None:
    base = sys.argv[1].rstrip("/")
    out = Path(sys.argv[2])
    paths = sys.argv[3:] or ["/"]
    out.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for path in paths:
            slug = "home" if path == "/" else path.strip("/").replace("/", "-")
            for name, (w, h) in VIEWPORTS.items():
                page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
                page.emulate_media(reduced_motion="reduce")
                page.goto(base + path, wait_until="networkidle")
                page.evaluate("document.fonts.ready")
                page.wait_for_timeout(300)
                page.screenshot(path=str(out / f"{slug}-{name}-fold.png"))
                # Scroll through so lazy images load before the full-page capture.
                height = page.evaluate("document.documentElement.scrollHeight")
                for y in range(0, height, h // 2):
                    page.evaluate(f"window.scrollTo(0, {y})")
                    page.wait_for_timeout(120)
                page.evaluate("window.scrollTo(0, 0)")
                page.wait_for_load_state("networkidle")
                page.wait_for_timeout(300)
                page.screenshot(path=str(out / f"{slug}-{name}.png"), full_page=True)
                diag = page.evaluate(
                    """() => ({
                      overflowX: document.documentElement.scrollWidth - window.innerWidth,
                      height: document.documentElement.scrollHeight,
                      missingAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
                      brokenImages: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src),
                      h1: [...document.querySelectorAll('h1')].map(e => e.textContent.trim()),
                      headings: [...document.querySelectorAll('h1,h2,h3')].map(e => e.tagName + ' ' + e.textContent.trim().slice(0, 50)),
                    })"""
                )
                print(slug, name, json.dumps(diag))
                page.close()
        browser.close()


if __name__ == "__main__":
    main()
