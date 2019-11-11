const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		index: ["babel-polyfill", "./src/index.js"],
	},
	output: {
		path: __dirname + "/dist",
		filename: "index_bundle.js",
		publicPath: "/dist/",
	},
	resolve: {
		extensions: ["*", ".js", ".jsx"],
		alias: {
			constants: path.resolve(__dirname, "src/constants"),
			containers: path.resolve(__dirname, "src/containers"),
			reducers: path.resolve(__dirname, "src/reducers"),
			src: path.resolve(__dirname, "src"),
			config: path.resolve(__dirname, "config")
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(css|scss)$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				loaders: ["file-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			title: "snake",
			filename: "index.html",
			appMountId: 'root',
			template: "index.html"
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		compress: true,
		port: process.env.PORT
	},
};
