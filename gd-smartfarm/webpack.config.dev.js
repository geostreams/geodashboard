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
                'process.env.GEOSERVER_URL': JSON.stringify(process.env.GEOSERVER_URL || 'https://smartfarm.ncsa.illinois.edu/geoserver'),
                'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || 'http://localhost:9000')
            })
        ]
    }
);
