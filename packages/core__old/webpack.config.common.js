const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// @flow
const webpackMerge = require('webpack-merge');

const commonConfigBase = require('../../webpack.config.common');

module.exports = webpackMerge.merge(
    commonConfigBase,
    {
        entry: {
            app: './main.jsx',
            settings: "./main.jsx"

        },
        externals: {
            'react-mdc-web': {
                root: 'ReactMdcWeb',
                commonjs2: 'react-mdc-web',
                commonjs: 'react-mdc-web',
                amd: 'ReactMdcWeb',
                umd: 'ReactMdcWeb',
            }
        }
    }
);

