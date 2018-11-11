import Component from "../abstract/component_model";

class OrderedItem extends Component {
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
		super(params);

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
		orderedItemPrice.classList.add("f_comment_1");
		orderedItemPrice.innerHTML = `KSH ${(params.item.price/100)}`;

		main.classList.add("order__item");
		main.appendChild(orderedItemName);
		main.appendChild(orderedItemQuantity);
		main.appendChild(orderedItemPrice);

		this.components = {
			main,
			orderedItemName,
			orderedItemQuantity,
			orderedItemPrice
		};

		let parentState = params.parent.state;
		parentState.orderedItems.push(this);
		params.parent.state = parentState;
	}

	getOrderedItem() {
		return this.components.main;
	}

}

export default OrderedItem;