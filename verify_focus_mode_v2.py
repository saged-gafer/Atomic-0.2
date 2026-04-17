import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Increase timeout for slow dev server
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        print("Navigating to app...")
        try:
            await page.goto('http://localhost:5000', timeout=60000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            await browser.close()
            return

        # Step 0: Login/Signup
        print("Filling Step 0...")
        await page.fill('input[label*="Name"]', 'Test User')
        await page.fill('input[label*="Username"]', 'tester')
        await page.fill('input[label*="Password"]', 'password123')
        await page.fill('input[label*="City"]', 'Cairo')
        await page.fill('input[label*="Country"]', 'Egypt')

        # Click English
        await page.click('button:has-text("English")')

        # Step 1: Links
        print("Step 1...")
        await page.wait_for_selector('h2:has-text("Subject Links")')
        await page.click('button:has-text("Next")')

        # Step 2: Schedule
        print("Step 2...")
        await page.wait_for_selector('h2:has-text("Weekly Schedule")')
        await page.click('button:has-text("Next")')

        # Step 3: Goal (AuraDial)
        print("Step 3 (AuraDial)...")
        await page.wait_for_selector('h2:has-text("Daily Study Goal")')
        # AuraDial is present. Let's just finish.
        await page.click('button:has-text("START PLANNING")')

        # Dashboard
        print("Waiting for Dashboard...")
        # The welcome modal might appear
        try:
            close_btn = page.locator('button:has-text("Close")')
            await close_btn.wait_for(state="visible", timeout=10000)
            await close_btn.click()
            print("Closed Welcome Modal")
        except:
            print("Welcome Modal did not appear or already closed")

        # Now find the first subject's Start button
        print("Finding Start button...")
        start_btn = page.locator('button:has-text("Start")').first
        await start_btn.wait_for(state="visible")
        await start_btn.click()
        print("Started Timer")

        # Click Focus Mode
        print("Entering Focus Mode...")
        focus_btn = page.locator('button:has-text("Focus Mode")').first
        await focus_btn.click()

        # Wait for Focus Mode Overlay
        await page.wait_for_selector('div.text-glow', timeout=5000)
        print("Focus Mode active!")

        # Take screenshot
        await page.screenshot(path='verification/focus_mode_final.png')
        print("Screenshot saved to verification/focus_mode_final.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
