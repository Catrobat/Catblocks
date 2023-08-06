const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const simpleGit = require("simple-git");
const git = simpleGit.default();
const devMode = process.env.NODE_ENV !== 'production';

const integrationTarget = process.env.TARGET;
const integrationTargetUppercase = integrationTarget.charAt(0).toUpperCase() + integrationTarget.slice(1);

const entryClassName = `CatBlocks${integrationTargetUppercase}`;
const entryFile = `${entryClassName}.ts`;

const releaseFolder = 'release' + (integrationTarget === 'share' ? '' : '_catroid');

module.exports = async function () {
  let versionInformation = '*** no version found ***';
  /*try {
    await git.pull('--tags', '--ff-only');
    const loadedTags = await git.tags({ '--points-at': 'HEAD' });
    console.log('Loaded Tags:', loadedTags);
    if (loadedTags && loadedTags.all && loadedTags.all.length > 0) {
      versionInformation = loadedTags.all.join(', ')
    }
  } catch (error) {
    console.error('Error loading git tags.', error);
  }*/

  const configuration = {
    mode: 'production',
    optimization: {
      minimize: !devMode,
      minimizer: [
        new TerserPlugin({
          extractComments: {
            condition: true,
            filename: (fileData) => {
              // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
              return `${fileData.filename}.LICENSE.txt${fileData.query}`;
            },
            banner: (commentsFile) => {
              return `CatBlocks Version ${versionInformation} | For license information please see ${commentsFile}`;
            },
          },
        }),
      ]
    },
    entry: path.join(__dirname, 'src/library/ts/', entryFile),
    output: {
      filename: 'CatBlocks.js',
      path: path.resolve(__dirname, releaseFolder),
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
        ]
      })
    ]
  };
  return configuration;
};