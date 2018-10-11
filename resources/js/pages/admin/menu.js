import Views from "../../ui/views";
import {apiV1,webUrl} from "../../abstract/variables";
import {refreshToken, getAccessToken} from "../../abstract/mixins";
import Button from "../../ui/button";
import breakfastImg from "../../../images/breakfast.png";
import mainmealImg from "../../../images/main.png";
import snacksImg from "../../../images/snacks.png";
import drinksImg from "../../../images/drinks.png";
import TextInput from "../../ui/textInput";
import DropDowmInput from "../../ui/dropdown";

class MenuItem{
	constructor(params) {
		/* 
        This is an order item model class constructor

        :args
            parent  :   Parent object instance
            item    :   Item object containing
                        name    :   Item name
                        price   :   Item price
                        id      :   Item id
            onUpdate:   A function called after quantity update

            
        :attribute
            state   :   Contains the state of order item containing:
                        total   :   total price for all orders of this item
                        quantity:   number of orders for this item
                        item    :   item object

            component   :   Contains text input elements
        */

		this._state = {
			total:0,
			quantity:0,
			item:params.item
		};

		let OrderForm = this,
			main = document.createElement("div"),
			itemImage = document.createElement("div"),
			itemImageImg = new Image(),
			itemName = document.createElement("div"),
			itemPrice = document.createElement("div");
        
		switch(params.item.c_id){
		case 1:{
			itemImageImg.src = breakfastImg;
			break;
		}
		case 2: {
			itemImageImg.src = mainmealImg;
			break;
		}
		case 3: {
			itemImageImg.src = snacksImg;
			break;
		}
		case 4: {
			itemImageImg.src = drinksImg;
			break;
		}
		}
		
		itemImageImg.alt = params.item.name;

		itemImage.classList.add("menuItem__image");
		itemImage.appendChild(itemImageImg);

		itemName.classList.add("menuItem__name");
		itemName.classList.add("f_normal");
		itemName.innerHTML = params.item.name;

		itemPrice.classList.add("menuItem__price");
		itemPrice.classList.add("f_normal");
		itemPrice.innerHTML = "KSH " + (params.item.price/100);

		main.classList.add("menuItem");
		main.appendChild(itemImage);
		main.appendChild(itemName);
		main.appendChild(itemPrice);

		this._component = {
			main,
			itemImage,
			itemImageImg,
			itemName,
			itemPrice,
		};

		let parentState = params.parent.state;
		parentState.menuItems.push(this);
		params.parent.state = parentState;
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
    
	getOrderItem(){
		return this.component.main;
	}
    
}

class MenuView {
	constructor(params) {

		this._state = {
			buttons:[],
			menuItems:[]
		};

		let menuView = this,
			main = document.createElement("div"),
			menuTopbar = document.createElement("div"),
			menuTopbarButtons = document.createElement("div"),
			menuAddItemButton = document.createElement("div"),
			menuTitle = document.createElement("div"),
			menuContent = document.createElement("div"),
			menuCategoryBreakfast = document.createElement("div"),
			menuCategoryBreakfastContent = document.createElement("div"),
			menuCategoryMainMeal = document.createElement("div"),
			menuCategoryMainMealContent = document.createElement("div"),
			menuCategorySnacks = document.createElement("div"),
			menuCategorySnacksContent = document.createElement("div"),
			menuCategoryDrinks = document.createElement("div"),
			menuCategoryDrinksContent = document.createElement("div");

		menuTitle.classList.add("menu__title");
		menuTitle.classList.add("f_h1");
		menuTitle.innerHTML = "Menu";  

		let addItemButton = new Button({
			class: "btn_1",
			textClass: "f_button_1",
			label: "Add Item",
			parent: menuView,
			status: 0,
			action: () => {
				params.parent.updateView(1);
			}
		});

		addItemButton.init();
        
		menuAddItemButton.classList.add("menu__topBar__button");
		menuAddItemButton.appendChild(addItemButton.getButton());

		menuTopbarButtons.classList.add("menu__topBar__buttons");
		menuTopbarButtons.appendChild(menuAddItemButton);

		menuTopbar.classList.add("menu__topBar");
		menuTopbar.appendChild(menuTitle);
		menuTopbar.appendChild(menuTopbarButtons);        

		menuCategoryBreakfast.classList.add("menu__category");
		menuCategoryBreakfast.innerHTML = "<h2 class=\"f_h2\">Breakfast</h2>";

		menuCategoryBreakfastContent.classList.add("menu__category__content");
		menuCategoryBreakfast.appendChild(menuCategoryBreakfastContent);

		menuCategoryMainMeal.classList.add("menu__category");
		menuCategoryMainMeal.innerHTML = "<h2 class=\"f_h2\">MainMeal</h2>";

		menuCategoryMainMealContent.classList.add("menu__category__content");
		menuCategoryMainMeal.appendChild(menuCategoryMainMealContent);

		menuCategorySnacks.classList.add("menu__category");
		menuCategorySnacks.innerHTML = "<h2 class=\"f_h2\">Snacks</h2>";

		menuCategorySnacksContent.classList.add("menu__category__content");
		menuCategorySnacks.appendChild(menuCategorySnacksContent);

		menuCategoryDrinks.classList.add("menu__category");
		menuCategoryDrinks.innerHTML = "<h2 class=\"f_h2\">Drinks</h2>";

		menuCategoryDrinksContent.classList.add("menu__category__content");
		menuCategoryDrinks.appendChild(menuCategoryDrinksContent);
        
		menuContent.appendChild(menuCategoryBreakfast);
		menuContent.appendChild(menuCategoryMainMeal);
		menuContent.appendChild(menuCategorySnacks);
		menuContent.appendChild(menuCategoryDrinks);

		main.classList.add("menu");
		main.appendChild(menuTopbar);
		main.appendChild(menuContent);

		this._components = {
			main,
			menuTopbar,
			menuTopbarButtons,
			menuAddItemButton,
			menuTitle,
			menuContent,
			menuCategoryBreakfast,
			menuCategoryBreakfastContent,
			menuCategoryMainMeal,
			menuCategoryMainMealContent,
			menuCategorySnacks,
			menuCategorySnacksContent,
			menuCategoryDrinks,
			menuCategoryDrinksContent
		};        

	}

