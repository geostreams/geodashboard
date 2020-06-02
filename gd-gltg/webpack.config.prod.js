// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfigBase = require('../webpack.config.common');
const prodConfigBase = require('../webpack.config.prod');
const commonConfigGLTG = require('./webpack.config.common');

module.exports = webpackMerge(
    commonConfigBase,
    prodConfigBase,
    commonConfigGLTG,
    {
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                'process.env.GEOSERVER_URL': JSON.stringify(process.env.GEOSERVER_URL || '/geoserver'),
                'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || '/geostreams')
            })
        ]
    }
);
