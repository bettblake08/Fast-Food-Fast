const path = require("path"),
    webpack = require("webpack"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    ManifestRevisionPlugin = require("manifest-revision-webpack-plugin"),
    WebpackMd5Hash = require('webpack-md5-hash');

var root = "./resources";
var jsRoot = root + "/js/";

var entries = {
    main_header_js: [
        jsRoot + "pages/main/header.jsx"
    ]
}

const config = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'static'),
        publicPath: "http://127.0.0.1:5000/assets/",
        filename: "[name].[chunkhash].js",
        chunkFilename: "[id].[chunkhash].chunk"
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: [/node_modules/],
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: ['url-loader?limit=100000', 'file-loader']
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new ManifestRevisionPlugin("./manifest.json", {
            rootAssetPath: root
        }),
        new WebpackMd5Hash()
    ]
};

module.exports = config;