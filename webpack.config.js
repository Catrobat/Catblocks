const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: path.join(__dirname, 'src/intern/js/index.js'),
  output: {
    filename: 'CatBlocks.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      fix: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/intern/html/' + process.env.TYPE + '.html'),
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: devMode ? '[name].css' : '[name].[fullhash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[fullhash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: 'media' },
        { from: 'node_modules/blockly/media', to: 'media' },
        { from: 'i18n/json', to: 'i18n' },
        { from: 'test/share', to: 'assets/share' },
        { from: 'favicon.ico', to: 'favicon.ico' }
      ]
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      TYPE: 'catblocks',
      DISPLAY_LANGUAGE: process.env.DISPLAY_LANGUAGE ? process.env.DISPLAY_LANGUAGE : "",
      DISPLAY_RTL: process.env.DISPLAY_RTL ? process.env.DISPLAY_RTL : ""
    })
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    compress: !devMode,
    host: '0.0.0.0',
    port: 8080,
    static: {
      directory: path.join(__dirname, 'dist'),
      serveIndex: true
    },
    devMiddleware: {
      writeToDisk: !devMode
    }
  },
  target: 'web'
};