/** @jsx React.DOM **/
var React = require('react')
// var ColonelKurtz = require('../../../vendor/colonel-kurtz/colonel-kurtz')
// var ColonelKurtz = require('/Users/lawson/Apps/colonel-kurtz/build')

var Home = React.createClass({

  getInitialState() {
    return this.getState()
  },

  getState() {
    return {}
  },

  updateState() {
    this.setState(this.getState())
  },

  componentDidMount() {

  },

  render() {
    return (
      <section>
        <header>
          <h1>ColKurtz</h1>
        </header>
        <p>This is a demo of the Colonel Kurtz block editor.</p>
        <div ref="app"></div>
      </section>
    )
  }

})

module.exports = Home
