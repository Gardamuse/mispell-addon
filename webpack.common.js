const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebExtPlugin = require('web-ext-plugin');

module.exports = {
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    entry: {
        background_script: './src/background_script.js',
        content_script: './src/content_script.ts',
        options_script: './src/options/script.js',
        browser_action_script: './src/browserAction/script.js'
    },
    module: {
        rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({ template: 'src/options/index.html', filename: "options.html"}),
        new HtmlWebpackPlugin({ template: 'src/browserAction/index.html', filename: "browserAction.html"}),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json' },
                { from: './src/icons/icon.png' },
            ],
        })
    ],
    output: { filename: '[name].js', path: path.resolve(__dirname, 'dist') }
};
