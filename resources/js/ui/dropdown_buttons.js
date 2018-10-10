import Button from "./button";

class DropdownButtons{
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

		this._state = {
			toggle:false,
			buttons:[]
		};

		let dropdownButtons = this,
			main = document.createElement("div"),
			ddMainButton = document.createElement("div"),
			ddButtons = document.createElement("div");
        
		let mainButton = new Button({
			class:`${params.class}__main__button`,
			textClass:params.textClass,
			status:0,
			label:params.label,
			parent:dropdownButtons,
			action:()=>{
				dropdownButtons.toggleButtonOptions();
			}
		});

		mainButton.init();

		ddMainButton.classList.add(`${params.class}__main`);
		ddMainButton.appendChild(mainButton.getButton());
        
		ddButtons.classList.add(`${params.class}__buttons--disabled`);

		params.buttons.forEach(button => {
			let newButton = new Button({
				class: `${params.class}__button`,
				textClass: params.textClass,
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
        
		main.classList.add(`${params.class}`);

		main.appendChild(ddMainButton);
		main.appendChild(ddButtons);
        
		this._components = {
			main,
			ddMainButton,
			ddButtons
		};
        
		this._props = params;
        
		/*  
        parentState = params.parent.state;
        parentState.dropdownButtons.push(this);
        params.parent.state = parentState;
        */

		params.parent.state.dropdownButtons.push(this);
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

	getDropDownButtonsComponent(){
		return this.component.main;
	}

	toggleButtonOptions(){
		let state = this.state;
        
		if(state.toggle){
			this.component.ddButtons.classList.replace(
				`${this.props.class}__buttons--active`,
				`${this.props.class}__buttons--disabled`,
			);

			state.toggle = false;
		}   
		else{
			this.component.ddButtons.classList.replace(
				`${this.props.class}__buttons--disabled`,
				`${this.props.class}__buttons--active`,
			);

			state.toggle = false;
		}

		this.state = state;
	}

}

export default DropdownButtons;