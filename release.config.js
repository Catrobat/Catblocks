const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const variables = require('./variables');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/js/release.js'),
  output: {
    filename: 'CatBlocks.js',
    path: path.resolve(__dirname, 'release'),
    libraryTarget: 'var',
    library: 'CatBlocks'
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
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          // 'postcss-loader',
          // 'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/release.html'),
      filename: 'index.html',
      hash: true,
      variables: variables
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename:  '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin([
      { from: 'assets', to: 'media' },
      { from: 'node_modules/blockly/media', to: 'media' },
      { from: 'i18n/json', to: 'i18n' },
      { from: 'test/share', to: 'assets/share' },
      { from: 'favicon.ico', to: 'favicon.ico' }
    ])
  ],
  target: 'web'
};