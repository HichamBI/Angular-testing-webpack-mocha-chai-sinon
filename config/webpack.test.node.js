const nodeExternals = require('webpack-node-externals');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonTestConfig = require('./webpack.test.common.js');
const isCoverage = process.env.NODE_ENV === 'coverage';

const coverageRules = [].concat(
  {
    enforce: 'post',
    test: /\.(js|ts)$/,
    include: helpers.root('src'),
    exclude: [
      /\.(e2e|spec)\.ts$/,
      /node_modules/
    ],
    loaders: ['istanbul-instrumenter-loader']
  },
  {
    test: /\.ts$/,
    include: helpers.root('src'),
    exclude: [/\.e2e\.ts$/],
    loaders: [{
      loader: 'awesome-typescript-loader',
      query: {
        // use inline sourcemaps for "coverage" reporter
        sourceMap: false,
        inlineSourceMap: true,
        compilerOptions: {
          // Remove TypeScript helpers to be injected
          // below by DefinePlugin
          removeComments: true
        }
      }
    }, 'angular2-template-loader']
  });

const nonCoverageRules = [{
  test: /\.ts$/,
  include: helpers.root('src'),
  exclude: [/\.e2e\.ts$/],
  loaders: [{
    loader: 'awesome-typescript-loader',
    query: {
      sourceMap: true
    }
  }, 'angular2-template-loader']
}];

module.exports = webpackMerge(commonTestConfig, {
  target: 'node',

  devtool: isCoverage ? 'eval' : 'inline-source-map',

  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },

  module: {
    rules: isCoverage ? coverageRules : nonCoverageRules
  },

  externals: [
    nodeExternals()
  ]
});
