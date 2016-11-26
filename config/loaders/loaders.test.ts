import paths from '../paths';

export default [
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
];
