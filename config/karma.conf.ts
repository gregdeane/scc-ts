import webpackConfig from './webpack.test';

export = (config: any): void => {
  const shim = './karma.shim.ts';
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
