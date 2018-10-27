import faker from "faker";
import pti from "puppeteer-to-istanbul";

const PAGE = PATH + "/customer/signup";
const SCR_PATH = `${SCREENSHOT_PATH}customer-sign-up-tests-`;


describe("Customer Sign Up Page:", () => {
	let signupButton = ".signUp__save button",
		signupUsernameInput = "#username",
		signupEmailInput = "#email",
		signupPasswordInput = "#password",
		signupRePasswordInput = "#repass",
		user = {
			name: faker.name.firstName() + faker.random.number(2,4),
			nameExists: "johndoe1",
			nameLong: "johnnewman1usernameistoolongforthespecifiedusernameInputintheloginform",
			emailExists: "johndoe1@rocketmail.com",
			emailInvalid: "johnnewman1rocketmail.com",
			emailLong: "johnnewman1emailistoolongfortheemailinput@rocketmail.com",
			password: "johnnewman@A1",
			passwordInvalid: "johnnewman@a1",
			passwordMismatch:"johnnewman@A2",
			passwordLong: "johnnewman@A1passwordis2long4thespecifiedpasswordInput@theloginform"
		};

	user.email = user.name + "@rocketmail.com";
	
	beforeAll(async () => {
		await page.coverage.startJSCoverage({
			resetOnNavigation: false
		});

		await page.goto(PAGE, {
			waitUntil:"domcontentloaded"
		});
		//globalCoverageSetup();
	});

	beforeEach(async () => {
		/* await page.evaluate(() => {
			let inputs = document.querySelectorAll("input");

			inputs.forEach(input => {
				input.value = "";
			});
		});

		let inputs = await page.$$("input");
		
		inputs.forEach(async input => {
			await input.focus();
		});
		*/
	});	

	it("Test using no input details", async () => {
		await page.click(signupButton);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}1-1.jpg`
		});

		const result = await page.evaluate(() => {
			let input = document.querySelector("#username");
			return document.activeElement === input;
		});
        
		expect(result).toBe(true);
	});
    
	it("Test using no email input",async ()=>{
		await page.type(signupUsernameInput, user.name);
		await page.click(signupButton);
		await page.waitFor(1000);
		
		await page.screenshot({
			path: `${SCR_PATH}2-1.jpg`
		});

		const result = await page.evaluate(() => {
			let input = document.querySelector("#email");
			return document.activeElement === input;
		});

		expect(result).toBe(true);
	});
    
	it("Test using no password input", async () => {
		await page.type(signupEmailInput, user.emailExists);
		await page.click(signupButton);
		await page.waitFor(500);
		await page.screenshot({
			path: `${SCR_PATH}3-1.jpg`
		});

		const result = await page.evaluate(() => {
			let input = document.querySelector("#password");
			return document.activeElement === input;
		});

		expect(result).toBe(true);
	});

	it("Test using no reenter password input", async () => {
		await page.type(signupPasswordInput, user.password);
		await page.click(signupButton);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}4-1.jpg`
		});

		const result = await page.evaluate(() => {
			let input = document.querySelector("#repass");
			return document.activeElement === input;
		});

		expect(result).toBe(true);

		await inputClear(signupUsernameInput);
	});
    
	it("Test using no username input", async () => {
		await page.type(signupRePasswordInput, user.password);
		await page.click(signupButton);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}5-1.jpg`
		});

		const result = await page.evaluate(() => {
			let input = document.querySelector("#username");
			return document.activeElement === input;
		});

		expect(result).toBe(true);

		await inputClear(signupEmailInput);
		await inputClear(signupPasswordInput);
		await inputClear(signupRePasswordInput);
	});

	it("Test using long username input", async () => {
		await page.type(signupUsernameInput, user.nameLong);
		await page.focus(signupEmailInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}6-1.jpg`
		});
        
		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[0];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		await page.screenshot({
			path: `${SCR_PATH}6-2.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[0];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);

		await inputClear(signupUsernameInput);
	}, 15000);

	it("Test using long email input", async () => {
		await page.type(signupEmailInput, user.emailLong);
		await page.focus(signupPasswordInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}7-1.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[1];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		await page.screenshot({
			path: `${SCR_PATH}7-2.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[1];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);

		await inputClear(signupEmailInput);
	}, 15000);

	it("Test using invalid email input", async () => {
		await page.type(signupEmailInput, user.emailInvalid);
		await page.focus(signupPasswordInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}8-1.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[1];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		await page.screenshot({
			path: `${SCR_PATH}8-2.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[1];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);

		await inputClear(signupEmailInput);
	}, 15000);
    
	it("Test using long password input", async () => {
		await page.type(signupPasswordInput, user.passwordLong);
		await page.focus(signupRePasswordInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}9-1.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[2];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		await page.screenshot({
			path: `${SCR_PATH}9-2.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[2];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);

		await inputClear(signupPasswordInput);
	}, 15000);

	it("Test using invalid password input", async () => {
		await page.type(signupPasswordInput, user.passwordLong);
		await page.focus(signupRePasswordInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}10-1.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[2];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		await page.screenshot({
			path: `${SCR_PATH}10-2.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[2];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);

		await inputClear(signupPasswordInput);
	}, 15000);
    
	it("Test using long re-enter password input", async () => {
		await page.type(signupPasswordInput, user.passwordLong);
		await page.type(signupRePasswordInput, user.passwordLong);
		await page.focus(signupUsernameInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}11-1.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		await page.screenshot({
			path: `${SCR_PATH}11-1.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);

		await inputClear(signupPasswordInput);
		await inputClear(signupRePasswordInput);
	}, 15000);
    
	it("Test using invalid re-enter password input", async () => {
		await page.type(signupPasswordInput, user.password);
		await page.type(signupRePasswordInput, user.passwordInvalid);
		await page.focus(signupUsernameInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: `${SCR_PATH}12-1.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		await page.screenshot({
			path: `${SCR_PATH}12-2.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);

		await inputClear(signupPasswordInput);
		await inputClear(signupRePasswordInput);
	}, 15000);

	it("Test using mismatching password input", async () => {
		await page.type(signupPasswordInput, user.password);
		await page.type(signupRePasswordInput, user.passwordMismatch);
		await page.focus(signupUsernameInput);
		await page.waitFor(500);

		await page.screenshot({
			path: `${SCR_PATH}13-1.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		await page.screenshot({
			path: `${SCR_PATH}13-2.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);

		await inputClear(signupPasswordInput);
		await inputClear(signupRePasswordInput);
	}, 15000);
    
	it("Test using username that already exists", async () => {
		await page.type(signupUsernameInput, user.nameExists);
		await page.type(signupEmailInput, user.emailExists);
		await page.type(signupPasswordInput, user.password);
		await page.type(signupRePasswordInput, user.password);
		await page.click(signupButton);
		/* 
		let requestResult = await page.waitForRequest(
			request => request.url() === `${API_PATH}/auth/signup` && request.method() === "POST"
		);

		expect(requestResult.url()).toBe(`${API_PATH}/auth/signup`);
		*/
		await page.screenshot({
			path: `${SCR_PATH}14-1.jpg`
		});

		let responseResult = await page.waitForResponse(
			response => response.url() === `${API_PATH}/auth/signup`
		);

		expect(responseResult.status()).toBe(403);

		await page.screenshot({
			path: `${SCR_PATH}14-2.jpg`
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelector(".signUp__error");
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);
		await page.screenshot({
			path: `${SCR_PATH}14-3.jpg`
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelector(".signUp__error");
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);

		await inputClear(signupUsernameInput);
		await inputClear(signupEmailInput);
		await inputClear(signupPasswordInput);
		await inputClear(signupRePasswordInput);
	}, 40000);

	/* 
	it("Test using valid input data", async () => {
		await page.type(signupUsernameInput, user.name);
		await page.type(signupEmailInput, user.email);
		await page.type(signupPasswordInput, user.password);
		await page.type(signupRePasswordInput, user.password);
		await page.click(signupButton);

		await page.waitForResponse(
			response => response.url() === `${API_PATH}/auth/signup`);

		await page.waitFor(2000);

		await page.screenshot({
			path: `${SCR_PATH}15-1.jpg`
		});

		const newPageTitle = await page.title();
		expect(newPageTitle).toBe("Sign In");
	}, 10000);
 	*/

	afterAll(async ()=>{
		const jsCoverage = await page.coverage.stopJSCoverage();
		pti.write(jsCoverage);
	});

	async function inputClear(input){
		await page.click(input);
		await page.keyboard.down("Control");
		await page.keyboard.down("A");
		await page.keyboard.up("Control");
		await page.keyboard.up("A");
		await page.keyboard.press("Backspace");
	}
});
