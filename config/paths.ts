import { root } from './helpers';

export default {
  root: '/',
  dist: root('dist'),
  src: root('src'),
  config: root('config'),
  rootModule: root('src', 'root.module.ts'),
  nodeModules: root('node_modules')
};
