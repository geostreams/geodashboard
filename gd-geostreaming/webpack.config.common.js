// @flow
const webpackMerge = require('webpack-merge');

const commonConfigBase = require('../webpack.config.common');

module.exports = webpackMerge.merge(
    commonConfigBase,
    {
        entry: {
            projectStyle: './src/styles/geostreaming.less'
        }
    }
);
