const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebExtPlugin = require("web-ext-plugin");
const path = require("path");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new WebExtPlugin({
            sourceDir: path.resolve(__dirname, 'dist'),
            firefoxProfile: 'gard',
            startUrl: 'https://www.blushingdefeat.com',
        }),
    ]
});