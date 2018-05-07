const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
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
    filename: 'responsive-kifu.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/pagagm584.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    index: 'index.html',
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    open: true,
    port: 9000,
    host: '0.0.0.0'
  }
};
