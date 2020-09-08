// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const prodConfigBase = require('../webpack.config.prod');
const commonConfigGLTGBMP = require('./webpack.config.common');

module.exports = webpackMerge.merge(
    prodConfigBase,
    commonConfigGLTGBMP,
    {
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                'process.env.GEOSERVER_URL': JSON.stringify(process.env.GEOSERVER_URL || '/geoserver')
            })
        ]
    }
);
