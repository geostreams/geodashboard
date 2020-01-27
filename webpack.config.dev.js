// @flow
const Webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
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
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerPort: 5050 })
    ]
}
