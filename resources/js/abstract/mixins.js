import {apiV1} from "./variables";

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

export {
    refreshToken,
    getAccessToken
};