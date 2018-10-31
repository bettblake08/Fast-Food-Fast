import Component from "../../abstract/component_model";
import logoBlack from "../../../images/logo.png";
import logoWhite from "../../../images/logo2.png";
import {
	refreshToken,
	getAccessToken
} from "../../abstract/mixins";
import {
	apiV1,
	webUrl
} from "../../abstract/variables";
import Button from "../../ui/button";

class HeaderModel extends Component{
	constructor(props){
		super(props);
	}

	changeHeaderType(headerType) {
		let headerLogo = document.querySelector(".header__logo"),
			logoImg = new Image();

		logoImg.alt = "FastFoodFast Logo";

		switch (headerType) {
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
    
	addLogOutButton(){
		let logOutButton = document.querySelector(".header__logOut"),
			header = this;
        
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

export default HeaderModel;