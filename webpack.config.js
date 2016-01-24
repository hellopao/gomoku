"use strict";

const webpack = require('webpack');

module.exports = {
    entry: {
        index: "./test/index.js"
    },
    output: {
        filename: "[name].js",
        path: "./dist/"
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
    }
};
