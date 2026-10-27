import { defineConfig, devices } from '@playwright/test';

// Robot browser used for accessibility scans and persona walkthroughs.
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  use: { baseURL: 'http://localhost:5173' },
  webServer: { command: 'npm run dev', url: 'http://localhost:5173', reuseExistingServer: true },
  projects: [
    { name: 'phone', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
  ],
});
