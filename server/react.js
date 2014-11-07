console.log('Installing %s ...', 'node-jsx'.green)

require('node-jsx').install({
  extension : '.js',
  harmony   : true
})

var Router = require('react-router')
var routes = require('../app/router')
var url    = require('url')

module.exports = function (request, reply) {
  var path = url.format(request.url)

  Router.renderRoutesToString(routes, path, function(error, abortReason, html) {
    if (error) {
      reply.error(error, abortReason)
    }

    reply.view('application.html', {
      app: html,
      assets_host: process.env.ASSETS_HOST
    })
  })

}
