// Why used 'libraryExport'? reference: https://github.com/webpack/webpack/issues/3929

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    'holy-editor': './src/index.js',
    'holy-editor-theme-default': './src/themes/default/index.js',
    'holy-editor-theme-blue': './src/themes/blue/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/',
    library: 'HolyEditor',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=25000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap',
          use: [
            'css-loader?sourceMap',
            {
              loader: 'postcss-loader?sourceMap'
            },
            {
              loader: 'sass-loader?sourceMap'
            }
          ]
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(jpeg|png|gif|jpg|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: []
  },
  cache: false,
  watch: true,
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
  devtool: 'source-map'
};


module.exports = config;
