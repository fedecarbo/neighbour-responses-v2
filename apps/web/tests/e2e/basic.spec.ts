import { test, expect } from '@playwright/test'

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/')
  
  // Check if the page loads
  await expect(page).toHaveTitle(/Next.js/)
  
  // Basic functionality test - page should be interactive
  await expect(page.locator('body')).toBeVisible()
})

test('API endpoint returns applications data', async ({ request }) => {
  const response = await request.get('/api/applications')
  expect(response.ok()).toBe(true)
  
  const data = await response.json()
  expect(data).toHaveProperty('applications')
  expect(data).toHaveProperty('total')
  expect(Array.isArray(data.applications)).toBe(true)
})