	get state() {
		return this._state;
	}

	set state(value) {
		this._state = value;
	}

	get components() {
		return this._components;
	}

	set components(value) {
		this._components = value;
	}
    
	setMenuError(message) {
		let components = this.components,
			fetchMenuError = document.createElement("div");

		fetchMenuError.classList.add("menu__content__error");
		fetchMenuError.classList.add("f_h1");
		fetchMenuError.innerHTML = message;

		components.menuCategoryBreakfastContent.innerHTML = "";
		components.menuCategoryMainMealContent.innerHTML = "";
		components.menuCategorySnacksContent.innerHTML = "";
		components.menuCategoryDrinksContent.innerHTML = "";

		components.menuCategoryBreakfastContent.appendChild(fetchMenuError);
		components.menuCategoryMainMealContent.appendChild(fetchMenuError);
		components.menuCategorySnacksContent.appendChild(fetchMenuError);
		components.menuCategoryDrinksContent.appendChild(fetchMenuError);
	}
    
	updateMenu(menu) {
		let main = this,
			categories = [[],[],[],[]];

		if(menu.length == 0){
			this.setMenuError("No items in this category. Please add something!");
			return;
		}

		menu.forEach(orderItem => {
			let item = new MenuItem({
				item: orderItem,
				parent: main
			});
            
			categories[orderItem.c_id-1].push(item.getOrderItem());
		});
        
		let fetchMenuError = document.createElement("div");

		fetchMenuError.classList.add("menu__content__error");
		fetchMenuError.classList.add("f_h1");
		fetchMenuError.innerHTML = "No items in this category. Please add something!";
    
		if (categories[0].length == 0){
			this.components.menuCategoryBreakfastContent.appendChild(fetchMenuError);
		}
		else{
			categories[0].forEach(item => {
				this.components.menuCategoryBreakfastContent.appendChild(item);
			});
		}
        
		if (categories[1].length == 0) {
			this.components.menuCategoryMainMealContent.appendChild(fetchMenuError);
		} else {
			categories[1].forEach(item => {
				this.components.menuCategoryMainMealContent.appendChild(item);
			});
		}

		if (categories[2].length == 0) {
			this.components.menuCategorySnacksContent.appendChild(fetchMenuError);
		} else {
			categories[2].forEach(item => {
				this.components.menuCategorySnacksContent.appendChild(item);
			});
		}

		if (categories[3].length == 0) {
			this.components.menuCategoryDrinksContent.appendChild(fetchMenuError);
		} else {
			categories[3].forEach(item => {
				this.components.menuCategoryDrinksContent.appendChild(item);
			});
		}

	}

