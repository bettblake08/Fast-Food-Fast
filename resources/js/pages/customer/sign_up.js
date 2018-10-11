import {apiV1, webUrl} from "../../abstract/variables";
import Button from "../../ui/button";
import TextInput from "../../ui/textInput";
import logo from "../../../images/logo2.png";

class SignUpForm {
	constructor() {
		this._state = {
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
		let signUpButton = document.querySelector(".signUp__save"),
		signUpInputs = document.querySelectorAll(".signUp__text"),
		main = this;

		let button = new Button({
			class:"btn_1",
			textClass:"f_button_1",
			label:"Sign Up",
			parent:this,
			status:0,
			action:()=>{
				main.signUp();
			}
		});

		button.init();
		signUpButton.appendChild(button.getButton());
		
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
				if (input.length == 0){
					return {
						status: false,
						message: "Username field is empty."
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

		let emailInput = new TextInput({
			parent: this,
			name: "email",
			label: "Email Address",
			placeholder: "Eg. jessec7@yahoo.com",
			class: "text_input",
			textClass: "f_input_1",
			type: "text",
			status: 0,
			test: (input) => {
				if (input.length == 0) {
					return {
						status: false,
						message: "Email field is empty."
					};
				}
				
				if(input.length > 30 ){
					return {
						status: false,
						message: "Email address is too long. Please input an email address less than 30 characters."
					};
				}

				let emailCheck = /^([a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,5})$/;

				if (!emailCheck.test(input)) {
					return {
						status: false,
						message: "Invalid email. Please input a valid email address."
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
			placeholder: "Includes 1 uppercase, 1 lowercase, 1 digit and 1 special character [].",
			class: "text_input",
			textClass: "f_input_1",
			type: "password",
			status: 0,
			test: (input) => {
				if (input.length == 0) {
					return {
						status: false,
						message: "Password field is empty."
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

		let reEnterPasswordInput = new TextInput({
			parent: this,
			name: "repass",
			label: "Re-enter Password",
			placeholder: "Includes 1 uppercase, 1 lowercase, 1 digit and 1 special character [].",
			class: "text_input",
			textClass: "f_input_1",
			type: "password",
			status: 0,
			test: (input) => {
				if (input.length == 0) {
					return {
						status: false,
						message: "Password field is empty."
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

				if(input != passwordInput.getInputValue()){
					return {
						status: false,
						message: "Passwords do not match."
					};
				}

				return {
					status: true
				};
			}
		});

		usernameInput.init();
		emailInput.init();
		passwordInput.init();
		reEnterPasswordInput.init();

		signUpInputs[0].appendChild(usernameInput.getInput());
		signUpInputs[1].appendChild(emailInput.getInput());
		signUpInputs[2].appendChild(passwordInput.getInput());
		signUpInputs[3].appendChild(reEnterPasswordInput.getInput());
	}

	displayError(ERRORDELAY = 3000) {
		console.log("Displaying error: " + this.state.errorMsg);

		let state = this.state;
		const errorComment = document.querySelector(".signUp__error");

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

	displaySuccess() {
		let state = this.state;
		const successComment = document.querySelector(".signUp__success");

		successComment.classList.replace("successComment--disabled", "successComment--active");

		setTimeout(() => {
			window.location.href = `${webUrl}/customer/login`;
		}, 3000);

		state.errorMsg = "";
		this.state = state;
	}

	signUp() {
		console.log("Login authentication started!");
        
		let main = this,
			state = this.state,
			textInputs = this.state.textInputs,
			buttons = this.state.buttons;

		let input = textInputs.find((input)=>{
			return input.state.status != 2;
		});

		if(input != undefined){
			input.focus();
			return;
		}

		if (textInputs[2].getInputValue() != textInputs[3].getInputValue()){
			
			textInputs[2].updateInputStatus(1);
			textInputs[3].updateInputStatus(1);

			textInputs[3].setErrorMessage("Passwords do not match!");
			textInputs[3].displayError(5000);

			textInputs[2].focus();
			return;
		}

		buttons[0].setStatus(3);
 
		fetch(`${apiV1}/auth/signup`, { 
			body: JSON.stringify({
				username:textInputs[0].getInputValue(),
				email: textInputs[1].getInputValue(),
				password: textInputs[2].getInputValue(),
				role:"customer"
			}),
			headers: {
				"Content-Type": "application/json"
			},
			method:"POST"
		}).then((response) => {

			switch(response.status){
			case 201:{  
				return response.json();    
			}
			case 400:
			case 401:
			case 403:
			case 404: {
				response.json().then((result)=>{
					state.errorMsg = result.message;
					main.state = state;
					main.displayError();

					buttons[0].setStatus(1,5000);
				});
			}
			}
		}).then((response) => {			
			if(response != undefined){
				console.log("Sign up Successful!");
				buttons[0].setStatus(2, 5000);
				
				main.displaySuccess();
			}
		});
	}
}

let signUpForm = new SignUpForm();

document.addEventListener("DOMContentLoaded", () => {
	signUpForm.init();

	let headerLogo = document.querySelector(".header__logo img");
	headerLogo.src = logo;
});

export {
	SignUpForm
};