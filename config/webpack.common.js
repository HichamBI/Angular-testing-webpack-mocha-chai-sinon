var webpack = require('webpack');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
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
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src/app'),
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader?sourceMap',
                    loader: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.css$/,
                include: helpers.root('src/app'),
                loader: 'css-to-string-loader!css-loader'
            }
        ]
    },
    plugins: [
        // Fixes Angular 2 error
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new webpack.optimize.CommonsChunkPlugin({ //Keep the vendor code out of the app
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({ //Inject scripts and links into index.html
            template: helpers.root('src/index.html')
        })
    ],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    }
};