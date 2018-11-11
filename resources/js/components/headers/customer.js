import menuIcon from "../../../images/icons/menu.png";
import HeaderModel from "./model";

class CustomerHeader extends HeaderModel{
	constructor(params = {}) {
		/* 
        This is the MainHeader model constructor

        :args
			type    :   The header types. ["black","white"]
        */

		super(params);

		this.state = {
			headerType: params.type == undefined ? "black" : params.type,
			buttons:[],
			toggleMenu:false
		};

		this.components = {};
	}

	init(){
		let header = this,
			headerMenuButton = document.querySelector(".header__menuButton"),
			headerDropDownMenu = document.querySelector(".header__dropDownMenu--disabled");

		this.addLogOutButton();

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

}

export default CustomerHeader;