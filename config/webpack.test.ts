import * as webpack from 'webpack';
import loaders from './loaders/loaders.common';
import paths from './paths';
import getClientEnvironment from './environment';

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

let env = getClientEnvironment();

export default {
  entry: [paths.rootModule],
  output: {
    path: 'tmp',
    filename: 'test.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: loaders,
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [paths.nodeModules]
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          sourceMap: false,
          inlineSourceMap: true,
          compilerOptions: {
            removeComments: true
          }
        },
        exclude: [/\.e2e\.ts$/]
      },
      {
        enforce: 'post',
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        include: paths.src,
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /vendor/
        ]
      }
    ]
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
};
