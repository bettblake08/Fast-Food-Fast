import HeaderModel from "./model";

class MainHeader extends HeaderModel{
	constructor(params) {
		/* 
        This is the MainHeader model constructor

        :args
            type    :   The header types
        */
		super(params);

		this.state = {
			headerType: params.type == undefined ? "black" : params.type
		};

		this.components = {};
	}

	init(){
		this.changeHeaderType(this.state.headerType);   
	}
}

export default MainHeader;