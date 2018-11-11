import pti from "puppeteer-to-istanbul";

async function globalCoverageTeardown() {
	const [jsCoverage] = await Promise.all([
		page.coverage.stopJSCoverage(),
		//page.coverage.stopCSSCoverage(),
	]);

	pti.write(jsCoverage);
}

export default globalCoverageTeardown;