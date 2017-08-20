const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});
const commonConfig = require('./webpack.common.js');

const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;
const EXTERNAL_HOST = process.env.EXTERNAL_HOST || HOST;
const EXTERNAL_PORT = process.env.EXTERNAL_PORT || PORT;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  external_host: EXTERNAL_HOST,
  external_port: EXTERNAL_PORT,
  ENV: ENV,
  HMR: HMR
});

module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {
    devtool: 'cheap-module-source-map',

    output: {
      path: helpers.root('dist'),
      filename: '[name].umd.js',
      library: '[name]',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'tslint-loader',
              options: {
                configFile: 'tslint.json'
              }
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/, /\@ipreo/]
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          exclude: [helpers.root('src', 'app')]
        }, {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: [helpers.root('src', 'app')]
        }
      ]
    },

    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR
        }
      }),
      new NamedModulesPlugin()
    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      public: METADATA.external_host + ':' + METADATA.external_port,
      disableHostCheck: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
}
