// @flow
const webpackMerge = require('webpack-merge');

const devConfigBase = require('../webpack.config.dev');
const commonConfigCore = require('./webpack.config.common');

module.exports = webpackMerge(commonConfigCore, devConfigBase);
