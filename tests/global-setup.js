// global-setup.js
const {setup: setupPuppeteer} = require("jest-environment-puppeteer");

module.exports = async function globalSetup() {
	await setupPuppeteer();
	await Promise.all([
		page.coverage.startJSCoverage(),
		//page.coverage.startCSSCoverage()
	]);
};