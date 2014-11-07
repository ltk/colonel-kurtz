require('node-env-file')('.env')
require('chai').should()

var webdriver = require('webdriverio')
var url       = require('url')
var location  = url.format({ protocol: "http", hostname: 'localhost', port: process.env.PORT })

describe('Whenever the user clicks the count button', function(){
  var client = {}

  before(function(done){
    client = webdriver.remote({ desiredCapabilities: { browserName: 'phantomjs' } })
    client.init(done)
  })

  it ('should increase the value by one', function(done) {
    client.url(location)
          .leftClick('button')
          .getText('.count', function(err, html) {
            html.should.equal('1')
          })
          .call(done)
  })

  after(function(done) {
    client.end(done)
  })

})
