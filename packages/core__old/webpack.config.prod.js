// @flow
const webpackMerge = require('webpack-merge');

const prodConfigBase = require('./webpack.production.config');
const commonConfigCore = require('./webpack.config.common');

module.exports = webpackMerge.merge(commonConfigCore, prodConfigBase);
