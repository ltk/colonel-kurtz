/** @jsx React.DOM **/
var React = require('react')

var Error404 = React.createClass({

  render() {
    return (
      <section>
        <header>
          <h1>Error 404</h1>
        </header>
        <p>You've hit a page that can not be found!</p>
      </section>
    )
  }

})

module.exports = Error404
