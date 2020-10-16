// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const prodConfigBase = require('../webpack.config.prod');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge.merge(
    prodConfigBase,
    commonConfig,
    {
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSERVER_URL || '/geostreams')
            })
        ]
    }
);
