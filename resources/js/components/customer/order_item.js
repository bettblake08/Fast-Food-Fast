import breakfastImg from "../../../images/breakfast.png";
import mainmealImg from "../../../images/main.png";
import snacksImg from "../../../images/snacks.png";
import drinksImg from "../../../images/drinks.png";
import Component from "../../abstract/component_model";

class OrderItem extends Component{
	constructor(params) {
		/* 
        This is an order item model class constructor

        :args
            parent  :   Parent object instance
            item    :   Item object containing
                        name    :   Item name
						price   :   Item price
						c_id	:	Item category
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

		this.state = {
			total:0,
			quantity:0,
			item:params.item
		};

		let OrderForm = this,
			main = document.createElement("div"),
			itemImage = document.createElement("div"),
			itemImageImg = new Image(),
			itemName = document.createElement("div"),
			itemPrice = document.createElement("div"),
			itemQuantity = document.createElement("div"),
			itemQuantityAdd = document.createElement("div"),
			itemQuantitySub = document.createElement("div"),
			itemQuantityValue = document.createElement("div"),
			itemTotal = document.createElement("div");
		
		itemImageImg.src = this.getCategoryImage(params.item.c_id);
		itemImageImg.alt = params.item.name;

		itemImage.classList.add("foodItem__image");
		itemImage.appendChild(itemImageImg);

		itemName.classList.add("foodItem__name");
		itemName.classList.add("f_normal");
		itemName.innerHTML = params.item.name;

		itemPrice.classList.add("foodItem__price");
		itemPrice.classList.add("f_normal");
		itemPrice.innerHTML = "KSH " + (params.item.price/100);

		itemQuantity.classList.add("foodItem__quantity");

		itemQuantityAdd.classList.add("foodItem__quantity__add");
		itemQuantityAdd.innerHTML = "+";
		itemQuantitySub.classList.add("foodItem__quantity__sub");
		itemQuantitySub.innerHTML = "-";
		itemQuantityValue.classList.add("foodItem__quantity__value");
		itemQuantityValue.classList.add("f_normal");
		itemQuantityValue.innerHTML = "0";
        
		itemQuantityAdd.addEventListener("click",()=>{
			OrderForm.updateQuantity(1,true);
			params.onUpdate();
		});

		itemQuantitySub.addEventListener("click", () => {
			OrderForm.updateQuantity(1, false);
			params.onUpdate();
		});

		itemQuantity.appendChild(itemQuantityAdd);
		itemQuantity.appendChild(itemQuantityValue);
		itemQuantity.appendChild(itemQuantitySub);

		itemTotal.classList.add("foodItem__total");
		itemTotal.classList.add("f_normal");
		itemTotal.innerHTML = "KSH " + 0;

		main.classList.add("foodItem");
		main.appendChild(itemImage);
		main.appendChild(itemName);
		main.appendChild(itemPrice);
		main.appendChild(itemQuantity);
		main.appendChild(itemTotal);

		this.component = {
			main,
			itemImage,
			itemImageImg,
			itemName,
			itemPrice,
			itemQuantity,
			itemQuantityAdd,
			itemQuantitySub,
			itemQuantityValue,
			itemTotal
		};

		let parentState = params.parent.state;
		parentState.orderItems.push(this);
		params.parent.state = parentState;
	}
	
	getCategoryImage(category){
		switch (category) {
		case 1: return breakfastImg;
		case 2: return mainmealImg;
		case 3: return snacksImg;
		case 4: return drinksImg;
		}
	}

	updateQuantity(quantity = 1, option = true){
		let state = this.state;
		console.log("Updating order : " + state.item.name);

		if (option){
			state.quantity += quantity;
			state.total += state.item.price;
		}
		else {
			if(state.quantity == 0){    return;     }

			state.quantity -= quantity;
			state.total -= state.item.price;
		}
    
		this.state = state;        
		this.updateOrderDisplay();
	}
    
	updateOrderDisplay(){
		let component = this.component;

		component.itemQuantityValue.innerHTML = "" + this.state.quantity;
		component.itemTotal.innerHTML = "KSH " + (this.state.total/100);
	}
    
	getOrderItem(){
		return this.component.main;
	}

}

export default OrderItem;