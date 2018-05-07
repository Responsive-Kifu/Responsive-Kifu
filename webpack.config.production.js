const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'},
              {loader: 'css-loader'}]
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg|mp3)$/,
        loader: 'url-loader'
      },
    ],
  },
  output: {
    filename: 'responsive-kifu-[hash].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
  ],
};
