const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: path.join(__dirname, 'src/js/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/index.html'),
      filename: 'index.html',
      hash: true
    })
  ],
  // watch: true,
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname),
    hot: true,
    compress: !devMode,
    noInfo: true,
    writeToDisk: !devMode
  },
  target: 'web'
};