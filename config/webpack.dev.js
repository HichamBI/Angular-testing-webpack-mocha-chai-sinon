const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    'polyfills': helpers.root('src', 'polyfills.ts'),
    'vendor': helpers.root('src', 'vendor.ts'),
    'app': helpers.root('src', 'main.ts')
  },
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    open: 'chrome',
    port: 8080,
    historyApiFallback: true,
    stats: {colors: true}
  }
});
