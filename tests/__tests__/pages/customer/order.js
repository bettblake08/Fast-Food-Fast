import pti from "puppeteer-to-istanbul";

const PAGE = PATH + "/customer/order";
const SCR_PATH = `${SCREENSHOT_PATH}customer-order-menu-tests-`;

describe("Customer Order Menu: ", () => {
	let orderButton = ".foodMenu__orderBtn button";

	beforeAll(async () => {
		await page.goto(PAGE, {
			waitUntil: "domcontentloaded"
		});

		const pageTitle = await page.title();

		if (pageTitle == "Sign In") {
			await page.type("#username", "johndoe1");
			await page.type("#password", "johndoe@A1");
			await page.click(".login__save button");
			await page.waitFor(2000);
		}

		await page.coverage.startJSCoverage({
			resetOnNavigation: false
		});

		await page.goto(PAGE, {
			waitUntil: "domcontentloaded"
		});
	});

	it("Test using no ordered items", async () => {
		await page.click(orderButton);
		await page.waitFor(500);

		await page.screenshot({
			path: `${SCR_PATH}1-1.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelector(".foodMenu__error");
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(3000);

		await page.screenshot({
			path: `${SCR_PATH}1-2.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelector(".foodMenu__error");
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	});

	it("Test menu item add quantity", async () => {
		let orderItemAddButtons = await page.$$(".foodItem__quantity__add");
		orderItemAddButtons[0].click();

		await page.waitFor(500);
		await page.screenshot({
			path:`${SCR_PATH}2-1.jpg`
		});

		const result =  await page.evaluate(()=>{
			let item = document.querySelectorAll(".foodItem")[0];

			let orderTotal = document.querySelector(".foodMenu__total"),
				itemTotal = item.querySelector(".foodItem__total"),
				itemQuantity = item.querySelector(".foodItem__quantity__value");

			if (orderTotal.innerHTML == "KSH 0" ||
				itemTotal.innerHTML == "KSH 0" ||
				itemQuantity.innerHTML == "0" ) {
				return false;
			}

			return true;
		});

		expect(result).toBe(true);
	});

	it("Test menu item subtract quantity", async () => {
		let orderItemSubButtons = await page.$$(".foodItem__quantity__sub");

		orderItemSubButtons[0].click();

		await page.waitFor(200);
		await page.screenshot({
			path: `${SCR_PATH}3-1.jpg`
		});

		const subResult = await page.evaluate(() => {
			let item = document.querySelectorAll(".foodItem")[0];

			let orderTotal = document.querySelector(".foodMenu__total"),
				itemTotal = item.querySelector(".foodItem__total"),
				itemQuantity = item.querySelector(".foodItem__quantity__value");

			if (orderTotal.innerHTML != "KSH 0" ||
				itemTotal.innerHTML != "KSH 0" ||
				itemQuantity.innerHTML != "0") {
				return false;
			}

			return true;
		});

		expect(subResult).toBe(true);
	});

	it("Test menu with two ordered items", async () => {
		let orderItemAddButtons = await page.$$(".foodItem__quantity__add");

		orderItemAddButtons[0].click();
		orderItemAddButtons[1].click();

		await page.waitFor(200);
		await page.screenshot({
			path: `${SCR_PATH}4-1.jpg`
		});

		await page.click(orderButton);
		await page.waitFor(2000);
		await page.screenshot({
			path: `${SCR_PATH}4-2.jpg`
		});

		const pageTite = await page.title();

		expect(pageTite).toBe("Order History");
	});

	it("Test customer log out", async () => {
		await page.goto(PAGE, {
			waitUntil: "domcontentloaded"
		});

		await page.screenshot({
			path: `${SCR_PATH}5-1.jpg`
		});
		
		const menuButtonIsVisible = await page.$eval(".header__menuButton", (elem) => {
			return elem.style.display !== "none";
		});

		if (menuButtonIsVisible){
			await page.click(".header__menuButton");
			await page.waitFor(300);

			await page.screenshot({
				path: `${SCR_PATH}5-2.jpg`
			});

			await page.click(".header__dropDownMenu__logOut button");
		}
		else {
			await page.click(".header__logOut button");
		}

		await page.waitFor(1000);
		await page.screenshot({
			path: `${SCR_PATH}5-3.jpg`
		});

		const pageTite = await page.title();

		expect(pageTite).toBe("Home");
	},10000);

	afterAll(async () => {
		const jsCoverage = await page.coverage.stopJSCoverage();
		pti.write(jsCoverage);
	});

});
