// @flow
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: {
        projectStyle: './src/styles/geostreaming.less',
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
};
