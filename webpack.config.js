var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

module.exports = {
  devtool: 'eval-source-map',
  entry: "./app/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("0.1-dev")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({title: 'Geodashboard', hash: true, template: 'public/index.html'})
  ],
  devServer: {
  	contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
}
