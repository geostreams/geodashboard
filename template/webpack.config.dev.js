// @flow
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = webpackMerge.merge(
    commonConfig,
    {
        mode: 'development',
        devtool: 'cheap-module-source-map',

        devServer: {
            hot: true,
            host: '0.0.0.0',
            port: 8080,
            inline: true,
            stats: ['minimal', 'color'],
            historyApiFallback: true,
            allowedHosts: JSON.parse(process.env.ALLOWED_HOSTS || '["localhost"]'),
            headers: { 'Access-Control-Allow-Origin': '*' }
        },

        plugins: [
                new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerPort: 5050 }),
                new Webpack.DefinePlugin({
                    'process.env.NODE_ENV': '"development"',
                    'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || 'http://localhost:9000')
                })
        ]
    }
);
