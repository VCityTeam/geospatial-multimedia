const path = require('path');

const result = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    library: 'geospatialMultimedia',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [],
  },
  resolve: {
    modules: [
      'node_modules', // The default
      'src',
    ],
  },
};

// production or development
if (process.env.NODE_ENV == 'production') {
  result.output.path = path.resolve(process.cwd(), './dist/production');
  result.mode = 'production';
} else {
  result.mode = 'development';
  result.devtool = 'source-map';
  result.output.path = path.resolve(process.cwd(), './dist/development');
}

module.exports = result;
