import Component from "../abstract/component_model";

class Views extends Component{
	constructor(params) {
		/* 
        This is the views model class constructor

		:args
			views	:	List of views to switch between

		:attributes
			state	:	The state values of the model class
			components	:	The elements stored by the model class	
        */
		super(params);

		this.state = {
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
        
		this.components = {
			main,
			views
		};

		if(params.views.length != 0){
			this.updateView(0);
		}
	}

	addView(view){		
		let viewComponent = document.createElement("div");

		viewComponent.classList.add("view--disabled");
		viewComponent.appendChild(view.getViewComponent());

		this.components.views.push(viewComponent);
		this.components.main.appendChild(viewComponent);
	}

	updateView(newView){		
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