import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common';
import paths from './paths';
import getClientEnvironment from './environment';

let env = getClientEnvironment();

export default webpackMerge(commonConfig, {
  devtool: 'source-map',
  entry: [
    paths.rootModule
  ],
  output: {
    path: paths.dist,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: paths.root
  },
  plugins: [
    new webpack.DefinePlugin(env),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});
