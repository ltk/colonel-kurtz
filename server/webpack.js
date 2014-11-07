var Server   = require("webpack-dev-server")
var Webpack  = require("webpack")
var url      = require('url')
var config   = require('../config/webpack')
var location = process.env.ASSETS_HOST
var params   = url.parse(location)

config.entry = [
  'webpack/hot/dev-server',
  "webpack-dev-server/client?" + location
].concat(config.entry)

config.plugins = [
  new Webpack.HotModuleReplacementPlugin()
].concat(config.plugins)

var compiler = Webpack(config)

var server = new Server(compiler, {
  hot: true,
  stats: false,
  watchDelay: 300,
  contentBase: '/assets',
  publicPath: url.resolve(location, 'assets')
})

server.listen(params.port, function() {
  console.log("Webpack is running at: %s\n", location)
})

module.exports = server
