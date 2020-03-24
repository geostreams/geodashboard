const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    mode: 'production',
    externals: {
        './config': 'config'
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('0.1-prod'),
            'process.env.NODE_ENV': '"production"'
        })
    ],
});
