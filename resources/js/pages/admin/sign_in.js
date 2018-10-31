import { login, displayError } from "../../abstract/mixins";
import logo from "../../../images/logo.png";
import backImgLeft from "../../../images/item--4.jpg";
import backImgRight from "../../../images/item--2.png";
import Button from "../../ui/button";
import TextInput from "../../ui/textInput";
import Component from "../../abstract/component_model";

class LoginForm extends Component{
	constructor() {
		super({});

		this.state = {
			errorMsg: "",
			buttons:[],
			textInputs:[]
		};
	}

	init(){
		let loginForm = this,
			loginButton = document.querySelector(".login__save"),
			loginLogo = document.querySelector(".login__logo"),
			loginBackgroundLeft = document.querySelector(".login__left__img"),
			loginBackgroundRight = document.querySelector(".login__right__img"),
			loginLogoImg = new Image(),
			loginBackgroundLeftImg = new Image(),
			loginBackgroundRightImg = new Image(),
			loginInputs = document.querySelectorAll(".login__text");

		loginLogoImg.src = logo;
		loginLogoImg.alt = "FastFoodFast logo";

		loginBackgroundLeftImg.src = backImgLeft;
		loginBackgroundLeftImg.alt = "Soda Cheers";

		loginBackgroundRightImg.src = backImgRight;
		loginBackgroundRightImg.alt = "Fish fillets";
		
		loginBackgroundLeft.appendChild(loginBackgroundLeftImg);
		loginBackgroundRight.appendChild(loginBackgroundRightImg);
		loginLogo.appendChild(loginLogoImg);

		let button = new Button({
			class: "btn_1",
			textClass: "f_button_2",
			label: "Sign In",
			parent: loginForm,
			status: 0,
			action: () => {
				loginForm.loginAuth();
			}
		});

		button.init();
		loginButton.appendChild(button.getButton());

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

	displayErrorMessage(error) {
		displayError(".login__error", error, 5000);
	}

	loginAuth() {
		console.log("Login authentication started");
		
		let found = this.state.textInputs.find((input)=>{
			return input.state.status != 2;
		});

		if(found != undefined){
			found.focus();
			return;
		}

		login({
			password: this.state.textInputs[1].getInputValue(),
			username: this.state.textInputs[0].getInputValue(),
			successUrl: "/admin/orderManagement",
			component: this
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