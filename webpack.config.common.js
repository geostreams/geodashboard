// @flow
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const corePath = path.resolve().split('/').pop() === 'gd-core' ?
    './' :
    './node_modules/gd-core/';

module.exports = {
    target: 'web',

    entry: {
        olStyle: 'ol/ol.css',
        olLayerSwitcherStyle: 'ol-layerswitcher/src/ol-layerswitcher.css',
        coreStyle: path.resolve(corePath, 'src/styles/core.less'),
        polyfill:  path.resolve(corePath, 'src/polyfill.js'),
        main: './src/index.jsx'
    },

    output: {
        path: path.resolve('./build'),
        publicPath: '/',
        filename: 'js/[name]-[hash].js',
        crossOriginLoading: 'anonymous'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env', '@babel/flow', '@babel/react'],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-export-default-from',
                                '@babel/plugin-proposal-export-namespace-from'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|gd-core__old|gd-gltg__old)/,    // TODO remove __old after porting all the __old codes
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,    // TODO add css after porting all the __old codes
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            paths: [
                                path.resolve('./src'),
                                path.resolve('./node_modules')
                            ],
                            sourceMap: true
                        }
                    }
                ]
            },
            // TODO remove the following two rules after porting all the __old codes
            {
                test: /\.css$/,
                include: [/node_modules/, /styles_custom/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /styles_custom/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader?modules'
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.geojson$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(jpg|jpeg|png|eot|ttf|woff|woff2|pbf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.html$/,
                exclude: /.*\/index.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'pages/[name]-[hash].html'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        modules: ['node_modules', './src'],
        extensions: ['.js', '.jsx']
    },

    // TODO enable the following after porting all the __old codes
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         cacheGroups: {
    //             commons: {
    //                 name: 'commons',
    //                 chunks: 'initial',
    //                 minChunks: 2
    //             }
    //         }
    //     }
    // },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html')
        }),
        new MiniCssExtractPlugin({ filename: 'css/[name]-[hash].css' }),
        new CleanWebpackPlugin()
    ]
};
