// @flow
const Webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production',

    devtool: 'source-map',

    optimization: {
        minimize: true
    },

    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new OptimizeCssAssetsPlugin()
    ]
};
