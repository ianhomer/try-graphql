import type { PlaywrightTestConfig } from "@playwright/test";

const timeout = (process.env.CI ? 30 : 10) * 1000;

const config: PlaywrightTestConfig = {
  timeout,
  use: {
    baseURL: "http://localhost:3000",
    headless: !!process.env.CI,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
  },
  webServer: {
    command: "cd ../.. && pnpm start",
    url: "http://127.0.0.1:3000",
    timeout,
    reuseExistingServer: !process.env.CI,
  },
};
export default config;
