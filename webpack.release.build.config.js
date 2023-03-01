const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const integrationTarget = process.env.TARGET;
const releaseFolder = 'release' + (integrationTarget === 'share' ? '' : '_catroid')

module.exports = {
  mode: devMode ? 'development' : 'production',
  optimization: {
    minimize: !devMode
  },
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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      fix: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename:  '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: 'media' },
        { from: 'node_modules/blockly/media', to: 'media' },
        { from: 'i18n/json', to: 'i18n' },
      ]
    })
  ]
};