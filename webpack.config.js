// Why used 'libraryExport'? reference: https://github.com/webpack/webpack/issues/3929

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: {
    'holy-editor': './src/index.js'
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
        test: /\.scss$/,
        use: [
          'to-string-loader',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader?sourceMap'
          },
          {
            loader: 'sass-loader?sourceMap'
          }
        ]
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
    new ExtractTextPlugin('[name].css')
  ],
  devtool: 'source-map'
}

module.exports = config
