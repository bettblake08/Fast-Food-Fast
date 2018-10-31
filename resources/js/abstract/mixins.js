import {apiV1, webUrl} from "./variables";

function refreshToken(actions){
	let tokens = JSON.parse(localStorage.getItem("tokens"));

	fetch(`${apiV1}/token/refresh`,{
		method:"GET",
		headers:{
			"Authorization":`Bearer ${tokens.refresh_token}`
		}  
	}).then((response)=>{
		if(response.status == 201){
			return response.json();
		}
        
		actions.onFailure();
	}).then((response)=>{
		if(response != undefined){
			tokens.access_token = response.access_token;
			localStorage.setItem("tokens", JSON.stringify(tokens));
			actions.onSuccess();
		}
	});
}

function getAccessToken(){
	let tokens = JSON.parse(localStorage.getItem("tokens"));
	return tokens == null ? "" : tokens.access_token;
}

function login(args){
	fetch(`${apiV1}/auth/login`, {
		body: JSON.stringify({
			password: args.password,
			username: args.username
		}),
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST"
	}).then((response) => {

		switch (response.status) {
		case 200:
		{
			return response.json();
		}
		case 400:
		case 401:
		case 404:
		{
			response.json().then((result) => {
				args.component.displayErrorMessage(result.message);
			});
			break;
		}
		}
	}).then((response) => {
		console.log("Login Successful!");

		localStorage.setItem("tokens", JSON.stringify({
			access_token: response.access_token,
			refresh_token: response.refresh_token
		}));

		window.location.href = webUrl + args.successUrl;
	});
}

function displayError(SELECTOR, ERROR ,ERRORDELAY = 3000) {
	console.log("Displaying error: " + ERROR);

	let errorComment = document.querySelector(SELECTOR);

	errorComment.classList.replace("errorComment--disabled", "errorComment--active");
	errorComment.innerHTML = ERROR;

	setTimeout(() => {
		errorComment.classList.replace(
			"errorComment--active",
			"errorComment--disabled"
		);
		errorComment.innerHTML = "";

	}, ERRORDELAY);
}

export {
	refreshToken,
	getAccessToken,
	login,
	displayError
};