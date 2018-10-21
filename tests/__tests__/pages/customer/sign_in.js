const PAGE = PATH + "/customer/login";

describe("Sign in: ", () => {
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

	beforeEach(async () => {
		await page.goto(PAGE);
	});

	it("Test login using empty input details ",async () => {
		await page.click(loginButton);

		const result = await page.evaluate(() => {
			let input = document.querySelector("#username");
			return document.activeElement === input;
		});

		expect(result).toBe(true);
	});

	it("Test login using empty password input", async () => {
		await page.type(loginUsernameInput, user.name);
		await page.click(loginButton);

		const focused = await page.evaluate(()=>{
			let input = document.querySelector("#password");
			return document.activeElement === input;
		});

		expect(focused).toBe(true);
	});

	it("Test login using empty username input", async () => {
		await page.type(loginPasswordInput, user.password);
		await page.click(loginButton);

		const focused = await page.evaluate(() => {
			let input = document.querySelector("#username");
			return document.activeElement === input;
		});

		expect(focused).toBe(true);
	});

	it("Test for empty username input on focus out ", async () => {
		await page.type(loginUsernameInput, "");
		await page.focus(loginPasswordInput);
		await page.waitFor(1000);

		await page.screenshot({
			path: "suite-4-test-3-1.jpg"
		});

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[0];
			return display.classList.contains("errorComment--active");
		});	

		await page.waitFor(5000);

		await page.screenshot({
			path: "suite-4-test-3-2.jpg"
		});

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[0];
			return display.classList.contains("errorComment--disabled");
		});
	
		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	},10000);

	it("Test login using valid inputs", async () => {
		await page.type(loginUsernameInput, user.name);
		await page.type(loginPasswordInput, user.password);
		await page.click(loginButton);
		await page.waitFor(5000);

		const newPageTitle = await page.title();

		expect(newPageTitle).toBe("Order Menu");
	}, 20000);

});