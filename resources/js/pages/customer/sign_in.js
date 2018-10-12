import {apiV1, webUrl} from "../../abstract/variables";
import logo from "../../../images/logo2.png";
import Button from "../../ui/button";
import TextInput from "../../ui/textInput";

class LoginForm {
	constructor() {
		this._state = {
			errorMsg: "",
			buttons:[],
			textInputs:[]
		};
	}

	get state() {
		return this._state;
	}
    
	set state(value) {
		this._state = value;
	}

	init(){
		let loginButton = document.querySelector(".login__save"),
			loginLogo = document.querySelector(".login__logo"),
			loginInputs = document.querySelectorAll(".login__text");

		let button = new Button({
			class: "btn_1",
			textClass: "f_button_2",
			label: "Sign In",
			parent: loginForm,
			status: 0,
			action: () => {
				this.loginAuth();
			}
		});

		button.init();
		loginButton.appendChild(button.getButton());

		let logoImg = new Image();
		logoImg.src = logo;
		logoImg.alt = "FastFoodFast logo";

		loginLogo.appendChild(logoImg);

		let usernameInput = new TextInput({
			parent: this,
			name: "username",
			label: "Username",
			placeholder: "Eg. JesseC7",
			class: "text_input",
			textClass: "f_input_1",
			type: "text",
			status: 0,
			test: (input) => {
				if (input.length == 0) {
					return {
						status: false,
						message: "Username field empty."
					};
				}

				if (input.length > 30) {
					return {
						status: false,
						message: "Username too long. Please input a username less than 30 characters."
					};
				}

				return {
					status: true
				};
			}
		});

		let passwordInput = new TextInput({
			parent: this,
			name: "password",
			label: "Password",
			placeholder: "Password",
			class: "text_input",
			textClass: "f_input_1",
			type: "password",
			status: 0,
			test: (input) => {
				if (input.length == 0) {
					return {
						status: false,
						message: "Password field empty."
					};
				}

				let passwordCheck = /^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$#.!])).{8,16}$/;

				if (!passwordCheck.test(input)) {
					return {
						status: false,
						message: "Password is incorrect." +
							"Please input a password with 1 upper case, 1 lower case, " +
							"1 digit and 1 special character including [@$#.!] ."
					};
				}

				return {
					status: true
				};
			}
		});

		usernameInput.init();
		passwordInput.init();

		loginInputs[0].appendChild(usernameInput.getInput());
		loginInputs[1].appendChild(passwordInput.getInput());
	}

	displayError(ERRORDELAY = 3000) {
		console.log("Displaying error: " + this.state.errorMsg);

		let state = this.state,
			errorComment = document.querySelector(".login__error");

		errorComment.classList.replace("errorComment--disabled", "errorComment--active");
		errorComment.innerHTML = state.errorMsg;

		setTimeout(() => {
			errorComment.classList.replace(
				"errorComment--active",
				"errorComment--disabled"
			);
			errorComment.innerHTML = "";

		}, ERRORDELAY);

		state.errorMsg = "";
		this.state = state;
	}

	loginAuth() {
		console.log("Login authentication started");

		const component = this,
			state = component.state;

		let found = state.textInputs.find((input) => {
			return input.state.status != 2;
		});

		if (found != undefined) {
			found.focus();
			return;
		}

		fetch(`${apiV1}/auth/login`, {
			body: JSON.stringify({
				password:state.textInputs[1].getInputValue(),
				username: state.textInputs[0].getInputValue()
			}),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST"
		}).then((response) => {

			switch (response.status) {
			case 200:
			{
				return response.json();
			}
			case 400:
			case 401:
			case 404:
			{
				response.json().then((result) => {
					state.errorMsg = result.message;
					this.state = state;
					this.displayError();
				});
				break;
			}
			}
		}).then((response) => {
			console.log("Login Successful!");

			localStorage.setItem("tokens", JSON.stringify({
				access_token: response.access_token,
				refresh_token: response.refresh_token
			}));

			window.location.href = webUrl + "/customer/order";
		});
	}
}

let loginForm = new LoginForm();

document.addEventListener("DOMContentLoaded", () => {
	loginForm.init();
});

export {
	LoginForm
};