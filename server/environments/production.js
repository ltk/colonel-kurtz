module.exports = function(server) {

  // Serve static assets from the assets folder directly
  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: 'assets'
      }
    }
  })

}
