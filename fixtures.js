const base = require('@playwright/test');
const cp = require('child_process');
const { chromium, _android } = require('playwright');
const BrowserStackLocal = require('browserstack-local');

const bsLocal = new BrowserStackLocal.Local();

const getClientPlayWrightVersion = () => {
    const result = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];
    return result;
};

const mergeBrowserStackOptionsWithDefault = (options = {}) => ({
    'browserstack.username': process.env.BROWSERSTACK_USERNAME,
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.local': true,
    'browserstack.console': 'verbose',
    'browserstack.playwrightLogs': true,
    'client.playwrightVersion': getClientPlayWrightVersion(),
    ...options,
});

const parseBrowserStackOptions = (info) => info?.project?.use?.browserStackOptions ?? null;

const parseSessionStatus = (status) => {
    if (!status) { return ''; }
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === 'passed') {
        return 'passed';
    }

    if (normalizedStatus === 'failed' || normalizedStatus === 'timedout') {
        return 'failed';
    }

    return '';
};

const getNestedKeyValue = (hash, keys) => {
    const isHash = (entity) => Boolean(entity && typeof (entity) === 'object' && !Array.isArray(entity));
    return keys.reduce((h, key) => (isHash(h) ? h[key] : undefined), hash);
};

const getTestResult = (testInfo) => {
    const result = {
        action: 'setSessionStatus',
        arguments: {
            status: parseSessionStatus(testInfo.status),
            reason: getNestedKeyValue(testInfo, ['error', 'message']),
        },
    };
    return result;
};

const test = base.test.extend({
    page: async ({ page }, use, testInfo) => {
        const browserStackOptions = parseBrowserStackOptions(testInfo);

        if (!browserStackOptions) {
            await use(page);
            return;
        }

        const mergedBrowserStackOptions = mergeBrowserStackOptionsWithDefault(browserStackOptions);
        mergedBrowserStackOptions.name = `[${testInfo.titlePath[1]}] ${testInfo.title}`;

        try {
            switch (true) {
                case (browserStackOptions.realMobile === 'true'): {
                    const vDevice = await _android.connect(`wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(mergedBrowserStackOptions))}`);
                    await vDevice.shell('am force-stop com.android.chrome');
                    const vBrowser = await vDevice.launchBrowser({
                        ...testInfo.project.use,
                    });
                    const vPage = await vBrowser.newPage();

                    await use(vPage);

                    const testResult = getTestResult(testInfo);

                    await vPage.evaluate(() => {}, `browserstack_executor: ${JSON.stringify(testResult)}`);

                    await vBrowser.close();
                    await vDevice.close();
                    break;
                }
                default: {
                    const vBrowser = await chromium.connect({
                        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(mergedBrowserStackOptions))}`,
                    });
                    const vContext = await vBrowser.newContext(testInfo.project.use);
                    const vPage = await vContext.newPage();

                    await use(vPage);

                    const testResult = getTestResult(testInfo);

                    await vPage.evaluate(() => {}, `browserstack_executor: ${JSON.stringify(testResult)}`);
                    await vPage.close();
                    await vBrowser.close();
                }
            }
        } catch (e) {
            console.error(e);
        }
    },
});

module.exports = {
    test,
    bsLocal,
};
