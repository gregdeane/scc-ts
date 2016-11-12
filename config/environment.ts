// results will be injected into app via DefinePlugin in Webpack config
export default () => {
  return Object.keys(process.env)
    .reduce((env: any, key: string): any => {
      env['process.env.' + key] = JSON.stringify(process.env[key]);
      return env;
    }, {
      // if NODE_ENV is set, use it. otherwise, default to dev mode
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    });
};
