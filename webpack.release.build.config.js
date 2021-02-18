const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const integrationTarget = process.env.TARGET;
const variables = require('./variables');
const releaseFolder = 'release' + (integrationTarget === 'share' ? '' : '_catroid')


module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: path.join(__dirname, `src/library/js/webpack_${integrationTarget}.js`),
  output: {
    filename: 'CatBlocks.js',
    path: path.resolve(__dirname, releaseFolder),
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
    ])
  ]
};