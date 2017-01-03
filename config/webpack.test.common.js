var helpers = require('./helpers');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        moduleExtensions: ['-loader'] // To bypass mocha-loader incompatibility with webpack :
                                      // mocha-loader still using loaders without the "-loader" suffix,
                                      // which is forbidden with webpack v2
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: helpers.root('test'),
                loaders: ['istanbul-instrumenter-loader', 'awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.ts$/,
                include: helpers.root('test'),
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'

            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: 'null-loader'
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(                            // Fixes Angular 2 webpack error :
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, // Critical dependency: the request of
            __dirname                                                    // a dependency is an expression
        )
    ],

    performance: {
        hints: false
    }
};