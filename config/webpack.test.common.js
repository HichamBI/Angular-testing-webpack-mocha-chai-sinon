const helpers = require('./helpers');
const webpack = require('webpack');

module.exports = {

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        moduleExtensions: ['-loader'] // To bypass mocha-loader incompatibility with webpack :
                                      // mocha-loader still using loaders without the "-loader" suffix,
                                      // which is forbidden with webpack v2++
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('src/test/mocha-index.html')]
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
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [helpers.root('src/index.html')]
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(                            // Fixes Angular 2++ webpack error :
            /angular(\\|\/)core(\\|\/)@angular/,                        // Critical dependency: the request of
            __dirname                                                    // a dependency is an expression
        )
    ],

    performance: {
        hints: false
    }
};
