import webpackConfig from './webpack.test';

const shim = './karma.shim.ts';

export = (config: any): void => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [{
      pattern: shim,
      watched: false
    }],
    preprocessors: {
      [shim]: ['webpack', 'sourcemap']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      devtool: 'inline-source-map'
    },
    // quiet down the console
    // https://github.com/webpack/webpack/issues/1191#issuecomment-228602750
    webpackMiddleware: {
      stats: {
        chunks: false
      }
    },
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage'
    },
    reporters: ['mocha', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  });
};
