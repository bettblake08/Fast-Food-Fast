import InputModel from "./models/input";

class TextInput extends InputModel{

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
            components   :   Contains text input elements
            parent  :   Contains the parent object instance
        */
		super(params);

		this.state = {
			inputValue:"",
			status:params.status == undefined ? 0 : params.status,
			test:params.test ==  undefined ? () => { return true; } : params.test
		};

		this.parent = params.parent;

		this.create();
	}
	
	create(){
		let main = document.createElement("div"),
			textInput = document.createElement("input"),
			inputLabel = document.createElement("label"),
			inputComment = document.createElement("div"),
			inputErrorComment = document.createElement("div");

		inputErrorComment.classList.add(
			"errorComment--disabled",
			`${this.props.class}__error`,
			"f_comment_1");

		inputComment.classList.add(
			`${this.props.class}__comment--active`,
			"f_comment_1");

		inputComment.innerHTML = this.props.comment == undefined ? "" : this.props.comment;

		inputLabel.setAttribute("htmlFor", this.props.name);
		inputLabel.innerHTML = this.props.label;

		textInput.setAttribute("type", this.props.type);
		textInput.setAttribute("id", this.props.name);
		textInput.setAttribute("placeholder", this.props.placeholder);
		textInput.classList.add(this.props.textClass);
		textInput.addEventListener("focusout", () => {
			this.testInput();
		});

		main.classList.add(
			"has-float-label",
			this.props.textClass,
			this.getInputClass(this.props.class, this.props.status)
		);

		main.appendChild(textInput);
		main.appendChild(inputLabel);
		main.appendChild(inputComment);
		main.appendChild(inputErrorComment);

		this.components = {
			main,
			textInput,
			inputLabel,
			inputComment,
			inputErrorComment
		};
	}

	init(){
		let props = this.props,
			parentState = props.parent.state;

		parentState.textInputs.push(this);

		props.parent.state = parentState;
		this.props = props;
	}

	testInput(){
		let testResults = this.state.test(this.components.textInput.value);

		if(!testResults.status){
			this.displayError(testResults.message, 5000);
			this.setStatus(1);
		}
		else {
			this.setStatus(2);
			this.closeErrorDisplay();
		}
        
		return testResults.status;
	}
    
	getInput(){
		return this.components.main;
	}

	focus(){
		this.components.textInput.focus();
	}

	getInputValue(){
		return this.components.textInput.value;
	}

}

export default TextInput;