const { promisify } = require('util');

const { bsLocal } = require('./fixtures');

const stopLocalBrowserstack = async () => {
    if (!process.env.BROWSERSTACK) { return; }
    if (!(bsLocal && bsLocal.isRunning())) { return; }
    console.log('Stopping BrowserStackLocal ...');
    const promisifiedBsLocalStop = promisify(bsLocal.stop).bind(bsLocal);
    try {
        await promisifiedBsLocalStop();
    } catch (e) {
        console.error(e);
    }
};

const init = async () => {
    await stopLocalBrowserstack();
};

module.exports = init;
