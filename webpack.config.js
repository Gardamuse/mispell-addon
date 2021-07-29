const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebExtPlugin = require('web-ext-plugin');

module.exports = {
    mode: 'production',
    entry: {
        background_script: './src/background_script.js',
        content_script: './src/content_script.js'
    },
    module: {
        rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        //new HtmlWebpackPlugin({ template: 'src/popup/index.html' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json' },
                { from: './src/icons/icon.png' },
            ],
        }),
        new WebExtPlugin({
            sourceDir: path.resolve(__dirname, 'dist'),
            firefoxProfile: 'gard',
            startUrl: 'https://www.blushingdefeat.com',
        }),
    ],
    output: { filename: '[name].js', path: path.resolve(__dirname, 'dist') }
};
