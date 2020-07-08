// @flow
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        gltgStyle: './src/styles/gltg.less'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
            google_analytics: process.env.GA_TOKEN
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/favicon.png',
            prefix: 'icons/',
            emitStats: false,
            inject: true
        })
    ]
};
