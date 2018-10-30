const {
	teardown: teardownPuppeteer
} = require("jest-environment-puppeteer");

const pti = require("puppeteer-to-istanbul");
const {	teardown: teardownDevServer } = require("jest-dev-server");


module.exports = async () => {
	/* const [jsCoverage] = await Promise.all([
		page.coverage.stopJSCoverage(),
		//page.coverage.stopCSSCoverage(),
	]);

	pti.write(jsCoverage); */

	await teardownPuppeteer();
	await teardownDevServer();
};