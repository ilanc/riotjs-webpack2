const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
	devtool: 'inline-source-map',
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    //publicPath: '/public/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        use: [
          //{ 
          //  loader: 'html-loader', 
          //  options: { name: 'test/[name].[ext]' } 
          //},
          {
            loader: 'riot-tag-loader',
            options: {
              type: 'es6', // transpile the riot tags using babel
              hot: true,
              debug: true
            }
          }
        ]
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