	fetchMenu() {
		let main = this;

		fetch(`${apiV1}/menu`).then((response) => {

			if (response.status == 200) {
				return response.json();
			}

			main.setMenuError("Failed to fetch menu. Please try again later!");
            
		}).then((response) => {
			if (response != undefined) {
				main.updateMenu(response.content);
			}
		});
	}
    
	getViewComponent(){
		return this.components.main;
	}

}


class AddMenuItemForm{
	constructor(params) {
		this._state = {
			buttons:[],
			textInputs:[],
			dropdowns:[]
		};

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
						message: "Item name field empty."
					};
				}

				if (input.length > 120) {
					return {
						status: false,
						message: "Item name too long. Please input an item name less than 30 characters."
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
			placeholder: "Eg. 1400.45 .Price in Kenyan Shillings",
			class: "text_input",
			textClass: "f_input_1",
			type: "text",
			status: 0,
			test: (input) => {
				if (input.length == 0) {
					return {
						status: false,
						message: "Item price field empty."
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

		let categoryOptions = new DropDowmInput({
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
			textClass: "f_button_1",
			label: "Save",
			parent: form,
			status: 0,
			action: () => {
				form.addNewMenuItem();
			}
		});
        
		let cancel = new Button({
			class: "btn_1",
			textClass: "f_button_1",
			label: "Cancel",
			parent: form,
			status: 0,
			action: () => {
				params.parent.updateView(0);
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

		this._components = {
			main,
			addMenuItemTitle,
			addMenuItemForm,
			addMenuItemName,
			addMenuItemPrice,
			addMenuItemCategory
		};
	}

	get state() {
		return this._state;
	}

	set state(value) {
		this._state = value;
	}
    
	get components(){
		return this._components;
	}

	set components(value){
		this._components = value;
	}
    
	addNewMenuItem(){
		let textInputs = this.state.textInputs,
			form = this;

		let invalidInput = textInputs.find(input => {
			return input.state.status != 2;
		});

		if(invalidInput != undefined){
			invalidInput.focus();
			return;    
		}
        
		fetch(`${apiV1}/menu`,{
			method:"POST",
			body:JSON.stringify({
				name: textInputs[0].getInputValue(),
				price: parseFloat(textInputs[1].getInputValue()),
				c_id:""
			}),
			headers:{
				"Authorization":`Bearer ${getAccessToken()}`,
				"Content-Type": "application/json"
			}
		}).then((response) => { 

			switch(response.status){
			case 201:{
				return response.json();
			}
			case 401:{
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
			}
            
			form.state.buttons[0].setStatus(1);
		}).then((response) => {

			if(response != undefined){
				form.state.buttons[0].setStatus(2);
				window.location.href = webUrl + "/admin/menu";
			}
		});
	}
    
	getViewComponent(){
		return this.components.main;
	}
}

let views = new Views({
	views:[]
});

let menuView = new MenuView({
	parent:views
});

let addMenuItemView = new AddMenuItemForm({
	parent: views
});

views.addView(menuView);
views.addView(addMenuItemView);

views.updateView(0);

document.addEventListener("DOMContentLoaded", () => {
	let content = document.querySelector(".content");
	content.appendChild(views.getViewsComponent());
    
	menuView.fetchMenu();
});
