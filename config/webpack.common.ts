import loaders from './loaders/loaders.common';

export default {
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: loaders
  }
};
