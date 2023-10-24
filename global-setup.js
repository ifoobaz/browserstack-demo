const { promisify } = require('util');

const { bsLocal } = require('./fixtures');

const runLocalBrowserstack = async () => {
    if (!process.env.BROWSERSTACK) { return; }
    console.log('Starting BrowserStackLocal ...');
    const promisifiedBsLocalStart = promisify(bsLocal.start).bind(bsLocal);
    const bsConfig = {
        key: process.env.BROWSERSTACK_ACCESS_KEY,
    };
    try {
        await promisifiedBsLocalStart(bsConfig);
    } catch (e) {
        console.log(e);
    }
};

const init = async () => {
    await runLocalBrowserstack();
};

module.exports = init;
