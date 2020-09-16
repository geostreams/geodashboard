// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfigBase = require('../webpack.config.common');
const devConfigBase = require('../webpack.config.dev');
const commonConfigGLM = require('./webpack.config.common');

module.exports = webpackMerge.merge(
    commonConfigBase,
    devConfigBase,
    commonConfigGLM,
    {
        plugins: [
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"',
                'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || 'https://seagrant-dev.ncsa.illinois.edu/geostreams')
            })
        ]
    }
);
