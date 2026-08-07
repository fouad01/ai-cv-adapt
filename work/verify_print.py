from playwright.sync_api import sync_playwright
from pypdf import PdfReader

url = "http://127.0.0.1:4187/"
pdf_path = r"C:\Users\mfsen\Documents\Codex\2026-07-21\files-mentioned-by-the-user-build\work\cv-print-check.pdf"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto(url, wait_until="networkidle")
    page.wait_for_timeout(1000)
    photo = page.locator(".profile-photo")
    print("photo_count:", photo.count())
    print("photo_natural_width:", photo.evaluate("el => el.naturalWidth"))
    page.emulate_media(media="print")
    print("print_metrics:", page.evaluate("""() => {
      const paper = document.querySelector('.cv-paper');
      const rect = paper.getBoundingClientRect();
      return { paperHeight: rect.height, paperBottom: rect.bottom, paperWidth:rect.width, paperRight:rect.right, bodyHeight: document.body.scrollHeight, bodyWidth:document.body.scrollWidth, htmlHeight: document.documentElement.scrollHeight, htmlWidth:document.documentElement.scrollWidth, children: [...document.body.children].map(el => ({tag:el.tagName, class:el.className, height:el.getBoundingClientRect().height, bottom:el.getBoundingClientRect().bottom})), dpiHeight: 1122.52 };
    }"""))
    page.pdf(path=pdf_path, format="A4", print_background=True, prefer_css_page_size=True)
    browser.close()

reader = PdfReader(pdf_path)
text = "\n".join(page.extract_text() or "" for page in reader.pages)
print("pages:", len(reader.pages))
for index, pdf_page in enumerate(reader.pages, start=1):
    page_text = pdf_page.extract_text() or ""
    print(f"page_{index}_text_length:", len(page_text))
    print(f"page_{index}_start:", page_text[:180].replace("\n", " | "))
print("has_candidate_name:", "John Doe" in text)
print("text_length:", len(text))
