import Component from "../../abstract/component_model";
import TextInput from "../../ui/textInput";
import DropDownInput from "../../ui/dropdown";
import Button from "../../ui/button";
import {
	apiV1,
	webUrl
} from "../../abstract/variables";
import {
	refreshToken,
	getAccessToken
} from "../../abstract/mixins";

class AddMenuItemForm extends Component{
	constructor(params) {
		super(params);

		this.state = {
			buttons: [],
			textInputs: [],
			dropdowns: []
		};
		
		this.create();
	}

	create(){
		let form = this,
			main = document.createElement("div"),
			addMenuItemTitle = document.createElement("div"),
			addMenuItemForm = document.createElement("div"),
			addMenuItemName = document.createElement("div"),
			addMenuItemPrice = document.createElement("div"),
			addMenuItemCategory = document.createElement("div"),
			addMenuItemButtons = document.createElement("div");

		addMenuItemTitle.classList.add("addMenuItem__title");
		addMenuItemTitle.classList.add("f_h1");
		addMenuItemTitle.innerHTML = "Add new menu item";

		let itemNameInput = new TextInput({
			parent: this,
			name: "itemName",
			label: "Name",
			placeholder: "Eg. Cheese burger",
			class: "text_input",
			textClass: "f_input_1",
			type: "text",
			status: 0,
			test: (input) => {
				if (input.length == 0) {
					return {
						status: false,
						message: "Item name field is empty."
					};
				}

				if (input.length > 120) {
					return {
						status: false,
						message: "Item name is too long. Please input an item name less than 120 characters."
					};
				}

				return {
					status: true
				};
			}
		});

		let itemPriceInput = new TextInput({
			parent: this,
			name: "itemPrice",
			label: "Price",
			placeholder: "Eg. 1400.45. Price in Kenyan Shillings",
			class: "text_input",
			textClass: "f_input_1",
			type: "text",
			status: 0,
			test: (input) => {
				if (input.length == 0) {
					return {
						status: false,
						message: "Item price field is empty."
					};
				}

				let floatCheck = /^([0-9]+(\.[0-9]+)?|Infinity)$/;

				if (!floatCheck.test(input)) {
					return {
						status: false,
						message: "Item price field is invalid. Please provide a positive float number!"
					};
				}

				return {
					status: true
				};
			}
		});

		itemNameInput.init();
		itemPriceInput.init();

		addMenuItemName.classList.add("addMenuItem__name");
		addMenuItemPrice.classList.add("addMenuItem__price");

		addMenuItemName.appendChild(itemNameInput.getInput());
		addMenuItemPrice.appendChild(itemPriceInput.getInput());

		addMenuItemCategory.classList.add("addMenuItem__category");

		let categoryOptions = new DropDownInput({
			class: "dropdown",
			textClass: "f_input_dd_1",
			label: "Menu Category",
			name: "menuCategory",
			parent: form,
			status: 0,
			options: [{
				value: 1,
				text: "Breakfast"
			},
			{
				value: 2,
				text: "Main Meal"
			},
			{
				value: 3,
				text: "Snacks"
			},
			{
				value: 4,
				text: "Drinks"
			}
			]
		});

		categoryOptions.init();
		addMenuItemCategory.appendChild(categoryOptions.getDropDownInput());

		addMenuItemForm.classList.add("addMenuItem__form");
		addMenuItemForm.appendChild(addMenuItemName);
		addMenuItemForm.appendChild(addMenuItemPrice);
		addMenuItemForm.appendChild(addMenuItemCategory);

		addMenuItemButtons.classList.add("addMenuItem__buttons");

		let saveButton = document.createElement("div"),
			cancelButton = document.createElement("div");

		saveButton.classList.add("addMenuItem__button");
		cancelButton.classList.add("addMenuItem__button");

		let save = new Button({
			class: "btn_1",
			textClass: "f_button_2",
			label: "Save",
			parent: form,
			status: 0,
			action: () => {
				form.addNewMenuItem();
			}
		});

		let cancel = new Button({
			class: "btn_1",
			textClass: "f_button_2",
			label: "Cancel",
			parent: form,
			status: 0,
			action: () => {
				form.props.parent.updateView(0);
			}
		});

		save.init();
		cancel.init();

		saveButton.appendChild(save.getButton());
		cancelButton.appendChild(cancel.getButton());

		addMenuItemButtons.appendChild(cancelButton);
		addMenuItemButtons.appendChild(saveButton);

		main.classList.add("addMenuItem");
		main.appendChild(addMenuItemTitle);
		main.appendChild(addMenuItemForm);
		main.appendChild(addMenuItemButtons);

		this.components = {
			main,
			addMenuItemTitle,
			addMenuItemForm,
			addMenuItemName,
			addMenuItemPrice,
			addMenuItemCategory
		};
	}

	addNewMenuItem() {
		let textInputs = this.state.textInputs,
			dropdowns = this.state.dropdowns,
			form = this;

		let invalidInput = textInputs.find(input => {
			return input.state.status != 2;
		});

		if (invalidInput != undefined) {
			invalidInput.focus();
			return;
		}

		if (!dropdowns[0].isValid()) {
			dropdowns[0].focus();
		}

		fetch(`${apiV1}/menu`, {
			method: "POST",
			body: JSON.stringify({
				name: textInputs[0].getInputValue(),
				price: parseFloat(textInputs[1].getInputValue()),
				c_id: dropdowns[0].getInputValue()
			}),
			headers: {
				"Authorization": `Bearer ${getAccessToken()}`,
				"Content-Type": "application/json"
			}
		}).then((response) => {

			switch (response.status) {
			case 201:
			{
				return response.json();
			}
			case 401:
			{
				refreshToken({
					onSuccess: () => {
						form.addNewMenuItem();
					},
					onFailure: () => {
						window.location.href = webUrl + "/admin/login";
					}
				});
				break;
			}
			case 403:
			{
				window.location.href = webUrl + "/admin/login";
				break;
			}
			}

			form.state.buttons[0].setStatus(1);
		}).then((response) => {

			if (response != undefined) {
				form.state.buttons[0].setStatus(2);
				window.location.href = webUrl + "/admin/menu";
			}
		});
	}

	getViewComponent() {
		return this.components.main;
	}
}

export default AddMenuItemForm;