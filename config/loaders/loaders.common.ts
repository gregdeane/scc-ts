import paths from '../paths';

export default [
  {
    test: /\.(ts)$/,
    include: [paths.src, paths.config],
    loader: 'ng-annotate!awesome-typescript-loader'
  }
];
