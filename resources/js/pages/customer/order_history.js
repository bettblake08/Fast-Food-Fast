import {apiV1,webUrl} from "../../abstract/variables";
import {refreshToken,getAccessToken} from "../../abstract/mixins";
import Order from "../../components/order";

class OrderHistory{
	get components (){
		return this._components;
	}

	set components(value){
		this._components = value;
	}

	init(){
		let orderHistoryContent = document.querySelector("orderHistory__content");
		this.components = {
			orderHistoryContent
		};
	}
    
	populateOrderHistory(orders){
		let orderHistory = this,
			orderHistoryContent = this.components.orderHistoryContent;

		orders.reverse().forEach(order => {
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

document.addEventListener("DOMContentLoaded", () => {
	orderHistory.init();
	orderHistory.fetchOrderHistory();
});

export default OrderHistory;