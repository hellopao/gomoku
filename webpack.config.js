"use strict";

const webpack = require('webpack');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: {
        gomoku: "./src/gomoku.js"
    },
    output: {
        filename: "gomoku.js",
        path: "./dist/",
        library: "gomoku",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [new UglifyJsPlugin({ minimize: true })]
};
