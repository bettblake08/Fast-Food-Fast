import {DropdownButtons} from "../ui/dropdown_buttons";

class OrderedItem {
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
						
                components   :   Contains text input elements
            */

		let main = document.createElement("div"),
			orderedItemName = document.createElement("div"),
			orderedItemQuantity = document.createElement("div"),
			orderedItemPrice = document.createElement("div");

		orderedItemName.classList.add("order__item__name");
		orderedItemName.classList.add("f_normal");
		orderedItemName.innerHTML = params.item.name;

		orderedItemQuantity.classList.add("order__item__quantity");
		orderedItemQuantity.classList.add("f_normal");
		orderedItemQuantity.innerHTML = params.item.quantity;

		orderedItemPrice.classList.add("order__item__price");
		orderedItemPrice.classList.add("f_normal");
		orderedItemPrice.innerHTML = `KSH ${(params.item.price/100)}`;

		main.classList.add("order__item");
		main.appendChild(orderedItemName);
		main.appendChild(orderedItemQuantity);
		main.appendChild(orderedItemPrice);

		this._components = {
			main,
			orderedItemName,
			orderedItemQuantity,
			orderedItemPrice
		};

		let parentState = params.parent.state;
		parentState.orderedItems.push(this);
		params.parent.state = parentState;
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

	getOrderedItem() {
		return this.components.main;
	}

}

class Order {
	constructor(params) {
		/* 
        This is an order model class constructor

        :args
            parent  :   Parent object instance
            order    :  Order object containing
                        id  :   order id 
                        items   :   list of order items
                        total   :   order total price
                        status  :   order status
						created_at  :   order time
			access	:	type of priviledge on the model
            
        :attribute
            state   :   Contains the state of order item containing:

            components   :   Contains text input elements
        */

		this._state = {
			order:params.order,
			orderedItems:[],
			dropdownButtons:[],
			access:params.access == undefined ? "customer":"admin"
		};

		let	main = document.createElement("div"),
			orderId = document.createElement("div"),
			orderItems = document.createElement("div"),
			orderItemsTitle = document.createElement("div"),
			orderItemsList = document.createElement("div"),
			orderTotal = document.createElement("div"),
			orderTime = document.createElement("div"),
			orderStatus = document.createElement("div"),
			orderStatusButtons = document.createElement("div");

		orderId.classList.add("order__id");
		orderId.classList.add("f_normal");
		orderId.innerHTML = params.order.id;

		orderItemsTitle.classList.add("order__items__title");
		orderItemsTitle.classList.add("f_normal");

		orderItemsList.classList.add("order__items__list");
        
		orderItems.classList.add("order__items");
		orderItems.appendChild(orderItemsTitle);

		orderTotal.classList.add("order__total");
		orderTotal.classList.add("f_normal");
		orderTotal.innerHTML = `KSH ${(params.order.total/100)}`;

		orderTime.classList.add("order__time");
		orderTime.classList.add("f_normal");
		orderTime.innerHTML = params.order.created_at;

		let status = this.getOrderStatus(params.order.status);
		
		orderStatus.classList.add(status.class);
		orderStatus.classList.add("f_normal");
		orderStatus.innerHTML = status.text;

		main.classList.add("order");
		main.appendChild(orderId);
		main.appendChild(orderItems);
		main.appendChild(orderTotal);
		main.appendChild(orderTime);
		main.appendChild(orderStatus);
		main.appendChild(orderItemsList);
		main.appendChild(orderStatusButtons);

		this._components = {
			main,
			orderId,
			orderItems,
			orderItemsTitle,
			orderItemsList,
			orderTotal,
			orderTime,
			orderStatus
		};

		let parentState = params.parent.state;
		parentState.orders.push(this);
		params.parent.state = parentState;
		
		this._props = params;

		this.populateOrderedItemsList();
		this.setOrderStatusButtons();
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

	get props() {
		return this._props;
	}

	set props(value) {
		this._props = value;
	}
    
	populateOrderedItemsList(){
		let orderedItems = this.state.order.items;
		let orderItemsList = this.components.orderItemsList;
		let orderModel = this;

		orderedItems.forEach(item => {
			let orderedItem = new OrderedItem({
				item: item,
				parent: orderModel
			});

			orderItemsList.appendChild(orderedItem.getOrderedItem());
		});
	}

	setOrderStatusButtons(){
		if (this.state.access == "admin") {
			this.components.orderStatusButtons.innerHTML = "";
			let dropdownButtons = [];

			switch(this.state.order.status){
			case 0:{
				dropdownButtons = [{
					name: "Process",
					action: () => {

					}
				},
				{
					name: "Cancel",
					action: () => {

					}
				}];
				break;
			}
			case 1:{
				dropdownButtons = [
					{
						name: "Complete",
						action: () => {

						}
					},
				];
				break;
			}
			case 2:
			case 3:{
				return;
			}
			}

			let buttons = new DropdownButtons({
				class: "ddButtons",
				textClass: "f_button_2",
				label: "Set as",
				parent: this,
				buttons: dropdownButtons
			});

			this.components.orderStatusButtons.appendChild(
				buttons.getDropDownButtonsComponent()
			);
			
		}
	}

	getOrderStatus(status){
        
		switch(status){
		case 0:{
			return {
				class: "order__status--pending",
				text:"Pending"
			};
		}
		case 1:{
			return {
				class: "order__status--processing",
				text: "Processing"
			};
		}
		case 2:{
			return {
				class: "order__status--cancelled",
				text: "Cancelled"
			};
		}
		case 3:{
			return {
				class: "order__status--complete",
				text: "Complete"
			};
		}
		}
	}

	getOrderComponent() {
		return this.components.main;
	}

}


export default Order;