var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
  entry: "./main.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  externals: {
    './config': "config"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'

      },
      {
        test: /\.css$/,
        loader: 'style!css?modules!postcss'
      },
      { test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("0.1-prod"),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({title: 'Geodashboard', hash: true, template: 'public/index.html'})
  ],
};