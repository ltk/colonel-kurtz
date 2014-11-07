var url = require('url');

module.exports = function(server) {

  // Boot Webpack
  require('../webpack')

  // Static assets are forwared through to Webpack
  server.route({
    path: '/assets/{p*}',
    method: 'GET',
    handler: {
      proxy: {
        mapUri: function(request, callback) {
          return callback(null, url.resolve(process.env.ASSETS_HOST, request.raw.req.url));
        },
        passThrough: true
      }
    }
  })

}
