import OrderItem from "../../components/order_item";
import Button from "../../ui/button";
import {apiV1, webUrl} from "../../abstract/variables";
import {refreshToken,getAccessToken} from "../../abstract/mixins";

class OrderForm{
	constructor() {
		this._state = {
			orderItems:[],
			buttons:[],
			total:0
		};

		let main = document.createElement("div"),
			orderMenuContent = document.createElement("div"),
			orderMenuTopbar = document.createElement("div"),
			orderMenuTitle = document.createElement("div"),
			orderMenuBottom = document.createElement("div"),
			orderMenuOrderButton = document.createElement("div"),
			orderMenuTotal = document.createElement("div"),
			orderMenuCategoryBreakfast = document.createElement("div"),
			orderMenuCategorySnack = document.createElement("div"),
			orderMenuCategoryDrinks = document.createElement("div"),
			orderMenuCategoryMain = document.createElement("div"),
			OrderForm = this;
        
		orderMenuTitle.classList.add("foodMenu__title");
		orderMenuTitle.classList.add("f_h1");
		orderMenuTitle.innerHTML = "Order Menu";

		orderMenuTopbar.classList.add("foodMenu__topBar");
		orderMenuTopbar.appendChild(orderMenuTitle);

		orderMenuContent.classList.add("foodMenu__content");
        
		let button = new Button({
			class: "btn_1",
			textClass: "f_button_1",
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

		orderMenuCategorySnack.classList.add("foodMenu__category");
		orderMenuCategorySnack.innerHTML = "<h2 class=\"f_h2\">Snacks</h2>";

		orderMenuCategoryDrinks.classList.add("foodMenu__category");
		orderMenuCategoryDrinks.innerHTML = "<h2 class=\"f_h2\">Drinks</h2>";

		orderMenuContent.appendChild(orderMenuCategoryBreakfast);
		orderMenuContent.appendChild(orderMenuCategoryMain);
		orderMenuContent.appendChild(orderMenuCategorySnack);
		orderMenuContent.appendChild(orderMenuCategoryDrinks);

		main.appendChild(orderMenuTopbar);
		main.appendChild(orderMenuContent);
		main.appendChild(orderMenuBottom);

		this._components = {
			main,
			orderMenuContent,
			orderMenuTopbar,
			orderMenuTitle,
			orderMenuBottom,
			orderMenuOrderButton,
			orderMenuTotal,
			orderMenuCategoryBreakfast,
			orderMenuCategorySnack,
			orderMenuCategoryDrinks,
			orderMenuCategoryMain
		};
	}

	get state (){
		return this._state;
	}

	set state(value){
		this._state = value;
	}

	get components() {
		return this._components;
	}

	set components(value) {
		this._components = value;
	}
    
	init(){
		document.querySelector(".foodMenu").appendChild(this.components.main);
	}

	setMenuError(message){
		let components = this.components,
			fetchMenuError = document.createElement("div");
        
		fetchMenuError.classList.add("foodItem__content__error");
		fetchMenuError.classList.add("f_h1");
		fetchMenuError.innerHTML = message;

		components.orderMenuCategoryBreakfast.innerHTML = "<h2 class=\"f_h2\">Breakfast Meals</h2>";
		components.orderMenuCategoryMain.innerHTML = "<h2 class=\"f_h2\">Main Meals</h2>";
		components.orderMenuCategorySnack.innerHTML = "<h2 class=\"f_h2\">Snacks</h2>";
		components.orderMenuCategoryDrinks.innerHTML = "<h2 class=\"f_h2\">Drinks</h2>";

		components.orderMenuCategoryBreakfast.appendChild(fetchMenuError);
		components.orderMenuCategoryMain.appendChild(fetchMenuError);
		components.orderMenuCategorySnack.appendChild(fetchMenuError);
		components.orderMenuCategoryDrinks.appendChild(fetchMenuError);

		this.components = components;
	}

	updateOrderMenu(menu){
		let components = this.components,
			main = this;
        
		if(menu.length == 0){
			this.setMenuError("No items in the order menu. Please try order again later!");
			return;
		}

		menu.forEach(orderItem => {
			let item = new OrderItem({
				item:orderItem,
				parent:main,
				onUpdate:()=>{
					main.updateOrder();
				}
			});
            
			switch(orderItem.c_id){
			case 1:{
				components.orderMenuCategoryBreakfast.appendChild(item.getOrderItem());
				break;
			}
			case 2:{
				components.orderMenuCategoryMain.appendChild(item.getOrderItem());
				break;
			}
			case 3:{
				components.orderMenuCategorySnack.appendChild(item.getOrderItem());
				break;
			}
			case 4:{
				components.orderMenuCategoryDrinks.appendChild(item.getOrderItem());
				break;
			}
			}
		});
        
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

			if(response.status == 200){
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
        
		if(orderedItems.length == 0){
			alert("You have selected no items!");
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
            
			if (response.status == 201) {
				return response.json();
			}
			else if(response.status == 401){

				refreshToken({
					onSuccess: () => {
						OrderItem.makeOrder();
					},
					onFailure: () => {
						window.location.href = webUrl + "/customer/login";
					}
				});
			}
			else if(response == 403){
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

document.addEventListener("DOMContentLoaded", () => {
	orderForm.init();
	orderForm.fetchMenu();
});

export default OrderForm;