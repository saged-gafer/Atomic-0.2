import asyncio
from playwright.async_api import async_playwright
import os

async def run_verification():
    async with async_playwright() as p:
        # Connect to the existing server
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        url = "http://localhost:5000"
        print(f"Navigating to {url}...")
        await page.goto(url)

        # 1. Wait for AuthScreen
        await page.wait_for_selector("text=ATOMIC", timeout=10000)
        print("AuthScreen loaded.")

        # 2. Click "Get Started" to go to onboarding
        await page.get_by_role("button", name=r"Get Started").click()
        print("Clicked 'Get Started'.")

        # 3. Fill out Onboarding Step 0
        print("Filling Step 0...")
        await page.wait_for_selector("input", timeout=5000)
        inputs = page.locator("input")
        await inputs.nth(0).fill("Test User")
        await inputs.nth(1).fill("testuser")
        await inputs.nth(2).fill("password123")
        await inputs.nth(3).fill("Riyadh")
        await inputs.nth(4).fill("Saudi Arabia")

        await page.get_by_role("button", name="English").click()
        print("Proceeded to Step 1.")

        # 4. Step 1 (Resources)
        await page.wait_for_selector("text=Subject Learning Resources")
        await page.get_by_role("button", name="Next", exact=True).click()
        print("Proceeded to Step 2.")

        # 5. Step 2 (Schedule)
        await page.wait_for_selector("text=Your Weekly Schedule")
        await page.get_by_role("button", name="Next", exact=True).click()
        print("Proceeded to Step 3.")

        # 6. Step 3 (Goal / AuraDial)
        await page.wait_for_selector("text=How many hours")
        print("AuraDial visible.")

        await page.get_by_text("START PLANNING!").click()
        print("Clicked 'Start Planning'.")

        # 7. Close Welcome Modal
        print("Waiting for Welcome Modal...")
        close_btn = page.get_by_role("button", name="✦ Close ✦")
        await close_btn.wait_for(state="visible", timeout=10000)
        await close_btn.click()
        print("Closed Welcome Modal.")

        # Take a screenshot of the dashboard state
        await page.wait_for_timeout(2000)
        os.makedirs("verification", exist_ok=True)
        await page.screenshot(path="verification/dashboard_state.png")
        print("Screenshot 'dashboard_state.png' saved.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verification())
