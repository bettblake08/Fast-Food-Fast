import logoBlack from "../../../images/logo.png";
import logoWhite from "../../../images/logo2.png";
import menuIcon from "../../../images/icons/menu.png";
import Button from "../../ui/button";
import {
	refreshToken,
	getAccessToken
} from "../../abstract/mixins";
import {
	apiV1,
	webUrl
} from "../../abstract/variables";

class AdminHeader{
	constructor(params = {}) {
		/*
        This is the MainHeader model constructor

        :args
			type    :   The header types. ["black","white"]
        */

		this._state = {
			headerType: params.type == undefined ? "black" : params.type,
			buttons: [],
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

	init() {
		let header = this,
			logOutButton = document.querySelector(".header__logout"),
			headerMenuButton = document.querySelector(".header__menuButton"),
			sideBarMenu = document.querySelector(".navMenu");

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

		headerMenuButton.addEventListener("click", () => {
			header.toggleSideBarMenu();
		});

		this.changeHeaderType(this.state.headerType);

		this.components["headerMenuButton"] = headerMenuButton;
		this.components["sideBarMenu"] = sideBarMenu;
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

	toggleSideBarMenu() {
		this.state.toggleMenu = this.state.toggleMenu ? false : true;

		if (this.state.toggleMenu) {
			this.components.sideBarMenu.classList.replace(
				"navMenu",
				"navMenu--active"
			);
			
		} else {
			this.components.sideBarMenu.classList.replace(
				"navMenu--active",
				"navMenu"
			);
		}
	}

	logOut() {
		let header = this;

		fetch(`${apiV1}/auth/logout`, {
			headers: {
				"Authorization": `Bearer ${getAccessToken()}`
			}
		}).then((response) => {

			switch (response.status) {
			case 200:
			{
				localStorage.setItem("tokens", JSON.stringify({}));
				window.location.href = webUrl + "/";
				break;
			}
			case 401:
			{
				refreshToken({
					onSuccess: () => {
						header.logOut();
					},
					onFailure: () => {
						window.location.href = webUrl + "/admin/login";
					}
				});
				break;
			}
			case 422:
			{
				window.location.href = webUrl + "/admin/login";
				break;
			}
			}
		});
	}
}

let adminHeader = new AdminHeader();

document.addEventListener("DOMContentLoaded",() => {
	adminHeader.init();
});