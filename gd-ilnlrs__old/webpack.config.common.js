const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    target: 'web',
    context: __dirname,
    entry: {
        app: './main.jsx',
        home: "./home.jsx",
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                include: [/node_modules/, /styles_custom/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /styles_custom/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader?modules'
                ]
            },
            {
                test: /\.geojson$/,
                use: 'file-loader'
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
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        },
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new HtmlWebpackPlugin({
            title: 'Geodashboard',
            template: './public/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: ['app'],
            filename: './index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Home',
            template: './public/home.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: ['home'],
            filename: './home.html'
        })
    ]
};
