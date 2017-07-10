const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')



const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: "./app/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/public/js"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss"]
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader", // compiles Sass to CSS
                options: {
                    includePaths: glob.sync('node_modules').map((d) => path.join(__dirname, d))
                }
            }
            ]
        }, {
            test: /\.tsx?$/,
            use: [{
                loader: 'awesome-typescript-loader'
            }]
        }]
    },

    plugins: [
        extractSass, new CheckerPlugin()
    ]

};
