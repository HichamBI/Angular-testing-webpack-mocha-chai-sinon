var nodeExternals = require('webpack-node-externals');
var helpers = require('./helpers');
var webpackMerge = require('webpack-merge');
var commonTestConfig = require('./webpack.test.common.js');

module.exports = webpackMerge(commonTestConfig, {
    target: 'node',

    output: {
        // use absolute paths in sourcemaps (important for debugging via IDE)
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },

    externals: [
        nodeExternals()
    ]
});