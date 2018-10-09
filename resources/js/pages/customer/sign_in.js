import {apiV1, webUrl} from "../../abstract/variables";
import logo from "../../../images/logo2.png";

class LoginForm {
	constructor() {
		this._state = {
			"errorMsg": ""
		};
	}

	get state() {
		return this._state;
	}
    
	set state(value) {
		this._state = value;
	}

	init(){
		let loginButton = document.querySelector(".login__save button"),
			loginLogo = document.querySelector(".login__logo");

		loginButton.addEventListener("click", () => {
			this.loginAuth();
		});

		let logoImg = new Image();
		logoImg.src = logo;
		logoImg.alt = "FastFoodFast logo";

		loginLogo.appendChild(logoImg);
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
				"access_token": response.access_token,
				"refresh_token": response.refresh_token
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