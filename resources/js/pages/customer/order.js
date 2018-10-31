import OrderItem from "../../components/customer/order_item";
import Button from "../../ui/button";
import {apiV1, webUrl} from "../../abstract/variables";
import {refreshToken, getAccessToken, displayError} from "../../abstract/mixins";
import CustomerHeader from "../../components/headers/customer";
import Component from "../../abstract/component_model";

class OrderForm extends Component{
	constructor() {
		super();

		this.state = {
			orderItems:[],
			buttons:[],
			total:0
		};

	}
    
	init(){
		let main = document.createElement("div"),
			orderMenuContent = document.createElement("div"),
			orderMenuTopbar = document.createElement("div"),
			orderMenuTitle = document.createElement("div"),
			orderMenuBottom = document.createElement("div"),
			orderMenuError = document.createElement("div"),
			orderMenuOrderButton = document.createElement("div"),
			orderMenuTotal = document.createElement("div"),
			orderMenuCategoryBreakfast = document.createElement("div"),
			orderMenuCategorySnacks = document.createElement("div"),
			orderMenuCategoryDrinks = document.createElement("div"),
			orderMenuCategoryMain = document.createElement("div"),
			OrderForm = this;

		orderMenuTitle.classList.add("foodMenu__title");
		orderMenuTitle.classList.add("f_h1");
		orderMenuTitle.innerHTML = "Order Menu";

		orderMenuTopbar.classList.add("foodMenu__topBar");
		orderMenuTopbar.appendChild(orderMenuTitle);

		orderMenuContent.classList.add("foodMenu__content");

		orderMenuError.classList.add("foodMenu__error");
		orderMenuError.classList.add("errorComment--disabled");
		orderMenuError.classList.add("f_comment_1");

		let button = new Button({
			class: "btn_1",
			textClass: "f_button_2",
			label: "Make order",
			parent: this,
			status: 0,
			action: () => {
				OrderForm.makeOrder();
			}
		});

		button.init();

		orderMenuOrderButton.classList.add("foodMenu__orderBtn");
		orderMenuOrderButton.appendChild(button.getButton());

		orderMenuTotal.classList.add("foodMenu__total");
		orderMenuTotal.classList.add("f_normal");
		orderMenuTotal.innerHTML = "KSH " + 0;

		orderMenuBottom.classList.add("foodMenu__bottom");
		orderMenuBottom.appendChild(orderMenuOrderButton);
		orderMenuBottom.appendChild(orderMenuTotal);

		orderMenuCategoryBreakfast.classList.add("foodMenu__category");
		orderMenuCategoryBreakfast.innerHTML = "<h2 class=\"f_h2\">Breakfast Meals</h2>";

		orderMenuCategoryMain.classList.add("foodMenu__category");
		orderMenuCategoryMain.innerHTML = "<h2 class=\"f_h2\">Main Meals</h2>";

		orderMenuCategorySnacks.classList.add("foodMenu__category");
		orderMenuCategorySnacks.innerHTML = "<h2 class=\"f_h2\">Snacks</h2>";

		orderMenuCategoryDrinks.classList.add("foodMenu__category");
		orderMenuCategoryDrinks.innerHTML = "<h2 class=\"f_h2\">Drinks</h2>";

		orderMenuContent.appendChild(orderMenuCategoryBreakfast);
		orderMenuContent.appendChild(orderMenuCategoryMain);
		orderMenuContent.appendChild(orderMenuCategorySnacks);
		orderMenuContent.appendChild(orderMenuCategoryDrinks);

		main.appendChild(orderMenuTopbar);
		main.appendChild(orderMenuContent);
		main.appendChild(orderMenuError);
		main.appendChild(orderMenuBottom);

		document.querySelector(".foodMenu").appendChild(main);

		this.components = {
			main,
			orderMenuContent,
			orderMenuTopbar,
			orderMenuError,
			orderMenuTitle,
			orderMenuBottom,
			orderMenuOrderButton,
			orderMenuTotal,
			orderMenuCategoryBreakfast,
			orderMenuCategorySnacks,
			orderMenuCategoryDrinks,
			orderMenuCategoryMain
		};
	}	

