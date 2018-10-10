import {apiV1, webUrl} from "../../abstract/variables";
import logo from "../../../images/logo2.png";
import backImg4 from "../../../images/back--4.jpg";
import Button from "../../ui/button";

class LoginForm {
	constructor() {
		this._state = {
			errorMsg: "",
			buttons:[]
		};
	}

	get state() {
		return this._state;
	}
    
	set state(value) {
		this._state = value;
	}

	init(){
		let loginForm = this,
			loginButton = document.querySelector(".login__save"),
			loginLogo = document.querySelector(".login__logo"),
			loginBackgroundLeft = document.querySelector(".login__left__img"),
			loginBackgroundRight = document.querySelector(".login__right__img"),
			loginLogoImg = new Image(),
			loginBackgroundLeftImg = new Image(),
			loginBackgroundRightImg = new Image();

		loginLogoImg.src = logo;
		loginLogoImg.alt = "FastFoodFast logo";

		loginBackgroundLeftImg.src = backImg4;
		loginBackgroundLeftImg.alt = "Soda Cheers";

		loginBackgroundRightImg.src = backImg4;
		loginBackgroundRightImg.alt = "FastFoodFast logo";
		
		loginBackgroundLeft.appendChild(loginBackgroundLeftImg);
		loginBackgroundRight.appendChild(loginBackgroundRightImg);
		loginLogo.appendChild(loginLogoImg);

		let button = new Button({
			class: "btn_1",
			textClass: "f_button_1",
			label: "Sign In",
			parent: loginForm,
			status: 0,
			action: () => {
				loginForm.loginAuth();
			}
		});

		button.init();
		loginButton.appendChild(button.getButton());
	}

	displayError(ERRORDELAY = 3000) {
		console.log("Displaying error: " + this.state.errorMsg);
        
		let state = this.state;
		const ERRORCOMMENTID = 1;
            
		const errorComments = document.querySelectorAll(".errorComment"),
			errorComment = errorComments.item(ERRORCOMMENTID);

		errorComment.classList.replace("errorComment", "errorComment--active");
		errorComment.innerHTML = state.errorMsg;

		setTimeout(() => {
			errorComment.classList.replace(
				"errorComment--active", 
				"errorComment"
			);
			errorComment.innerHTML = "";

		}, ERRORDELAY);

		state.errorMsg = "";
		this.state = state;
	}

	loginAuth() {
		console.log("Login authentication started");
        
		const component = this,
			password = document.querySelector("#password").value,
			state = component.state,
			username = document.querySelector("#username").value,
			usernameMax = 30;
        
		if (username.length > usernameMax) {
			state.errorMsg = "Username too long. Please input username " + 
                    "less than 30 chars";
            
			this.state = state;
			this.displayError();
			return;
		}

		/* 
		let passwordCheck = new RegExp("((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$#.!]).{8,16})");
		
		if (passwordCheck.exec(password) == null) {
			state.errorMsg = "Password is incorrect." + 
                "Please input a password with 1 upper case, 1 lower case, " + 
                "1 digit and 1 special character including [@$#.!] .";

			this.state = state;
			this.displayError();
			return;
		} 
		*/

		fetch(`${apiV1}/auth/login`, { 
			body: JSON.stringify({
				password,
				username                
			}),
			headers: {
				"Content-Type": "application/json"
			},
			method:"POST"         
		}).then((response) => {

			switch(response.status){
			case 200:{  
				return response.json();    
			}
			case 400:
			case 401:
			case 404: {
				response.json().then((result)=>{
					state.errorMsg = result.message;
					this.state = state;
					this.displayError();
				});
				break;
			}
			}
		}).then((response) => {
			console.log("Login Successful!");
            
			const loginCredentials = {
				access_token: response.access_token,
				refresh_token: response.refresh_token
			};

			localStorage.setItem("tokens", JSON.stringify(loginCredentials));
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