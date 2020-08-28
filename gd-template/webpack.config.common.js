// @flow
const webpackMerge = require('webpack-merge')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const commonConfigBase = require('../webpack.config.common')

module.exports = webpackMerge.merge(
    commonConfigBase,
    {
        entry: {
            projectStyle: './src/styles/template.less',
            main: './src/index.jsx'
        },
        plugins: [
            new FaviconsWebpackPlugin({
                logo: './src/images/favicon.png',
                prefix: 'icons/',
                emitStats: false,
                inject: true
            })
        ]
    }
)
