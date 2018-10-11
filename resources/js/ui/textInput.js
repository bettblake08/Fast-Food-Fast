class TextInput{

	constructor(params) {
		/* 
        This is a text input model class constructor

        :args
            parent  :   Parent object instance
            name    :   Input name
            label   :   Input label
            placeholder :   String to be outputted as input placeholder
            class   :   Main css class for text input block
            textClass   :   Input text typography css class 
            test    :   Function to test the input string. It should return an object with:
                        status  :   true or false
                        message :   error message

            type    :   Input type eg. text, password
            status  :   Main input status
                        0: normal
                        1: fail
                        2: success
                        3: loading
                        4: warning
            
        :attribute
            state   :   Contains the state of text object containing input value
            component   :   Contains text input elements
            parent  :   Contains the parent object instance
        */

		this._state = {
			inputValue:"",
			status:params.status == undefined ? 0 : params.status,
			test:params.test ==  undefined ? () => { return true; } : params.test
		};

		this._component = {};
		this._props = params;
		this._parent = params.parent;

		const main = document.createElement("div");
		const textInput = document.createElement("input");
		const textInputLabel = document.createElement("label");
		const textInputComment = document.createElement("div");
		const textInputErrorComment = document.createElement("div");

		textInputErrorComment.classList.add("errorComment--disabled");
		textInputErrorComment.classList.add("f_comment_1");
        
		textInputComment.classList.add("comment");
		textInputComment.classList.add("f_comment_1");
		textInputComment.innerHTML = params.comment == undefined ? "" : params.comment;
        
		textInputLabel.setAttribute("htmlFor",params.name);
		textInputLabel.innerHTML = params.label;

		textInput.setAttribute("type",params.type);
		textInput.setAttribute("id",params.name);
		textInput.setAttribute("placeholder",params.placeholder);
		textInput.classList.add(params.textClass);
		textInput.addEventListener("focusout", () =>{
			this.testInput();
		});
        
		main.classList.add("has-float-label");
		main.classList.add(params.textClass);
		main.classList.add(this.getInputClass(params.class, params.status));

		main.appendChild(textInput);
		main.appendChild(textInputLabel);
		main.appendChild(textInputComment);
		main.appendChild(textInputErrorComment);

		this._component = {
			main,
			textInput,
			textInputLabel,
			textInputComment,
			textInputErrorComment
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
    
	init(){
		let props = this.props,
			parentState = props.parent.state;

		parentState.textInputs.push(this);

		props.parent.state = parentState;
		this.props = props;
	}

	testInput(){
		let testResults = this.state.test(this.component.textInput.value);

		if(!testResults.status){
			this.setErrorMessage(testResults.message);
			this.displayError(5000);
			this.updateInputStatus(1);
		}
		else {
			this.updateInputStatus(2);
			this.closeErrorDisplay();
		}
        
		return testResults.status;
	}

	setErrorMessage(message){
		let state = this.state;
		state.errorMsg = message;
		this.state = state;
	}

	displayError(ERROR_DISPLAY_DELAY = 3000) {
		console.log("Displaying error: " + this.state.errorMsg);

		let component = this.component,
			state = this.state,
			errorComment = component.textInputErrorComment,
			main = this;

		errorComment.classList.replace("errorComment--disabled", "errorComment--active");
		errorComment.innerHTML = state.errorMsg;

		setTimeout(() => {
			main.closeErrorDisplay();
			main.setErrorMessage("");
		}, ERROR_DISPLAY_DELAY);
	}
    
	closeErrorDisplay(){
		let errorComment = this.component.textInputErrorComment;

		if (errorComment.classList.contains("errorComment--active")) {
			errorComment.classList.replace(
				"errorComment--active",
				"errorComment--disabled"
			);

			errorComment.innerHTML = "";
		}
	}
    
	updateInputStatus(status){
		let mainComponent = this.component.main,
			state = this.state;

		mainComponent.classList.replace(
			this.getInputClass(this.props.class, this.state.status),
			this.getInputClass(this.props.class, status)
		);

		state.status = status;
		this.state = state;
	}
    
	getInputClass(className, status){
		switch(status){
		case 0: return `${className}--normal`;
		case 1: return `${className}--fail`;
		case 2: return `${className}--success`;
		case 3: return `${className}--loading`;
		case 4: return `${className}--warning`;
		}
	}
    
	getInput(){
		return this.component.main;
	}

	focus(){
		this.component.textInput.focus();
	}

	getInputValue(){
		return this.component.textInput.value;
	}

}

export default TextInput;