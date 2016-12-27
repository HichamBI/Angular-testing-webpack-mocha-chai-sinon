var nodeExternals = require('webpack-node-externals');
var helpers = require('./helpers');

module.exports = {
    devtool: 'cheap-module-source-map',

    target: 'node',

    resolve: {
        extensions: ['.ts', '.js']
    },

    externals: [
        nodeExternals()
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
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
    }
};
