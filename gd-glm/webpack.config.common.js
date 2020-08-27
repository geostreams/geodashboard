// @flow
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: {
        glmStyle: './src/styles/glm.less',
        glmMain: './src/index.jsx'
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/images/logo.png', to: 'images/logo.png' }
            ]
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/logo_app.png',
            prefix: 'icons/',
            emitStats: false,
            inject: true
        })
    ]
};
