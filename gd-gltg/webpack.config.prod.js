// @flow
const webpackMerge = require('webpack-merge')

const prodConfigBase = require('../webpack.config.prod')
const commonConfigCore = require('./webpack.config.common')

module.exports = webpackMerge(commonConfigCore, prodConfigBase)
