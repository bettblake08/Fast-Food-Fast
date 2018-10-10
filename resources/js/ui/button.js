class Button {
	constructor(params) {
		/*
        This is the Button Model class constructor

        :args
            class   :   Button main css class
            textClass   :   Button typography css class
            action  :   On click function
            label   :   Button label
            parent  :   Parent object instance
            status  :   Main button status
                        0:  normal
                        1:  fail - temporary state
                        2:  success - temporary state
                        3:  loading
                        4:  warning
                        5:  fail 
                        6:  success 
        */

		this._state = {
			status: params.status
		};

		this._props = params;

		let main = document.createElement("button");

		main.setAttribute("type","button");
		main.classList.add(params.textClass);
		main.classList.add(this.getButtonClass(params.class,params.status));
		main.innerHTML = params.label;
		main.addEventListener("click",params.action);

		this._component = {
			main
		};
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

	get props() {
		return this._props;
	}

	set props(value) {
		this._props = value;
	}

	getButton(){
		return this.component.main;
	}

	init(){
		let parentState = this.props.parent.state;
		parentState.buttons.push(this);
		this.props.parent.state = parentState;
	}

	setStatus(option, STATE_DISPLAY_DELAY = 3000) {
		let state = this.state,
			component = this.component,
			props = this.props,
			main = this;

		let oldStatusClass = this.getButtonClass(props.class, state.status);
		let newStatusClass = this.getButtonClass(props.class, option);

		component.main.classList.replace(oldStatusClass,newStatusClass);
        
		if (option == 1 || option == 2) {
			setTimeout(() => {
				let newStatusClass = this.getButtonClass(props.class, option);
				let mainStatusClass = this.getButtonClass(props.class, props.status);

				component.main.classList.replace(newStatusClass, mainStatusClass);

				state.status = props.status;
				main.state = state;
			}, STATE_DISPLAY_DELAY);
		}
		else {
			state.status = option;
			main.state = state;
		}
	}
    
	getButtonClass(className, status) {
		switch (status) {
		case 0:
			return `${className}`;
		case 1:
		case 5:
			return `${className}--fail`;
		case 2:
		case 6:
			return `${className}--success`;
		case 3:
			return `${className}--loading`;
		case 4:
			return `${className}--warning`;
		}
	}

}

export default Button;