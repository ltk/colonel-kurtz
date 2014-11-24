require('node-env-file')('./.env')

var Path = require('path')
var WebPack = require('webpack')
var isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  cache: true,
  debug: isDevelopment,
  devtool: isDevelopment ? 'source-map' : null,
  entry: './app/index.js',

  output: {
    path: Path.resolve(__dirname, '..', 'assets'),
    publicPath: '/',
    filename: 'capacitor.js',
    sourceMapFilename: 'capacitor.map'
  },

  plugins: [],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [ 'web_modules', 'node_modules' ]
  },

  module: {
    loaders: [
      {
        test    : /\.js$/,
        exclude : /node_modules/,
        loader  : 'react-hot'
      },
      {
        test    : /\.js$/,
        loader  : 'envify-loader'
      },
      {
        test    : /\.js$/,
        exclude : /node_modules/,
        loader  : 'jsx-loader',
        query   : { harmony: true, stripTypes: true }
      },
      {
        test    : /\.json$/,
        exclude : /node_modules/,
        loader  : 'json-loader'
      }
    ]
  }
}
