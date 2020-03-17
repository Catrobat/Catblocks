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
    filename: 'CatBlocks.js',
    path: path.resolve(__dirname, 'dist')
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: '../',
              hmr: devMode,
            }
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
      template: path.join(__dirname, 'src/html/' + process.env.TYPE + '.html'),
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin([
      { from: 'assets', to: 'media' },
      { from: 'node_modules/blockly/media', to: 'media' },
      { from: 'i18n/json', to: 'i18n' },
      { from: 'test/share', to: 'assets/share' },
      { from: 'favicon.ico', to: 'favicon.ico' }
    ]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      TYPE: 'catblocks'
    })
  ],
  // watch: true,
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: !devMode,
    noInfo: true,
    writeToDisk: !devMode,
    host: '0.0.0.0',
    port: 8080,
    serveIndex: true
  },
  target: 'web'
};