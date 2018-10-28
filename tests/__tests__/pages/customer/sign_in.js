import pti from "puppeteer-to-istanbul";

const PAGE = PATH + "/customer/login";
const SCR_PATH = `${SCREENSHOT_PATH}customer-sign-in-tests-`;

describe("Customer Sign In Page: ", () => {
	let loginButton = ".login__save button",
		loginUsernameInput = "#username",
		loginPasswordInput = "#password",
		user = {
			name:"johndoe1",
			nameLong: "johndoe1usernameistoolongforthespecifiedusernameInputintheloginform",
			password: "johndoe@A1",
			passwordInvalid: "johndoe@a1",
			passwordLong: "johndoe@A1passwordis2long4thespecifiedpasswordInput@theloginform"
		};
	
	beforeAll(async () => {
		await page.coverage.startJSCoverage({
			resetOnNavigation: false
		});

		await page.goto(PAGE, {
			waitUntil: "domcontentloaded"
		});
	});

	it("Test login using empty input details ",async () => {
		await page.click(loginButton);

		await page.screenshot({
			path: `${SCR_PATH}1-1.jpg`
		});

		const result = await page.evaluate(() => {
			let input = document.querySelector("#username");
			return document.activeElement === input;
		});

		expect(result).toBe(true);
	});

	it("Test login using empty password input", async () => {
		await page.type(loginUsernameInput, user.name);
		await page.click(loginButton);

		await page.screenshot({
			path: `${SCR_PATH}2-1.jpg`
		});

		const focused = await page.evaluate(()=>{
			let input = document.querySelector("#password");
			return document.activeElement === input;
		});

		expect(focused).toBe(true);

		await inputClear(loginUsernameInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}2-2.jpg`
		});
	});

	it("Test login using empty username input", async () => {
		await page.waitFor(4000);

		await page.type(loginPasswordInput, user.password);
		await page.click(loginButton);

		await page.waitFor(300);
		
		await page.screenshot({
			path: `${SCR_PATH}3-1.jpg`
		});

		const focused = await page.evaluate(() => {
			let input = document.querySelector("#username");
			return document.activeElement === input;
		});

		expect(focused).toBe(true);

		await inputClear(loginPasswordInput);
		await page.screenshot({
			path: `${SCR_PATH}3-2.jpg`
		});
	}, 10000);

	it("Test for empty username input on focus out ", async () => {
		await page.type(loginUsernameInput, "");
		await page.focus(loginPasswordInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}4-1.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[0];
			return display.classList.contains("errorComment--active");
		});	

		await page.waitFor(5000);

		await page.screenshot({
			path: `${SCR_PATH}4-2.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[0];
			return display.classList.contains("errorComment--disabled");
		});
	
		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 10000);

	it("Test login using valid inputs", async () => {
		await page.waitFor(1000);
		await page.type(loginUsernameInput, user.name);
		await page.type(loginPasswordInput, user.password);
		await page.click(loginButton);

		await page.waitFor(3000);

		await page.screenshot({
			path: `${SCR_PATH}5-1.jpg`
		});

		const newPageTitle = await page.title();

		expect(newPageTitle).toBe("Order Menu");
	}, 20000);

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