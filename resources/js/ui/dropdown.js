class DropDownInput {
	constructor(params) {
		/*
        This is the DropDown Model class constructor

        :args
            class   :   DropDown main css class
            textClass   :   DropDown typography css class
            label   :   DropDown label
            name    :   DropDown name
            parent  :   Parent object instance
            placeholder :   Placeholder text
            options :   list of dropdown options
                        value   :   value of option
                        text    :   option display name
            status  :   Main select status
                        0:  normal
                        1:  fail - temporary state
                        2:  success - temporary state
                        3:  loading
                        4:  warning
        */

		if (params.action == undefined){
			params.action = ()=>{};
		}

		this._state = {
			status: params.status
		};

		this._props = params;

		let main = document.createElement("div"),
			inputLabel = document.createElement("label"),
			inputSelect = document.createElement("select"),
			inputComment = document.createElement("div"),
			inputErrorComment = document.createElement("div"),
			inputDefaultOption = document.createElement("option"),
			inputOptions = [];

		inputLabel.setAttribute("htmlFor", params.name);
		inputLabel.classList.add("f_h2");
		inputLabel.innerHTML = params.label;
        
		inputComment.classList.add(`${params.class}__comment--active`);
		inputComment.classList.add("f_comment_1");

		inputErrorComment.classList.add(`${params.class}__error--disabled`);
		inputErrorComment.classList.add("f_comment_1");

		inputDefaultOption.innerHTML = params.placeholder == undefined ? "--select--" : params.placeholder;
		inputDefaultOption.value = "";
        
		inputSelect.setAttribute("id", params.name);
		inputSelect.classList.add(params.textClass);
		inputSelect.appendChild(inputDefaultOption);

		params.options.forEach(option => {
			let inputOption = document.createElement("option");
			inputOption.value = option.value;
			inputOption.innerHTML = option.text;

			inputOptions.push(inputOption);
			inputSelect.appendChild(inputOption);
		});

		main.classList.add(params.class);
		main.classList.add(this.getSelectClass(params.class, params.status));
        
		main.addEventListener("click", params.action);
		
		main.appendChild(inputLabel);
		main.appendChild(inputSelect);
		main.appendChild(inputComment);
		main.appendChild(inputErrorComment);

		this._component = {
			main,
			inputLabel,
			inputSelect,
			inputComment,
			inputErrorComment,
			inputOptions
		};
        
		this._props = params;
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

	getDropDownInput() {
		return this.component.main;
	}
    
	getInputValue(){
		return this.component.inputSelect.value;
	}

	init() {
		let parentState = this.props.parent.state;
		parentState.dropdowns.push(this);
		this.props.parent.state = parentState;
	}
    
	displayError(message, ERROR_DISPLAY_DELAY = 3000){
		let inputComment = this.components.inputComment,
			inputErrorComment = this.components.inputErrorComment;

		inputComment.replace(
			`${this.props.class}__comment--active`,
			`${this.props.class}__comment--disabled`);

		inputErrorComment.innerHTML = message;
		inputErrorComment.replace(
			`${this.props.class}__comment--disabled`,
			`${this.props.class}__comment--active`);
            
		this.setStatus(1,ERROR_DISPLAY_DELAY);

		setTimeout(()=>{
			inputComment.replace(
				`${this.props.class}__comment--disabled`,
				`${this.props.class}__comment--active`);

			inputErrorComment.innerHTML = "";
			inputErrorComment.replace(
				`${this.props.class}__comment--active`,
				`${this.props.class}__comment--disabled`);
		}, ERROR_DISPLAY_DELAY);
	}

	setStatus(option, STATE_DISPLAY_DELAY = 3000) {
		let state = this.state,
			component = this.component,
			props = this.props,
			main = this;

		let oldStatusClass = this.getSelectClass(props.class, state.status);
		let newStatusClass = this.getSelectClass(props.class, option);

		component.main.classList.replace(oldStatusClass, newStatusClass);

		if (option == 1 || option == 2) {
			setTimeout(() => {
				let newStatusClass = this.getSelectClass(props.class, option);
				let mainStatusClass = this.getSelectClass(props.class, props.status);

				component.main.classList.replace(newStatusClass, mainStatusClass);

				state.status = props.status;
				main.state = state;
			}, STATE_DISPLAY_DELAY);
		} else {
			state.status = option;
			main.state = state;
		}
	}

	getSelectClass(className, status) {
		switch (status) {
		case 0:
			return `${className}`;
		case 1:
			return `${className}--fail`;
		case 2:
			return `${className}--success`;
		case 3:
			return `${className}--loading`;
		case 4:
			return `${className}--warning`;
		}
	}

}

export default DropDownInput;