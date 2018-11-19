const helpers = require('./helpers');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

process.traceDeprecation = true;

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', 'json'],
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
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: helpers.root('tsconfig.json')
            }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src/app'),
        use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap']

      },
      {
        test: /\.css$/,
        include: helpers.root('src/app'),
        use: 'css-to-string-loader!css-loader'
      }
    ]
  },
  plugins: [
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /(.+)?angular(\\|\/)core(.+)?/,
      helpers.root('src') // location of your src
    ),
    new HtmlWebpackPlugin({ //Inject scripts and links into index.html
      template: helpers.root('src/index.html')
    })
  ],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false

  }
};
