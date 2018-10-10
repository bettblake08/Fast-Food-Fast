import {
	apiV1,
	webUrl
} from "../../abstract/variables";
import {
	refreshToken,
	getAccessToken
} from "../../abstract/mixins";

import Order from "../../components/order";

class OrderManagement {
	constructor() {
		this._state = {
			orders: []
		};

		this._components = {};
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

	init() {
		let orderManagementContent = document.querySelector(".ordersView__content");
		this.components["orderManagementContent"] = orderManagementContent;
	}

	populateOrderManagement(content) {
		let orderManagement = this,
			orderManagementContent = this.components.orderManagementContent;

		content.orders.reverse().forEach(order => {

			order.items.forEach(item => {
				let menuItem = content.menu.find(menuItem => {
					return menuItem.id == item.item;
				});

				if (menuItem != undefined) {
					item.name = menuItem.name;
					item.price = menuItem.price;
					item.c_id = menuItem.c_id;
				}
			});

			let orderModel = new Order({
				parent: orderManagement,
                order,
                access:"admin",
                onStatusUpdateSuccess:() => {
                }
			});

			orderManagementContent.appendChild(orderModel.getOrderComponent());
		});
	}

	fetchOrders() {
		let orderManagement = this;

		fetch(`${apiV1}/orders`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${getAccessToken()}`
			}
		}).then((response) => {

			switch (response.status) {
			case 200:
			{
				return response.json();
			}
			case 401:
			{
				refreshToken({
					onSuccess: () => {
						orderManagement.fetchOrders();
					},
					onFailure: () => {
						window.location.href = webUrl + "/admin/login";
					}
				});
				break;
			}
			}
            
		}).then((response) => {

			if (response != undefined) {
				orderManagement.populateOrderManagement(response.content);
			}

		});

	}
}

let orderManagement = new OrderManagement();

document.addEventListener("DOMContentLoaded", () => {
	orderManagement.init();
	orderManagement.fetchOrders();
});

export default OrderManagement;