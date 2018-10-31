const PAGE = PATH + "/admin/orderManagement";
const SCR_PATH = `${SCREENSHOT_PATH}admin-order-management-tests-`;

describe("Admin Order Management Page: ", () => {
	beforeAll(async () => {
		await page.goto(PAGE, {
			waitUntil: "domcontentloaded"
		});

		const pageTitle = await page.title();

		await page.screenshot({
			path: `${SCR_PATH}0-1.jpg`
		});

		if (pageTitle == "Admin Sign In") {
			await page.type("#username", "johndoe2");
			await page.type("#password", "johndoe@A2");
			await page.click(".login__save button");
			await page.waitFor(2000);
			
			await page.screenshot({
				path: `${SCR_PATH}0-2.jpg`
			});
			return;
		}

		await page.goto(PAGE, {
			waitUntil: "domcontentloaded"
		});
	});

	it("Test order hover to view ordered items", async () => {
		let orders = await page.$$(".order");
		await orders[0].hover();

		await page.waitFor(300);

		await page.screenshot({
			path: `${SCR_PATH}1-1.jpg`
		});

		const hoverResult = await orders[0].$eval(".order__items",(elem)=>{
			return elem.height != 0;
		});

		await page.screenshot({
			path: `${SCR_PATH}1-2.jpg`
		});

		expect(hoverResult).toBe(true);
	},10000);
    
	it("Test order confirm button", async () => {
		let orderItems = await page.$$(".order"),
			orderItemOnFocus = null;

		await page.screenshot({
			path: `${SCR_PATH}2-1.jpg`
		});

		orderItems.forEach(async elem => {
			let status = await elem.$(".order__status--pending");

			if(status != null){
				orderItemOnFocus = elem;
				return;
			}
		});

		if(orderItemOnFocus != null){
			let setAsButton = await orderItemOnFocus.$(".ddButtons__main__button");

			await setAsButton.click();
			await page.waitFor(200);

			await page.screenshot({
				path: `${SCR_PATH}2-2.jpg`
			});

			let setAsOptions = await orderItemOnFocus.$$(".ddButtons__button");

			await setAsOptions[0].click();
			await page.waitFor(500);

			await page.screenshot({
				path: `${SCR_PATH}2-3.jpg`
			});

			const statusResult = await orderItemOnFocus.$eval(".order__status--processing", (elem) => {
				return elem != null;
			});

			expect(statusResult).toBe(true);
		}
	},10000);
    
	it("Test order cancel button", async () => {
		let orderItems = await page.$$(".order"),
			orderItemOnFocus = null;
		
		await page.screenshot({
			path: `${SCR_PATH}3-1.jpg`
		});

		orderItems.forEach(async elem => {
			let status = await elem.$(".order__status--pending");

			if (status != null) {
				orderItemOnFocus = elem;
				return;
			}
		});

		if(orderItemOnFocus != null){
			let setAsButton = await orderItemOnFocus.$(".ddButtons__main button");

			await setAsButton.click();
			await page.waitFor(200);

			await page.screenshot({
				path: `${SCR_PATH}3-2.jpg`
			});

			let setAsOptions = await orderItemOnFocus.$$(".ddButtons__button");

			await setAsOptions[1].click();
			await page.waitFor(500);

			await page.screenshot({
				path: `${SCR_PATH}3-3.jpg`
			});

			const result = await page.evaluate(() => {
				let items = document.querySelectorAll(".order");
				let status = items[0].querySelector(".order__status--cancelled");

				return status != null;
			});

			expect(result).toBe(true);
		}
	});
    
	it("Test order complete button", async () => {
		let orderItems = await page.$$(".order"),
			orderItemOnFocus = null;

		await page.screenshot({
			path: `${SCR_PATH}4-1.jpg`
		});

		orderItems.forEach(async elem => {
			let status = await elem.$(".order__status--processing");

			if (status != null) {
				orderItemOnFocus = elem;
				return;
			}
		});

		if(orderItemOnFocus != null){
			let setAsButton = await orderItemOnFocus.$(".ddButtons__main button");
			await setAsButton.click();
			await page.waitFor(200);

			await page.screenshot({
				path: `${SCR_PATH}4-2.jpg`
			});

			let setAsOptions = await orderItemOnFocus.$$(".ddButtons__button");
			await setAsOptions[0].click();
			await page.waitFor(500);

			await page.screenshot({
				path: `${SCR_PATH}4-3.jpg`
			});

			const result = await page.evaluate(() => {
				let items = document.querySelectorAll(".order");
				let status = items[0].querySelector(".order__status--complete");

				return status != null;
			});

			expect(result).toBe(true);
		}
	});

});