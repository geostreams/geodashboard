const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: {
        home: "./home.jsx",
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('0.1-prod'),
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: false
        })
    ],
    devServer: {
        contentBase: [path.join(__dirname, 'public')],
        historyApiFallback: true,
        inline: true,
        hot: true
    }
});
