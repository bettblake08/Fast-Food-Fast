import logoBlack from "../../../images/logo.png";
import logoWhite from "../../../images/logo2.png";
import Button from "../../ui/button";
import {refreshToken, getAccessToken} from "../../abstract/mixins";
import {apiV1, webUrl} from "../../abstract/variables";
import menuIcon from "../../../images/icons/menu.png";

class CustomerHeader{
	constructor(params = {}) {
		/* 
        This is the MainHeader model constructor

        :args
			type    :   The header types. ["black","white"]
        */

		this._state = {
			headerType: params.type == undefined ? "black" : params.type,
			buttons:[],
			toggleMenu:false
		};

		this._components = {};
	}

	get state() {
		return this._state;
	}

	set state(value) {
		this._state = value;
	}

	get components() {
		return this._components;
	}

	set components(value) {
		this._components = value;
	}

	init(){
		let header = this,
			logOutButton = document.querySelector(".header__logout"),
			headerMenuButton = document.querySelector(".header__menuButton"),
			headerDropDownMenu = document.querySelector(".header__dropDownMenu--disabled");
		
		let logout = new Button({
			class: "btn_1",
			textClass: "f_button_1",
			label: "Log Out",
			parent: header,
			status: 0,
			action: () => {
				header.logOut();
			}
		});

		logout.init();
		logOutButton.appendChild(logout.getButton());

		let menuButtonImg = new Image();
		menuButtonImg.src = menuIcon;
		menuButtonImg.alt = "Dropdown menu button";

		headerMenuButton.appendChild(menuButtonImg);

		headerMenuButton.addEventListener("click",() => {
			header.toggleDropDownMenu();
		});

		this.changeHeaderType(this.state.headerType);

		this.components["headerMenuButton"] = headerMenuButton;
		this.components["headerDropDownMenu"] = headerDropDownMenu;
	}


	changeHeaderType() {
		let headerLogo = document.querySelector(".header__logo"),
			logoImg = new Image();

		logoImg.alt = "FastFoodFast Logo";

		switch (this.state.headerType) {
		case "black":
		{
			logoImg.src = logoBlack;
			break;
		}
		case "white":
		{
			logoImg.src = logoWhite;
			break;
		}
		}

		headerLogo.appendChild(logoImg);
	}

	toggleDropDownMenu(){
		this.state.toggleMenu = this.state.toggleMenu ? false : true;
		

		if(this.state.toggleMenu){
			let headerDropDownMenuLogOut = document.querySelector(".header__dropDownMenu__logOut");
			headerDropDownMenuLogOut.appendChild(this.state.buttons[0].getButton());

			this.components.headerDropDownMenu.classList.replace(
				"header__dropDownMenu--disabled",
				"header__dropDownMenu--active"
			);
		}
		else {
			let headerLogOut = document.querySelector(".header__logOut");
			headerLogOut.appendChild(this.state.buttons[0].getButton());

			this.components.headerDropDownMenu.classList.replace(
				"header__dropDownMenu--active",
				"header__dropDownMenu--disabled"
			);
		}
	}

	logOut(){
		let header = this;

		fetch(`${apiV1}/auth/logout`, {
			headers:{
				"Authorization":`Bearer ${getAccessToken()}`
			}
		}).then((response)=>{

			switch(response.status){
			case 200:{
				localStorage.setItem("tokens",JSON.stringify({}));
				window.location.href = webUrl + "/";
				break;
			}
			case 401:{
				refreshToken({
					onSuccess: () => {
						header.logOut();
					},
					onFailure: () => {
						window.location.href = webUrl + "/customer/login";
					}
				});
				break;
			}
			case 422:{
				window.location.href = webUrl + "/customer/login";
				break;
			}
			}
		});
	}
}

export default CustomerHeader;