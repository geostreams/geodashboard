// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const prodConfigBase = require('../webpack.config.dev');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge.merge(
    prodConfigBase,
    commonConfig,
    {
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"',
                'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || 'https://gltg-dev.ncsa.illinois.edu/geostreams')
            })
        ]
    }
);