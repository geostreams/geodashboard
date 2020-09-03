const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.config.common');

module.exports = merge.merge(commonConfig, {
    mode: 'production',
    externals: {
        './config': 'config'
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('0.1-prod'),
            'process.env.NODE_ENV': '"production"'
        }),
        new CopyWebpackPlugin([{
            from: 'config.js',
            transform: function (content, absoluteFrom) {
                return content.toString().replace('export const gd3 = ', 'window.config = {\n    gd3:') + '}'
            }
        }])
    ],
});
