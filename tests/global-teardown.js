const pti = require("puppeteer-to-istanbul");
const {teardown: teardownPuppeteer} = require("jest-environment-puppeteer");

module.exports = async function globalTeardown() {
	const [jsCoverage] = await Promise.all([
		page.coverage.stopJSCoverage(),
		//page.coverage.stopCSSCoverage(),
	]);

	pti.write(jsCoverage);
    
	await teardownPuppeteer();
};