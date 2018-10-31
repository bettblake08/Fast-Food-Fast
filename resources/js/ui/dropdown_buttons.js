import Button from "./button";
import Component from "../abstract/component_model";

class DropdownButtons extends Component{
	constructor(params) {
		/*
        This is the DropdownButtons Model class constructor

        :args
            class   :   Button main css class
            textClass   :   Button typography css class
            label   :   Button label
            parent  :   Parent object instance
            buttons :   List of button objects each containing
                        name    :   button name
                        action  :   button action
        */
		super(params);

		this.state = {
			toggle:false,
			buttons:[]
		};

		this.create();

		params.parent.state.dropdownButtons.push(this);
	}

	create(){
		let dropdownButtons = this,
			main = document.createElement("div"),
			ddMainButton = document.createElement("div"),
			ddButtons = document.createElement("div");

		let mainButton = new Button({
			class: `${this.props.class}__main__button`,
			textClass: this.props.textClass,
			status: 0,
			label: this.props.label,
			parent: dropdownButtons,
			action: () => {
				dropdownButtons.toggleButtonOptions();
			}
		});

		mainButton.init();

		ddMainButton.classList.add(`${this.props.class}__main`);
		ddMainButton.appendChild(mainButton.getButton());

		ddButtons.classList.add(`${this.props.class}__buttons--disabled`);

		this.props.buttons.forEach(button => {
			let newButton = new Button({
				class: `${this.props.class}__button`,
				textClass: this.props.textClass,
				status: 0,
				label: button.name,
				parent: dropdownButtons,
				action: () => {
					button.action();
				}
			});

			newButton.init();
			ddButtons.appendChild(newButton.getButton());
		});

		main.classList.add(`${this.props.class}`);

		main.appendChild(ddMainButton);
		main.appendChild(ddButtons);

		this.components = {
			main,
			ddMainButton,
			ddButtons
		};
	}

	getDropDownButtonsComponent(){
		return this.components.main;
	}

	toggleButtonOptions(){
		let state = this.state;
        
		if(state.toggle){
			this.components.ddButtons.classList.replace(
				`${this.props.class}__buttons--active`,
				`${this.props.class}__buttons--disabled`,
			);

			state.toggle = false;
		}   
		else{
			this.components.ddButtons.classList.replace(
				`${this.props.class}__buttons--disabled`,
				`${this.props.class}__buttons--active`,
			);

			state.toggle = true;
		}

		this.state = state;
	}
	
}

export default DropdownButtons;