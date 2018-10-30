import logoWhite from "../../../images/logo2.png";
import logoBlack from "../../../images/logo.png";

class MainHeader{
	constructor(params) {
		/* 
        This is the MainHeader model constructor

        :args
            type    :   The header types
        */
		this._state = {
			headerType: params.type == undefined ? "black" : params.type
		};

		this._components = {};
	}

	get state() {
		return this._state;
	}

	set state(value) {
		this._state = value;
	}

	get component() {
		return this._component;
	}

	set component(value) {
		this._component = value;
	}

	init(){
		let headerLogo = document.querySelector(".header__logo"),
			logoImg = new Image();
            
		logoImg.alt = "FastFoodFast Logo";

		switch (this.state.headerType){
		case "black":{
			logoImg.src = logoBlack;
			break;
		}
		case "white":{
			logoImg.src = logoWhite;
			break;
		}
		}

		headerLogo.appendChild(logoImg);        
	}
}

export default MainHeader;