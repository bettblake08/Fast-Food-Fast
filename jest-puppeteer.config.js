
module.exports = {
	launch: {
		dumpio: false,
		headless: true,
		args:[
			"--no-sandbox"
		],
		defaultViewPort:{
			width:1920,
			height:1080
		}
	},
	browserContext: "default",
};


/*
module.exports = {
	launch: {
		dumpio: false,
		headless: false,
		slowMo:100,
		defaultViewPort: {
			width: 1920,
			height: 1080,
			isLandscape:true
		}
	},
	browserContext: "default",
};
*/