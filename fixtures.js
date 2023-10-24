const base = require('@playwright/test');

const updateSessionStatus = async (page, testInfo) => {
    if (!page) { return; }
    const parseSessionStatus = (status) => {
        if (!status) { return ''; }
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === 'passed') { return 'passed'; }
        if (normalizedStatus === 'failed' || normalizedStatus === 'timedout') { return 'failed'; }
        return '';
    };
    const getNestedKeyValue = (hash, keys) => {
        const isHash = (entity) => Boolean(entity && typeof (entity) === 'object' && !Array.isArray(entity));
        return keys.reduce((h, key) => (isHash(h) ? h[key] : undefined), hash);
    };

    const result = await JSON.parse(await page.evaluate(() => {}, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: {
            status: parseSessionStatus(testInfo.status),
            reason: getNestedKeyValue(testInfo, ['error', 'message']),
        },
    })}`));
    return result;
};

const updateSessionName = async (page, sessionName = '') => {
    if (!(page && sessionName)) { return; }

    const result = await JSON.parse(await page.evaluate(() => {}, `browserstack_executor: ${JSON.stringify({
        action: 'setSessionName',
        arguments: {
            name: sessionName,
        },
    })}`));
    return result;
};

const getSessionDetails = async (page) => {
    if (!page) { return; }
    const result = await JSON.parse(await page.evaluate(() => {}, `browserstack_executor: ${JSON.stringify({
        action: 'getSessionDetails',
        arguments: {},
    })}`));
    return result;
};

const test = base.test.extend({
    page: async ({ page }, use, testInfo) => {
        if (!process.env.BROWSERSTACK_AUTOMATION) { return; }
        await use(page);
        try {
            const testName = `[${testInfo.titlePath[1]}] ${testInfo.title}`;
            await updateSessionStatus(page, testInfo);
            await updateSessionName(page, testName);
        } catch (e) {
            console.error(e);
        }
    },
});

module.exports = {
    test,
};
