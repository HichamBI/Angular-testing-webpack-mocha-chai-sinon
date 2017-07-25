var helpers = require('./helpers');
var webpack = require('webpack');

module.exports = {
    devtool: "inline-source-map", // To have breakpoints on both, test sources and app sources
                                  // NB : Using inline-cheap-module-source-map  activate breakpoints only on test code

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
                exclude: helpers.root('src/test'),
                loaders: ['istanbul-instrumenter-loader', 'awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.ts$/,
                include: helpers.root('src/test'),
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {configFileName: helpers.root('tsconfig.json')}
                    }, 'angular2-template-loader'
                ]
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
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'),
            {}
        ),
    ],

    performance: {
        hints: false
    }
};