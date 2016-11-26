import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common';
import loaders from './loaders/loaders.test';
import paths from './paths';
import getClientEnvironment from './environment';

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
let env = getClientEnvironment();

// test-specific rules
commonConfig.module['rules'] = loaders;

export default webpackMerge(commonConfig, {
  entry: [paths.rootModule],
  output: {
    path: paths.dist,
    pathinfo: true,
    filename: 'static/js/test.js',
    publicPath: paths.root
  },
  plugins: [
    new webpack.DefinePlugin(env),
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: paths.src
        }
      }
    })
  ]
});
