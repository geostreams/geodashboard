// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const devConfigBase = require('../webpack.config.dev');
const commonConfigGLTGBMP = require('./webpack.config.common');

module.exports = webpackMerge.merge(
    devConfigBase,
    commonConfigGLTGBMP,
    {
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"',
                'process.env.GEOSERVER_URL': JSON.stringify(process.env.GEOSERVER_URL || 'https://gltg-dev.ncsa.illinois.edu/geoserver')
            })
        ]
    }
);

