import Views from "../../ui/views";
import Button from "../../ui/button";
import Component from "../../abstract/component_model";
import MenuItem from "../../components/admin/menu_item";
import AddMenuItemForm from "../../components/admin/menu_add_form";
import { apiV1 } from "../../abstract/variables";

class MenuView extends Component{
	constructor(params) {
		super(params);

		this.state = {
			buttons:[],
			menuItems:[]
		};
		
		this.initializeMenu();
	}

	initializeMenu(){
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
				menuView.props.parent.updateView(1);
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

		this.components = {
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
    
	setMenuError(message) {
		let components = this.components,
			fetchMenuError = `<div class="menu__content__error f_h2">${message}</div>`;

		components.menuCategoryBreakfastContent.innerHTML = fetchMenuError;
		components.menuCategoryMainMealContent.innerHTML = fetchMenuError;
		components.menuCategorySnacksContent.innerHTML = fetchMenuError;
		components.menuCategoryDrinksContent.innerHTML = fetchMenuError;
	}
    
	updateMenu(menu) {
		let main = this,
			categories = [[],[],[],[]];

		if(menu.length === 0){
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

		let message = "No items in this category. Please add something!",
			fetchMenuError = `<div class="menu__content__error f_h2">${message}</div>`;
    
		if (categories[0].length === 0){
			this.components.menuCategoryBreakfastContent.innerHTML = fetchMenuError;
		}
		else{
			categories[0].forEach(item => {
				this.components.menuCategoryBreakfastContent.appendChild(item);
			});
		}
        
		if (categories[1].length === 0) {
			this.components.menuCategoryMainMealContent.innerHTML = fetchMenuError;
		} else {
			categories[1].forEach(item => {
				this.components.menuCategoryMainMealContent.appendChild(item);
			});
		}

		if (categories[2].length === 0) {
			this.components.menuCategorySnacksContent.innerHTML = fetchMenuError;
		} else {
			categories[2].forEach(item => {
				this.components.menuCategorySnacksContent.appendChild(item);
			});
		}

		if (categories[3].length === 0) {
			this.components.menuCategoryDrinksContent.innerHTML = fetchMenuError;
		} else {
			categories[3].forEach(item => {
				this.components.menuCategoryDrinksContent.appendChild(item);
			});
		}
	}

	fetchMenu() {
		let main = this;

		fetch(`${apiV1}/menu`
		).then((response) => {

			if (response.status === 200) {
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
