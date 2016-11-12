import loaders from './loaders/loaders.common';

export default {
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: loaders
  }
};
