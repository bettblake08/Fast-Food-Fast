class Views {
	constructor(params) {
		/* 
        This is the views model class constructor

		:args
			views	:	List of views to switch between

		:attributes
			state	:	The state values of the model class
			components	:	The elements stored by the model class	
        */

		this._state = {
			view:0
		};

		let main = document.createElement("div"),
			views = [];

		main.classList.add("views");

		params.views.forEach(view => {
			let viewComponent = document.createElement("div");
			viewComponent.classList.add("view--disabled");

			viewComponent.appendChild(view.getViewComponent());
			views.push(viewComponent);

			main.appendChild(viewComponent);
		});
        
		this._components = {
			main,
			views
		};

		if(params.views.length != 0){
			this.updateView(0);
		}
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
	
	addView(view){		
		let viewComponent = document.createElement("div");

		viewComponent.classList.add("view--disabled");
		viewComponent.appendChild(view.getViewComponent());

		this.components.views.push(viewComponent);
		this.components.main.appendChild(viewComponent);
	}


	updateView(newView){
		console.log("View updated :" + newView);
		
		let oldViewComponent = this.components.views[this.state.view],
			newViewComponent = this.components.views[newView];
        
		oldViewComponent.classList.replace("view--active","view--disabled");
		newViewComponent.classList.replace("view--disabled", "view--active");

		this.state.view = newView;
	}

	getViewsComponent(){
		return this.components.main;
	}
}

export default Views;