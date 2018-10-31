import InputModel from "./models/input";

class DropDownInput extends InputModel{
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
						5: 	fail
						6:	success
        */
		if (params.action == undefined) {
			params.action = () => {};
		}

		super(params);

		this.state = {
			status: params.status
		};

		this.create();
	}

	create(){
		let input = this,
			main = document.createElement("div"),
			inputLabel = document.createElement("label"),
			inputSelect = document.createElement("select"),
			inputComment = document.createElement("div"),
			inputErrorComment = document.createElement("div"),
			inputDefaultOption = document.createElement("option"),
			inputOptions = [];

		inputLabel.setAttribute("htmlFor", this.props.name);
		inputLabel.classList.add("f_h2");
		inputLabel.innerHTML = this.props.label;

		inputComment.classList.add(
			`${this.props.class}__comment--active`,
			"f_comment_1");

		inputErrorComment.classList.add(
			`${this.props.class}__error--disabled`,
			"f_comment_1");

		inputDefaultOption.innerHTML = this.props.placeholder == undefined ? "-- Select --" : this.props.placeholder;
		inputDefaultOption.value = "";

		inputSelect.setAttribute("id", this.props.name);
		inputSelect.classList.add(this.props.textClass);
		inputSelect.appendChild(inputDefaultOption);
		inputSelect.addEventListener("focusout", () => {
			input.updateStatus();
		});

		this.props.options.forEach(option => {
			let inputOption = document.createElement("option");
			inputOption.value = option.value;
			inputOption.innerHTML = option.text;

			inputOptions.push(inputOption);
			inputSelect.appendChild(inputOption);
		});

		main.classList.add(
			this.props.class,
			this.getInputClass(this.props.class, this.props.status));

		main.appendChild(inputLabel);
		main.appendChild(inputSelect);
		main.appendChild(inputComment);
		main.appendChild(inputErrorComment);

		this.components = {
			main,
			inputLabel,
			inputSelect,
			inputComment,
			inputErrorComment,
			inputOptions
		};
	}

	updateStatus(){
		if(this.getInputValue() == ""){
			this.displayError("No item selected!");
		}
		else{
			this.setStatus(6);
		}
	}

	getDropDownInput() {
		return this.components.main;
	}
    
	getInputValue(){
		return this.components.inputSelect.value;
	}

	isValid(){
		return this.state.status === 6;
	}

	init() {
		let parentState = this.props.parent.state;
		parentState.dropdowns.push(this);
		this.props.parent.state = parentState;
	}

	focus(){
		this.components.main.focus();
	}

}

export default DropDownInput;