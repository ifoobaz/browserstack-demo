import { devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`),
});

const buildName = `Browserstack Demo Scenario #1 - ${(new Date()).getDay()}-${(new Date()).getMonth()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}`;

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
    testDir: './tests/',

    globalSetup: require.resolve('./global-setup'),
    globalTeardown: require.resolve('./global-teardown'),

    // proxy: {
    //   server: `${process.env.PROXY_PROTOCOL}://${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`,
    // },

    /* Maximum time one test can run for. */
    timeout: 120000,

    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 120000,
    },

    /* Run tests in files in parallel */
    fullyParallel: true,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only */
    retries: process.env.CI ? 3 : 0,

    /* Opt out of parallel tests on CI. */
    workers: 6,

    reporter: [['list', { printSteps: true }]],

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        viewport: { width: 1920, height: 1080 },

        headless: false,

        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,

        baseURL: process.env.BASE_URL,

        ignoreHTTPSErrors: true,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        // -- Local Projects --
        {
            name: 'local.chrome',
            use: {
                ...devices['Desktop Chrome'],
            },
        },

        {
            name: 'local.firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },

        {
            name: 'local.safari',
            use: {
                ...devices['Desktop Safari'],
            },
        },

        // -- BrowserStack Projects --
        {
            name: 'browserstack.chrome',
            use: {
                // ...devices['Desktop Chrome'],
                headless: true,

                browserStackOptions: {
                    buildName,
                    browser: 'chrome',
                    os: 'Windows',
                    os_version: '10',
                    browser_version: 'latest',
                },
            },
        },
        {
            name: 'browserstack.firefox',
            use: {
                // ...devices['Desktop Firefox'],
                headless: true,

                browserStackOptions: {
                    buildName,
                    browser: 'playwright-firefox',
                    os: 'Windows',
                    os_version: '10',
                    browser_version: 'latest',
                },
            },
        },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',
};

module.exports = config;
