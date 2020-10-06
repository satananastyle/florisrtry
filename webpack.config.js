const path = require('path');

module.exports = {
  mode: 'development',
  entry: './source//js/main.js',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'docs'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    watchContentBase: true,
  }
};
