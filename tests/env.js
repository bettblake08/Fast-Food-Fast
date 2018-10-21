const pti = require("puppeteer-to-istanbul");
const PuppeteerEnvironment = require("jest-environment-puppeteer");

class CustomEnvironment extends PuppeteerEnvironment {
	async setup() {
		await super.setup();
		await Promise.all([
			page.coverage.startJSCoverage(),
			//page.coverage.startCSSCoverage()
		]);
	}

	async teardown() {
		const [jsCoverage] = await Promise.all([
			page.coverage.stopJSCoverage(),
			//page.coverage.stopCSSCoverage(),
		]);

		pti.write(jsCoverage);
		await super.teardown();
	}
}

module.exports = CustomEnvironment;