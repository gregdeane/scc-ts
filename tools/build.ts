process.env.NODE_ENV = 'production';

import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';
import * as webpack from 'webpack';
import paths from '../config/paths';
import config from '../config/webpack.prod';

const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const filesize = require('filesize');
const gzipSize = require('gzip-size').sync;
const recursive = require('recursive-readdir');
const rimrafSync = require('rimraf').sync;
const stripAnsi = require('strip-ansi');

// warn and crash if required files are missing
if (!checkRequiredFiles([paths.rootModule])) {
  process.exit(1);
}

// in: /static/js/main.82be8.js
// out: /static/js/main.js
const removeFileNameHash = (fileName: string) => {
  return fileName
    .replace(paths.dist, '')
    .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
};

// in: 1024, 2048
// out: "(+1 KB)"
const getDifferenceLabel = (currentSize: number, previousSize: number) => {
  let FIFTY_KILOBYTES = 1024 * 50;
  let difference = currentSize - previousSize;
  let fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;

  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red('+' + fileSize);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow('+' + fileSize);
  } else if (difference < 0) {
    return chalk.green(fileSize);
  } else {
    return '';
  }
};

// print detailed summary of build files
const printFileSizes = (stats: any, previousSizeMap: any) => {
  let assets = stats.toJson().assets
    .filter(asset => /\.(js|css)$/.test(asset.name))
    .map(asset => {
      let fileContents = fs.readFileSync(paths.dist + '/' + asset.name);
      let size = gzipSize(fileContents);
      let previousSize = previousSizeMap[removeFileNameHash(asset.name)];
      let difference = getDifferenceLabel(size, previousSize);

      return {
        folder: path.join('dist', path.dirname(asset.name)),
        name: path.basename(asset.name),
        size: size,
        sizeLabel: filesize(size) + ((difference && ' (' + difference + ')') || '')
      };
    });

  assets.sort((a, b) => b.size - a.size);

  let longestSizeLabelLength = Math.max.apply(null,
    assets.map(a => stripAnsi(a.sizeLabel).length)
  );

  assets.forEach(asset => {
    let sizeLabel = asset.sizeLabel;
    let sizeLength = stripAnsi(sizeLabel).length;

    if (sizeLength < longestSizeLabelLength) {
      sizeLabel += ' '.repeat(longestSizeLabelLength - sizeLength);
    }

    console.log(
      '  ' + sizeLabel +
      '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name)
    );
  });
};

// create production build and print deployment instructions
const build = (previousSizeMap: any) => {
  console.log('Creating an optimized production build...');

  webpack(config).run((err: any, stats: any) => {
    if (err) {
      console.error('Failed to create a production build. Reason:');
      console.error(err.message || err);
      process.exit(1);
    }

    console.log(chalk.green('Compiled successfully.'));
    console.log();

    console.log('File sizes after gzip:');
    console.log();
    printFileSizes(stats, previousSizeMap);
    console.log();

    console.log('The ' + chalk.cyan('dist') + ' folder is ready to be deployed.');
    console.log();
  });
};

// read the current file sizes in build directory.
// this facilitates displaying how much they changed later.
recursive(paths.dist, (err: any, fileNames: Array<string>) => {
  let previousSizeMap = (fileNames || [])
    .filter(fileName => /\.(js|css)$/.test(fileName))
    .reduce((memo: any, fileName: string) => {
      let contents = fs.readFileSync(fileName);
      let key = removeFileNameHash(fileName);
      memo[key] = gzipSize(contents);
      return memo;
    }, {});

  // remove all content except for the directory
  rimrafSync(paths.dist + '/*');

  // start the webpack build
  build(previousSizeMap);
});
