const pti = require("puppeteer-to-istanbul");

module.exports = async function globalCoverageTeardown() {
	const [jsCoverage] = await Promise.all([
		page.coverage.stopJSCoverage(),
		//page.coverage.stopCSSCoverage(),
	]);

	pti.write(jsCoverage);
};