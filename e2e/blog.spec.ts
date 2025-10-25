import { test, expect } from '@playwright/test';

test.describe('Blog Application', () => {
  test('should display blog list page', async ({ page }) => {
    await page.goto('/');
    
    // Wait for blogs to load
    await page.waitForSelector('h1:has-text("Tech Blog")');
    
    // Check if header is visible
    await expect(page.locator('h1')).toContainText('Tech Blog');
    
    // Check if search input is present
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });

  test('should search for blogs', async ({ page }) => {
    await page.goto('/');
    
    // Wait for blogs to load
    await page.waitForSelector('article, .group', { timeout: 10000 });
    
    // Type in search box
    await page.fill('input[type="search"]', 'sunt');
    
    // Wait a bit for filtering
    await page.waitForTimeout(500);
    
    // Check if results are filtered
    const cards = page.locator('a[href^="/blog/"]');
    await expect(cards.first()).toBeVisible();
  });

  test('should filter blogs by tag', async ({ page }) => {
    await page.goto('/');
    
    // Wait for blogs and tags to load
    await page.waitForSelector('h3:has-text("Filter by Tag")', { timeout: 10000 });
    
    // Click on a tag (not "All")
    const tagBadges = page.locator('div:has(> h3:has-text("Filter by Tag")) + div >> span');
    const firstTag = tagBadges.nth(1); // Skip "All" tag
    
    if (await firstTag.isVisible()) {
      await firstTag.click();
      
      // Wait for filtering
      await page.waitForTimeout(500);
      
      // Verify some blogs are still visible
      const cards = page.locator('a[href^="/blog/"]');
      await expect(cards.first()).toBeVisible();
    }
  });

  test('should navigate to blog details', async ({ page }) => {
    await page.goto('/');
    
    // Wait for blogs to load
    await page.waitForSelector('a[href^="/blog/"]', { timeout: 10000 });
    
    // Click on first blog card
    const firstBlog = page.locator('a[href^="/blog/"]').first();
    await firstBlog.click();
    
    // Wait for navigation
    await page.waitForURL(/\/blog\/\d+/);
    
    // Check if we're on the details page
    expect(page.url()).toMatch(/\/blog\/\d+$/);
    
    // Check if back button is present
    await expect(page.locator('button:has-text("Back to Articles")')).toBeVisible();
  });

  test('should display blog details correctly', async ({ page }) => {
    await page.goto('/blog/1');
    
    // Wait for content to load
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Check if title is visible
    const title = page.locator('h1').first();
    await expect(title).toBeVisible();
    
    // Check if tags are visible
    await expect(page.locator('span[class*="badge"]').first()).toBeVisible();
    
    // Check if author card is visible (if loaded)
    const authorCard = page.locator('div:has(> h3)');
    if (await authorCard.count() > 0) {
      await expect(authorCard.first()).toBeVisible();
    }
  });

  test('should navigate back from blog details', async ({ page }) => {
    await page.goto('/blog/1');
    
    // Wait for page to load
    await page.waitForSelector('button:has-text("Back to Articles")');
    
    // Click back button
    await page.click('button:has-text("Back to Articles")');
    
    // Wait for navigation
    await page.waitForURL('/');
    
    // Check if we're back on the list page
    expect(page.url()).toMatch(/\/$/);
    await expect(page.locator('h1:has-text("Tech Blog")')).toBeVisible();
  });

  test('should handle non-existent blog', async ({ page }) => {
    await page.goto('/blog/99999');
    
    // Wait for error message
    await page.waitForSelector('text=Blog post not found', { timeout: 10000 });
    
    // Check if error message is displayed
    await expect(page.locator('text=Blog post not found')).toBeVisible();
    
    // Check if back button is present
    await expect(page.locator('button:has-text("Back to Blog List")')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Wait for content
    await page.waitForSelector('h1:has-text("Tech Blog")');
    
    // Check if header is still visible
    await expect(page.locator('h1:has-text("Tech Blog")')).toBeVisible();
    
    // Check if search is visible
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });
});
