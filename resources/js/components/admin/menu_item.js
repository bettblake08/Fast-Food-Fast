import Component from "../../abstract/component_model";
import breakfastImg from "../../../images/breakfast.png";
import mainmealImg from "../../../images/main.png";
import snacksImg from "../../../images/snacks.png";
import drinksImg from "../../../images/drinks.png";

class MenuItem extends Component {
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

		super(params);

		this._state = {
			total: 0,
			quantity: 0,
			item: params.item
		};

		let main = document.createElement("div"),
			itemImage = document.createElement("div"),
			itemImageImg = new Image(),
			itemName = document.createElement("div"),
			itemPrice = document.createElement("div");

		switch (params.item.c_id) {
		case 1:
		{
			itemImageImg.src = breakfastImg;
			break;
		}
		case 2:
		{
			itemImageImg.src = mainmealImg;
			break;
		}
		case 3:
		{
			itemImageImg.src = snacksImg;
			break;
		}
		case 4:
		{
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
		itemPrice.innerHTML = "KSH " + (params.item.price / 100);

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

	getOrderItem() {
		return this.component.main;
	}

}

export default MenuItem;