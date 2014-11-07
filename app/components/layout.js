/** @jsx React.DOM **/
var React = require('react')

var Layout = React.createClass({

  render() {
    return (
      <main role="main">
        <this.props.activeRouteHandler />
      </main>
    )
  }

})

module.exports = Layout