	setMenuError(message){
		let components = this.components,
			fetchMenuError = `<div class="foodMenu__content__error f_h1">${message}</div>`;

		components.orderMenuCategoryBreakfast.innerHTML = "<h2 class=\"f_h2\">Breakfast Meals</h2>" + fetchMenuError;
		components.orderMenuCategoryMain.innerHTML = "<h2 class=\"f_h2\">Main Meals</h2>" + fetchMenuError;
		components.orderMenuCategorySnacks.innerHTML = "<h2 class=\"f_h2\">Snacks</h2>" + fetchMenuError;
		components.orderMenuCategoryDrinks.innerHTML = "<h2 class=\"f_h2\">Drinks</h2>" + fetchMenuError;

		this.components = components;
	}

	updateOrderMenu(menu){
		let main = this,
			categories = [
				[],
				[],
				[],
				[]
			];

		if (menu.length === 0) {
			this.setMenuError("No items in this category. Please add something!");
			return;
		}

		menu.forEach(orderItem => {
			let item = new OrderItem({
				item: orderItem,
				parent: main,
				onUpdate:()=>{
					main.updateOrder();
				}
			});

			categories[orderItem.c_id - 1].push(item.getOrderItem());
		});

		let message = "No items in this category.",
			fetchMenuError = `<div class="foodMenu__content__error f_h2">${message}</div>`;

		if (categories[0].length === 0) {
			this.components.orderMenuCategoryBreakfast.innerHTML = "<h2 class=\"f_h2\">Breakfast Meals</h2>" + fetchMenuError;
		} else {
			categories[0].forEach(item => {
				this.components.orderMenuCategoryBreakfast.appendChild(item);
			});
		}

		if (categories[1].length === 0) {
			this.components.orderMenuCategoryMain.innerHTML = "<h2 class=\"f_h2\">Main Meals</h2>" + fetchMenuError;
		} else {
			categories[1].forEach(item => {
				this.components.orderMenuCategoryMain.appendChild(item);
			});
		}

		if (categories[2].length === 0) {
			this.components.orderMenuCategorySnacks.innerHTML = "<h2 class=\"f_h2\">Snacks</h2>" + fetchMenuError;
		} else {
			categories[2].forEach(item => {
				this.components.orderMenuCategorySnacks.appendChild(item);
			});
		}

		if (categories[3].length === 0) {
			this.components.orderMenuCategoryDrinks.innerHTML = "<h2 class=\"f_h2\">Drinks</h2>" + fetchMenuError;
		} else {
			categories[3].forEach(item => {
				this.components.orderMenuCategoryDrinks.appendChild(item);
			});
		}
        
	}

	updateOrder(){
		let state = this.state;
		state.total = 0;

		state.orderItems.forEach((item)=>{
			if(item.state.quantity != 0){
				state.total += item.state.total;
			}
		});

		this.components.orderMenuTotal.innerHTML = "KSH " + (state.total/100);
		this.state = state;
	}

	fetchMenu(){
		let main = this;

		fetch(`${apiV1}/menu`).then((response)=>{

			if(response.status === 200){
				return response.json();
			}
            
			main.setMenuError("Failed to fetch menu. Please try again later!");
		}).then((response)=>{
			if (response != undefined) {
				main.updateOrderMenu(response.content);
			}
		});
	}
    
	makeOrder(){
		let orderedItems = [];

		this.state.orderItems.forEach((item)=>{
			if(item.state.quantity != 0){
				orderedItems.push({
					id:item.state.item.id,
					quantity:item.state.quantity
				});
			}
		});
        
		if(orderedItems.length === 0){
			displayError(".foodMenu__error", "You have not selected any items!", 3000);
			return;
		}

		this.state.buttons[0].setStatus(3);
		let OrderItem = this;

		fetch(`${apiV1}/users/orders`, {
			method:"post",
			body:JSON.stringify({
				items:JSON.stringify(orderedItems)
			}),
			headers:{
				"Authorization": `Bearer ${getAccessToken()}`,
				"Content-Type":"application/json"
			}
		}).then((response) => {
            
			if (response.status === 201) {
				return response.json();
			}
			else if(response.status === 401){

				refreshToken({
					onSuccess: () => {
						OrderItem.makeOrder();
					},
					onFailure: () => {
						window.location.href = webUrl + "/customer/login";
					}
				});
			}
			else if(response === 403){
				window.location.href = webUrl + "/customer/login";
			}
            
			this.state.buttons[0].setStatus(1);
		}).then((response) => {
			if (response != undefined) {
				this.state.buttons[0].setStatus(2);
				window.location.href = webUrl + "/customer/orderHistory";
			}
		});
	}

}

let orderForm = new OrderForm();
let header = new CustomerHeader();

document.addEventListener("DOMContentLoaded", () => {
	header.init();
	orderForm.init();
	orderForm.fetchMenu();
});

export default OrderForm;