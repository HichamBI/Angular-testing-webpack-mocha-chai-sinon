const webpack = require('webpack');
const helpers = require('./helpers');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              parser: {
                system: true // no warning : https://github.com/webpack/webpack/pull/6321
              }
            },
            {
                test: /\.ts$/,
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
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src/app'),
                use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap']
            },
            {
                test: /\.css$/,
                include: helpers.root('src/app'),
                loader: 'css-to-string-loader!css-loader'
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
        new HtmlWebpackPlugin({ //Inject scripts and links into index.html
            template: helpers.root('src/index.html')
        })
    ]
};