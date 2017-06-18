const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    //publicPath: '/public/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        query: {
          type: 'es6', // transpile the riot tags using babel
          hot: true,
          debug: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'file-loader',
				options: { name: 'img/[name].[ext]' }
			}
    ]
  },
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			hash: true,
			template: './app/index.html',
			filename: 'index.html'
		})
	]
}
