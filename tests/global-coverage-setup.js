module.exports = async function globalCoverageSetup() {
	await Promise.all([
		page.coverage.startJSCoverage(),
		//page.coverage.startCSSCoverage()
	]);
};