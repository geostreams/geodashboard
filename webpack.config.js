const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './main.jsx',
        settings: "./main.jsx"

    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx?)$/,
                // test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                include: [/node_modules/, /styles_custom/],
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /styles_custom/],
                use: ['style-loader', 'css-loader?modules']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 500000
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify("0.1-prod"),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Geodashboard',
            template: './public/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            filename: './index.html'
        })
    ],
    devServer: {
        contentBase: [path.join(__dirname, 'public')],
        historyApiFallback: true,
        inline: true,
        hot: true
    }
}
