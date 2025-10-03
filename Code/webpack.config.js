// const path = require("path");
import path from 'path';
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
// module.exports

export default {
    entry: "./frontend/src/index.js",
    // target: 'node',
    output: {
        path: path.resolve('./frontend', 'public'),
        // publicPath: '/',
        filename: "bundle.js",
        // module: true,
    },
    mode: "development",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            },
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset/resource',
        }
    ]
    },
    resolve: {
            fallback: {
              "vm": false,
              "crypto": false
            }
    },
    // experiments: {
    //     outputModule: true, 
    // },
    plugins: [
        new NodePolyfillPlugin()
    ]
}
