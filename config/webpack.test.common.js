const helpers = require('./helpers');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

process.traceDeprecation = true;

module.exports = {

  resolve: {
    extensions: ['.ts', '.js', 'json']
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
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/test/mocha-index.html')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'null-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: 'null-loader'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: 'raw-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: [helpers.root('src/index.html')]
      }
    ]
  },

  plugins: [
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /(.+)?angular(\\|\/)core(.+)?/,
      helpers.root('src') // location of your src
    ),
  ],

  performance: {
    hints: false
  }
};
