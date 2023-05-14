const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const integrationTarget = process.env.TARGET;
const integrationTargetUppercase = integrationTarget.charAt(0).toUpperCase() + integrationTarget.slice(1);
const entryClassName = `CatBlocks${integrationTargetUppercase}`;
const entryFile = `${entryClassName}.ts`;

module.exports = {
  mode: 'production',
  optimization: {
    minimize: !devMode
  },
  entry: path.join(__dirname, 'src/library/ts/', entryFile),
  output: {
    filename: 'CatBlocks.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'CatBlocks',
      type: 'var',
      export: entryClassName
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/library/html/release.html'),
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
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
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    }
  },
  target: 'web'
};