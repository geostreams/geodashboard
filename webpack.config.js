var webpack = require("webpack");

module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
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
      VERSION: JSON.stringify("0-dev")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
  	contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  },
  externals: {
    //clowderUrl: "https://seagrant-dev.ncsa.illinois.edu/clowder/"
    Config: JSON.stringify({
      clowderUrl: "http://localhost:9002/",
      commKey: "r1ek3rs"
    })
  }
}

