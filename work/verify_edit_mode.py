from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto("http://127.0.0.1:4187/", wait_until="networkidle")
    print("initial_read_only:", page.locator("[contenteditable='false']").count() > 0)
    page.locator("#edit-mode").click()
    print("editing_enabled:", page.locator("[contenteditable='true']").count() > 0)
    page.locator("#edit-mode").click()
    print("editing_disabled_again:", page.locator("[contenteditable='false']").count() > 0)
    browser.close()
