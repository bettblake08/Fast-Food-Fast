import menuIcon from "../../../images/icons/menu.png";
import HeaderModel from "./model";

class AdminHeader extends HeaderModel{
	constructor(params = {}) {
		/*
        This is the MainHeader model constructor

        :args
			type    :   The header types. ["black","white"]
        */
		super(params);

		this.state = {
			headerType: params.type == undefined ? "black" : params.type,
			buttons: [],
			toggleMenu:false
		};

		this.components = {};
	}

	init() {
		let header = this,
			headerMenuButton = document.querySelector(".header__menuButton"),
			sideBarMenu = document.querySelector(".navMenu");

		this.addLogOutButton();

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
}

let adminHeader = new AdminHeader();

document.addEventListener("DOMContentLoaded",() => {
	adminHeader.init();
});