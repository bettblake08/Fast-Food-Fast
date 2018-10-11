import MainHeader from "../components/headers/main";

let mainHeader = new MainHeader({
	type:"white"
});

document.addEventListener("DOMContentLoaded", () => {
	mainHeader.init();
});