const pti = require("puppeteer-to-istanbul");
const PuppeteerEnvironment = require("jest-environment-puppeteer");
const {
	setup: setupDevServer,
	teardown: teardownDevServer
} = require("jest-dev-server");

class CustomEnvironment extends PuppeteerEnvironment {
	async setup() {
		await super.setup();
		await setupDevServer({
			command: "python run.py",
			launchTimeout: 50000,
			port: 5000,
			usedPortAction: "error"
		});
		
		/*
		await Promise.all([
			page.coverage.startJSCoverage(),
			//page.coverage.startCSSCoverage()
		]);
		*/
	}

	async teardown() {
		/*
		const [jsCoverage] = await Promise.all([
			page.coverage.stopJSCoverage(),
			//page.coverage.stopCSSCoverage(),
		]);

		pti.write(jsCoverage);
		*/
		await teardownDevServer();		
		await super.teardown();
	}
}

module.exports = CustomEnvironment;