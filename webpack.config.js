const path = require('path');

module.exports = {
  entry: './examples/cube.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};