import {apiV1,webUrl} from "../../abstract/variables";
import {refreshToken,getAccessToken} from "../../abstract/mixins";
import Order from "../../components/order";
import CustomerHeader from "../../components/headers/customer";

class OrderHistory{
	constructor() {
		this._state = {
			orders:[]
        };
        
        this._components = {};
	}

	get state() {
		return this._state;
	}

	set state(value) {
		this._state = value;
	}

	get components (){
		return this._components;
	}

	set components(value){
		this._components = value;
	}

	init(){
		let orderHistoryContent = document.querySelector(".orderHistory__content");
		this.components["orderHistoryContent"] = orderHistoryContent;
	}
    
	populateOrderHistory(content){
		let orderHistory = this,
			orderHistoryContent = this.components.orderHistoryContent;

		content.orders.reverse().forEach(order => {

			order.items.forEach( item => {
				let menuItem = content.menu.find(menuItem => {
					return menuItem.id == item.item;
				});
                
				if(menuItem != undefined){
					item.name = menuItem.name;
					item.price = menuItem.price;
					item.c_id = menuItem.c_id;
				}
			});

			let orderModel = new Order({
				parent: orderHistory,
				order
			});

			orderHistoryContent.appendChild(orderModel.getOrderComponent());
		});
	}

	fetchOrderHistory(){
		let orderHistory = this;

		fetch(`${apiV1}/users/orders`,{
			method:"GET",
			headers:{
				"Authorization":`Bearer ${getAccessToken()}`
			}
		}).then((response)=>{

			switch(response.status){
			case 200:{
				return response.json();
			}
			case 401:{
				refreshToken({
					onSuccess: () => {
						orderHistory.fetchOrderHistory();
					},
					onFailure: () => {
						window.location.href = webUrl + "/customer/login";
					}
				});
				break;
			}
			}


		}).then((response)=>{
            
			if(response != undefined){
				orderHistory.populateOrderHistory(response.content);
			}
            
		});
        
	}
}

let orderHistory = new OrderHistory();
let header = new CustomerHeader();

document.addEventListener("DOMContentLoaded", () => {
	header.init();
	orderHistory.init();
	orderHistory.fetchOrderHistory();
});

export default OrderHistory;