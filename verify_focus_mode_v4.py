import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        print("Navigating to app...")
        await page.goto('http://localhost:5000', timeout=60000)

        # Step 0: Welcome
        print("Step 0...")
        # Use labels to find inputs
        await page.get_by_label("What's your name? *").fill('Test User')
        await page.get_by_label("Username *").fill('tester')
        await page.get_by_label("Password *").fill('password123')
        await page.get_by_label("City *").fill('Cairo')
        await page.get_by_label("Country *").fill('Egypt')

        await page.click('button:has-text("English")')

        # Step 1: Links
        print("Step 1...")
        await page.wait_for_selector('h2:has-text("Subject Links")')
        await page.click('button:has-text("Next")')

        # Step 2: Schedule
        print("Step 2...")
        await page.wait_for_selector('h2:has-text("Weekly Schedule")')
        await page.click('button:has-text("Next")')

        # Step 3: Goal
        print("Step 3...")
        await page.wait_for_selector('h2:has-text("Daily Study Goal")')
        await page.click('button:has-text("START PLANNING")')

        # Dashboard
        print("Waiting for Dashboard...")
        try:
            close_btn = page.locator('button:has-text("Close")')
            await close_btn.wait_for(state="visible", timeout=15000)
            await close_btn.click()
            print("Closed Welcome Modal")
        except:
            print("No Welcome Modal")

        # Find Start button
        print("Finding Start button...")
        start_btn = page.locator('button:has-text("Start")').first
        await start_btn.wait_for(state="visible", timeout=10000)
        await start_btn.click()
        print("Started Timer")

        # Focus Mode
        await page.click('button:has-text("Focus Mode")')
        print("Clicked Focus Mode")

        # Wait for Focus Mode Overlay
        await page.wait_for_selector('div.text-glow', timeout=10000)
        print("Focus Mode active!")

        # Take screenshot
        await page.screenshot(path='verification/focus_mode_final.png')
        print("Success: Focus Mode screenshot saved.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
