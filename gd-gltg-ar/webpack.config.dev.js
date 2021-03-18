// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfigBase = require('../webpack.config.common');
const devConfigBase = require('../webpack.config.dev');
const commonConfigGLTG = require('./webpack.config.common');

module.exports = webpackMerge.merge(
    commonConfigBase,
    devConfigBase,
    commonConfigGLTG,
    {
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"',
                'process.env.GEOSERVER_URL': JSON.stringify(process.env.GEOSERVER_URL || 'https://gltg-dev.ncsa.illinois.edu/geoserver'),
                'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || 'https://gltg-dev.ncsa.illinois.edu/geostreams'),
                'process.env.BMP_API_URL': JSON.stringify(process.env.BMP_API_URL || 'https://gltg-dev.ncsa.illinois.edu/bmp')
            })
        ]
    }
);
