// @flow
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        mcw__old: 'material-components-web/dist/material-components-web.min.css',
        mdc__old: 'gd-gltg__old/app/styles_custom/react-mdc-web.css',
        gltgMain__new: './src/index.jsx',
        gltgStyle: './src/styles/gltg.less'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
            google_analytics: process.env.GA_TOKEN
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/logo_app.png',
            prefix: 'icons/',
            emitStats: false,
            inject: true
        })
    ]
};
