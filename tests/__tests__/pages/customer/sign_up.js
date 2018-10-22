import faker from "faker";
const PAGE = PATH + "/customer/signup";
const SCR_PATH = `${SCREENSHOT_PATH}sign-up-tests-`;

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
			email: faker.internet.email(faker.name.firstName(),faker.name.lastName(),"rocketmail.com"),
			emailExists: "johndoe1@rocketmail.com",
			emailInvalid: "johnnewman1rocketmail.com",
			emailLong: "johnnewman1emailistoolongfortheemailinput@rocketmail.com",
			password: "johnnewman@A1",
			passwordInvalid: "johnnewman@a1",
			passwordMismatch:"johnnewman@A2",
			passwordLong: "johnnewman@A1passwordis2long4thespecifiedpasswordInput@theloginform"
		};
    
	beforeEach(async () => {
		await page.goto(PAGE);
	});

	it("Test using no input details", async () => {
		await page.click(signupButton);
		await page.waitFor(500);

		const result = await page.evaluate(() => {
			let input = document.querySelector("#username");
			return document.activeElement === input;
		});
        
		expect(result).toBe(true);
	});
    
	it("Test using no email input",async ()=>{
		await page.type(signupUsernameInput, user.name);
		await page.click(signupButton);
        
		const result = await page.evaluate(() => {
			let input = document.querySelector("#email");
			return document.activeElement === input;
		});

		expect(result).toBe(true);
	}); 
    
	it("Test using no password input", async () => {
		await page.type(signupUsernameInput, user.name);
		await page.type(signupEmailInput, user.emailExists);
		await page.click(signupButton);
		await page.waitFor(1000);

		const result = await page.evaluate(() => {
			let input = document.querySelector("#password");
			return document.activeElement === input;
		});

		expect(result).toBe(true);
	});

	it("Test using no reenter password input", async () => {
		await page.type(signupUsernameInput, user.name);
		await page.type(signupEmailInput, user.emailExists);
		await page.type(signupPasswordInput, user.password);
		await page.click(signupButton);
		await page.waitFor(1000);

		const result = await page.evaluate(() => {
			let input = document.querySelector("#repass");
			return document.activeElement === input;
		});

		expect(result).toBe(true);
	});
    
	it("Test using no username input", async () => {
		await page.type(signupEmailInput, user.emailExists);
		await page.type(signupPasswordInput, user.password);
		await page.type(signupRePasswordInput, user.password);
		await page.click(signupButton);

		const result = await page.evaluate(() => {
			let input = document.querySelector("#username");
			return document.activeElement === input;
		});

		expect(result).toBe(true);
	});

	it("Test using long username input", async () => {
		await page.type(signupUsernameInput, user.nameLong);
		await page.focus(signupEmailInput);
		await page.waitFor(1000);
        
		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[0];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[0];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 15000);

	it("Test using long email input", async () => {
		await page.type(signupEmailInput, user.emailLong);
		await page.focus(signupPasswordInput);
		await page.waitFor(1000);

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[1];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[1];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 15000);

	it("Test using invalid email input", async () => {
		await page.type(signupEmailInput, user.emailInvalid);
		await page.focus(signupPasswordInput);
		await page.waitFor(1000);

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[1];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[1];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 15000);
    
	it("Test using long password input", async () => {
		await page.type(signupPasswordInput, user.passwordLong);
		await page.focus(signupRePasswordInput);
		await page.waitFor(1000);

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[2];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[2];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 15000);

	it("Test using invalid password input", async () => {
		await page.type(signupPasswordInput, user.passwordLong);
		await page.focus(signupRePasswordInput);
		await page.waitFor(1000);

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[2];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[2];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 15000);
    
	it("Test using long re-enter password input", async () => {
		await page.type(signupPasswordInput, user.passwordLong);
		await page.type(signupRePasswordInput, user.passwordLong);
		await page.focus(signupUsernameInput);
		await page.waitFor(1000);

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 15000);
    
	it("Test using invalid re-enter password input", async () => {
		await page.type(signupPasswordInput, user.password);
		await page.type(signupRePasswordInput, user.passwordInvalid);
		await page.focus(signupUsernameInput);
		await page.waitFor(1000);

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 15000);

	it("Test using mismatching password input", async () => {
		await page.type(signupPasswordInput, user.password);
		await page.type(signupRePasswordInput, user.passwordMismatch);
		await page.focus(signupUsernameInput);
		await page.waitFor(1000);

		let errorActive = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelectorAll(".text_input__error")[3];
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 15000);
    
	it("Test using username that already exists", async () => {
		await page.type(signupUsernameInput, user.nameExists);
		await page.type(signupEmailInput, user.email);
		await page.type(signupPasswordInput, user.password);
		await page.type(signupRePasswordInput, user.password);
		await page.click(signupButton);

		await page.waitFor(() => !!document.querySelector(".errorComment--active"));

		let errorActive = await page.evaluate(() => {
			let display = document.querySelector(".signUp__error");
			return display.classList.contains("errorComment--active");
		});

		await page.waitFor(5000);

		let errorDisabled = await page.evaluate(() => {
			let display = document.querySelector(".signUp__error");
			return display.classList.contains("errorComment--disabled");
		});

		expect(errorActive).toBe(true);
		expect(errorDisabled).toBe(true);
	}, 10000);

	it("Test using valid input data", async () => {
		await page.type(signupUsernameInput, user.name);
		await page.type(signupEmailInput, user.email);
		await page.type(signupPasswordInput, user.password);
		await page.type(signupRePasswordInput, user.password);
		await page.click(signupButton);

		await page.waitFor(5000);

		const newPageTitle = await page.title();
		expect(newPageTitle).toBe("Sign In");
	}, 10000);

});
