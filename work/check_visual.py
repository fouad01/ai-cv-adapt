from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1100})
    page.goto("http://127.0.0.1:4187/", wait_until="networkidle")
    page.screenshot(path=r"C:\Users\mfsen\Documents\Codex\2026-07-21\files-mentioned-by-the-user-build\work\cv-layout-check.png", full_page=True)
    print("skill_rows:", page.locator(".skill-row").count())
    print("certifications:", page.locator(".credential-list li").count())
    print("console_ready:", page.locator(".cv-paper").count() == 1)
    browser.close()
