import { defineConfig, devices } from "@playwright/test";

const PORT = 3015;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "on-first-retry"
  },
  webServer: {
    command: `pnpm exec next dev --hostname 127.0.0.1 --port ${PORT}`,
    port: PORT,
    reuseExistingServer: false,
    env: {
      AI_BLOG_DEMO_MODE: "1",
      E2E_BYPASS_AUTH: "1",
      NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${PORT}`
    }
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
