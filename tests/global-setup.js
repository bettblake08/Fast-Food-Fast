const {setup: setupPuppeteer} = require("jest-environment-puppeteer");
const {setup: setupDevServer} = require("jest-dev-server");

module.exports =  async () => {
	await setupDevServer({
		command: "python run.py",
		launchTimeout: 50000,
		port: 5000,
		usedPortAction: "error"
	});
	await setupPuppeteer();

	/* 
	await Promise.all([
		page.coverage.startJSCoverage(),
		//page.coverage.startCSSCoverage()
	]); */

};