import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  forbidOnly: !!process.env.CI,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'pnpm run dev',
    cwd: '../../demo',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:3000',
  },
  workers: process.env.CI ? 1 : undefined,
})
