import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common';
import settings from './settings';
import paths from './paths';
import getClientEnvironment from './environment';

let env = getClientEnvironment();

export default webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${settings.port}/`,
    paths.rootModule
  ],
  output: {
    path: paths.dist,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: paths.root
  },
  plugins: [
    new webpack.DefinePlugin(env)
  ]
});
