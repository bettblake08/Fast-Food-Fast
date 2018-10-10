import logo from "../../../images/logo.png";

class CustomerHeader{
	init(){
		let headerLogo = document.querySelector(".header__logo img");
		headerLogo.src = logo;
	}
}

let header = new CustomerHeader();

document.addEventListener("DOMContentLoaded", () => {
	header.init();
});