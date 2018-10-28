import pti from "puppeteer-to-istanbul";
import faker from "faker";

const PAGE = PATH + "/admin/menu";
const SCR_PATH = `${SCREENSHOT_PATH}admin-menu-management-tests-`;

describe("Admin Menu Management Page: ", () => {
	beforeAll(async () => {
		await page.coverage.startJSCoverage({
			resetOnNavigation: false
		});

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
			await page.goto(PAGE, {
				waitUntil: "domcontentloaded"
			});
			return;
		}

	});
    
	it("Test add menu item button", async () => {
		await page.screenshot({
			path: `${SCR_PATH}1-1.jpg`
		});

		let topBarButtons = await page.$$(".menu__topBar__button button");
		await topBarButtons[0].click();
		await page.waitFor(500);

		await page.screenshot({
			path: `${SCR_PATH}1-2.jpg`
		});

		let activeView = await page.$(".view--active");
		let menuForm = await activeView.$(".addMenuItem");

		expect(menuForm).not.toBeNull();
	},10000);

	describe("Menu Add Item:", ()=>{
		let menuItemButtons = ".addMenuItem__button button",
			itemNameInput = "#itemName",
			itemPriceInput = "#itemPrice",
			itemCategorySelect = "#menuCategory",
			menuItem = {
				name: faker.commerce.productName(),
				nameLong: faker.lorem.sentence(25),
				price: faker.commerce.price(0, 1000, 2, ""),
				priceInvalid: "14.ad"
			};
		
		const SUITE_SCR_PATH = `${SCR_PATH}s1-`;

		it("Test using no input details", async () => {
			let buttons = await page.$$(menuItemButtons);
			await buttons[1].click();
			await page.waitFor(300);

			await page.screenshot({
				path: `${SUITE_SCR_PATH}1-1.jpg`
			});

			const result = await page.evaluate(() => {
				let input = document.querySelector("#itemName");
				return document.activeElement === input;
			});

			expect(result).toBe(true);
		});

		it("Test using no price input", async () => {
			let buttons = await page.$$(menuItemButtons);
            
			await page.type(itemNameInput, menuItem.name);
			await buttons[1].click();
			await page.waitFor(300);

			await page.screenshot({
				path: `${SUITE_SCR_PATH}2-1.jpg`
			});
            
			const result = await page.evaluate(() => {
				let input = document.querySelector("#itemPrice");
				return document.activeElement === input;
			});

			expect(result).toBe(true);

			await inputClear(itemNameInput);
			await page.waitFor(3000);
		});
		/* 
		it("Test using no category selected", async () => {
			let buttons = await page.$$(menuItemButtons);

			await page.type(itemNameInput, menuItem.name);
			await page.type(itemPriceInput, menuItem.price);
			await buttons[1].click();
            
			await page.waitFor(1000);
			await page.screenshot({
				path: `${SCR_PATH}1-3-1.jpg`
			});

			const result = await page.evaluate(() => {
				let input = document.querySelector(".dropdown--fail");

				if(input != null){
					let error = input.querySelector(".dropdown__error--active");
					return error != null;
				}	

				return false;
			});

			expect(result).toBe(true);
		});
         */

		it("Test using long item name input", async () => {
			await page.type(itemNameInput, menuItem.nameLong);
			await page.focus(itemPriceInput);
			await page.waitFor(1000);

			await page.screenshot({
				path: `${SUITE_SCR_PATH}4-1.jpg`
			});

			let errorActive = await page.evaluate(() => {
				let display = document.querySelectorAll(".text_input__error")[0];
				return display.classList.contains("errorComment--active");
			});

			await page.waitFor(5000);

			await page.screenshot({
				path: `${SUITE_SCR_PATH}4-2.jpg`
			});

			let errorDisabled = await page.evaluate(() => {
				let display = document.querySelectorAll(".text_input__error")[0];
				return display.classList.contains("errorComment--disabled");
			});

			expect(errorActive).toBe(true);
			expect(errorDisabled).toBe(true);

			/*
			await inputClear(itemNameInput);
			await page.waitFor(3000);
			*/
		}, 10000);
        
		it("Test using invalid item price input", async () => {
			await page.type(itemPriceInput, menuItem.priceInvalid);
			await page.focus(itemNameInput);
			await page.waitFor(1000);

			await page.screenshot({
				path: `${SUITE_SCR_PATH}5-1.jpg`
			});

			let errorActive = await page.evaluate(() => {
				let display = document.querySelectorAll(".text_input__error")[1];
				return display.classList.contains("errorComment--active");
			});

			await page.waitFor(5000);

			await page.screenshot({
				path: `${SUITE_SCR_PATH}5-2.jpg`
			});

			let errorDisabled = await page.evaluate(() => {
				let display = document.querySelectorAll(".text_input__error")[1];
				return display.classList.contains("errorComment--disabled");
			});

			expect(errorActive).toBe(true);
			expect(errorDisabled).toBe(true);

			await inputClear(itemNameInput);
			await inputClear(itemPriceInput);
			await page.waitFor(3000);
		}, 15000);
		
		/* 
		it("Test using invalid item category selected", async () => {
			await page.select(itemCategorySelect, "1");
			await page.select(itemCategorySelect, "");
			await page.focus(itemNameInput);
			await page.waitFor(1000);

			await page.screenshot({
				path: `${SCR_PATH}1-6-1.jpg`
			});

			let errorActive = await page.evaluate(() => {
				let menuForm = document.querySelector(".addMenuItem");
				let display = menuForm.querySelector(".dropdown--fail");
				return display != null;
			});

			await page.waitFor(5000);

			await page.screenshot({
				path: `${SCR_PATH}1-6-2.jpg`
			});

			let errorDisabled = await page.evaluate(() => {
				let menuForm = document.querySelector(".addMenuItem");
				let display = menuForm.querySelector(".dropdown");
				return display != null;
			});

			expect(errorActive).toBe(true);
			expect(errorDisabled).toBe(true);
		}, 10000);
         */
		/* 
		it("Test using valid item category selected", async () => {
			await page.focus(itemCategorySelect);
			await page.select(itemCategorySelect, "1");
			await page.focus(itemNameInput);
			await page.waitFor(300);

			let errorActive = await page.evaluate(() => {
				let menuForm = document.querySelector(".addMenuItem");
				let display = menuForm.querySelector(".dropdown--success");
				return display != null;
			});

			await page.waitFor(3000);

			let errorDisabled = await page.evaluate(() => {
				let menuForm = document.querySelector(".addMenuItem");
				let display = menuForm.querySelector(".dropdown");
				return display != null;
			});

			expect(errorActive).toBe(true);
			expect(errorDisabled).toBe(true);
		}, 10000);
 		*/
		it("Test using valid input data", async () => {
			let buttons = await page.$$(menuItemButtons);
			
			await page.type(itemNameInput, menuItem.name);
			await page.type(itemPriceInput, menuItem.price);
			await page.select(itemCategorySelect, "1");
			await buttons[1].click();
            
			await page.waitFor(3000);

			await page.screenshot({
				path: `${SUITE_SCR_PATH}8-1.jpg`
			});

			const newPageTitle = await page.title();
			expect(newPageTitle).toBe("Menu");
		}, 10000);

	});

	afterAll(async () => {
		const jsCoverage = await page.coverage.stopJSCoverage();
		pti.write(jsCoverage);
	});

	async function inputClear(input) {
		await page.click(input);
		await page.keyboard.down("Control");
		await page.keyboard.down("A");
		await page.keyboard.up("Control");
		await page.keyboard.up("A");
		await page.keyboard.press("Backspace");
	}
});