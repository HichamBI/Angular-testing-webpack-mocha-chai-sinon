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
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('src'),
            {}
        ),
    ],

    performance: {
        hints: false
    }
};
