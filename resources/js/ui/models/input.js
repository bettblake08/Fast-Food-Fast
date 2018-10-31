import Component from "../../abstract/component_model";

class InputModel extends Component{
	constructor(props){
		super(props);

	}

	displayError(message, ERROR_DISPLAY_DELAY = 3000) {
		let main = this,
			inputComment = this.components.inputComment,
			inputErrorComment = this.components.inputErrorComment;

		inputComment.classList.replace(
			`${this.props.class}__comment--active`,
			`${this.props.class}__comment--disabled`);

		inputErrorComment.innerHTML = message;
        
		inputErrorComment.classList.replace(
			"errorComment--disabled",
			"errorComment--active");

		this.setStatus(1, ERROR_DISPLAY_DELAY);

		setTimeout(() => {
			main.closeErrorDisplay();                
		}, ERROR_DISPLAY_DELAY);
	}
    
	closeErrorDisplay() {
		let inputComment = this.components.inputComment,
			inputErrorComment = this.components.inputErrorComment;

		if (inputErrorComment.classList.contains("errorComment--active")) {
			inputComment.classList.replace(
				`${this.props.class}__comment--disabled`,
				`${this.props.class}__comment--active`);

			inputErrorComment.innerHTML = "";
			
			inputErrorComment.classList.replace(
				"errorComment--active",
				"errorComment--disabled"
			);
		}
	}

	setStatus(option, STATE_DISPLAY_DELAY = 0) {
		let state = this.state,
			components = this.components,
			props = this.props,
			main = this;

		let oldStatusClass = this.getInputClass(props.class, state.status);
		let newStatusClass = this.getInputClass(props.class, option);

		components.main.classList.replace(oldStatusClass, newStatusClass);

		if ((option === 1 || option === 2) && STATE_DISPLAY_DELAY !== 0) {
			
			setTimeout(() => {
				let newStatusClass = this.getInputClass(props.class, option);
				let mainStatusClass = this.getInputClass(props.class, props.status);

				components.main.classList.replace(newStatusClass, mainStatusClass);

				state.status = props.status;
				main.state = state;
			}, STATE_DISPLAY_DELAY);

		} else {
			state.status = option;
			main.state = state;
		}
	}

	getInputClass(className, status) {
		switch (status) {
		case 0:
			return `${className}--normal`;
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

export default InputModel;