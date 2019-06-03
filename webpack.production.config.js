const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
  entry: ["./main.jsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  externals: {
    './config': "config"
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        // test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        include: [/node_modules/, /styles_custom/],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /styles_custom/],
        use: ['style-loader', 'css-loader?modules']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("0.1-prod"),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HtmlWebpackPlugin({
      title: 'Geodashboard',
      template: './public/index.html',
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new CopyWebpackPlugin([
      { from: './public/images', to: './images' },
      { from: './public/styles', to: './styles' },
      { from: './public/pages', to: './pages' },
    ]),
    new CopyWebpackPlugin([{
        from: 'config.js',
        transform: function(content, absoluteFrom) {
            return content.toString().replace("export const gd3 = ", "window.config = {\n    gd3:") + "}"
        }
    }])
  ],
};
