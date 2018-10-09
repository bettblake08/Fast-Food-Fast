const path = require("path"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	ManifestRevisionPlugin = require("manifest-revision-webpack-plugin"),
	WebpackMd5Hash = require("webpack-md5-hash");

var root = "./resources";
var jsRoot = root + "/js/";
var cssRoot = root + "/css/";

var entries = {
	main_css: [
		cssRoot + "pages/main.css"
	],
	admin_css: [
		cssRoot + "pages/admin.css"
	],
	customer_login_css: [
		cssRoot + "pages/customer/sign_in.css"
	],
	customer_login_js: [
		jsRoot + "pages/customer/sign_in.js"
	],
	customer_signup_css: [
		cssRoot + "pages/customer/sign_up.css"
	],
	customer_signup_js: [
		jsRoot + "pages/customer/sign_up.js"
	]
}

const config = {
	entry: entries,
	output: {
		path: path.resolve(__dirname, "static"),
		publicPath: "/assets/",
		filename: "[name].[chunkhash].js",
		chunkFilename: "[id].[chunkhash].chunk"
	},
	resolve: {
		extensions: [".js"]
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: [/node_modules/],
			use: "babel-loader"
		},
		{
			test: /\.css$/,
			use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]
		},
		{
			test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
			use: ["file-loader"]
		}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
		new ManifestRevisionPlugin("./manifest.json", {
			rootAssetPath: root
		}),
		new WebpackMd5Hash()
	]
};

module.exports = config;