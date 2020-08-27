// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfigBase = require('../webpack.config.common');
const prodConfigBase = require('../webpack.config.prod');
const commonConfigGLM = require('./webpack.config.common');

module.exports = webpackMerge(
    commonConfigBase,
    prodConfigBase,
    commonConfigGLM,
    {
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || '/geostreams')
            })
        ]
    }
);
