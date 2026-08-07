from playwright.sync_api import sync_playwright
from pypdf import PdfReader

out = r"C:\Users\mfsen\Documents\Codex\2026-07-21\files-mentioned-by-the-user-build\work\cv-auto-check.pdf"
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto("http://127.0.0.1:4187/", wait_until="networkidle")
    page.emulate_media(media="print")
    page.add_style_tag(content="@media print { .cv-paper { height:auto !important; min-height:0 !important; max-height:none !important; } }")
    page.pdf(path=out, format="A4", print_background=True, prefer_css_page_size=True)
    browser.close()
reader = PdfReader(out)
print("pages:", len(reader.pages))
print("page1_text:", len(reader.pages[0].extract_text() or ""))
