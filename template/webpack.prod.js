// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonConfig = require('./webpack.common');

module.exports = webpackMerge.merge(
    commonConfig,
    {
        mode: 'production',
        devtool: 'source-map',

        optimization: {
            minimize: true
        },
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSERVER_URL || '/geostreams')
            }),
            new OptimizeCssAssetsPlugin()
        ]
    }
);
