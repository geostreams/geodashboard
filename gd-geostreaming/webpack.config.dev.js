// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfigBase = require('../webpack.config.common');
const devConfigBase = require('../webpack.config.dev');
const commonConfigGeostreaming = require('./webpack.config.common');

module.exports = webpackMerge.merge(
    commonConfigBase,
    devConfigBase,
    commonConfigGeostreaming,
    {
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"',
                'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || 'https://gltg-dev.ncsa.illinois.edu/geostreams'),
                'process.env.GEOSERVER_URL': JSON.stringify(process.env.GEOSERVER_URL || 'https://gltg-dev.ncsa.illinois.edu/geoserver')
            })
        ]
    }
);
