class Component {
	constructor(props = {}){
		this._state = {};
		this._components = {};
		this._props = props;
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
}

export default Component;