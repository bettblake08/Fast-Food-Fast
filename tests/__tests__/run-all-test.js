import pti from "puppeteer-to-istanbul";

describe("Main Suite : ", ()=>{

	beforeAll(async ()=>{
		await Promise.all([
			page.coverage.startJSCoverage({
				resetOnNavigation: false
			}),
			//page.coverage.startCSSCoverage()
		]);
	});

	require("./pages/customer/sign_up");
	require("./pages/customer/sign_in");
	require("./pages/customer/order");
	require("./pages/admin/sign_in");
	require("./pages/admin/order_management");
	require("./pages/admin/menu_management");
    
	afterAll(async ()=>{
		const [jsCoverage] = await Promise.all([
			page.coverage.stopJSCoverage(),
			//page.coverage.stopCSSCoverage(),
		]);

		pti.write(jsCoverage);
	});
});