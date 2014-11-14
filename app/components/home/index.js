/** @jsx React.DOM **/
var React = require('react')
var ColonelKurtz = require('../../../vendor/colonel-kurtz/colonel-kurtz')

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
    var editor = new ColonelKurtz(this.refs.app.getDOMNode(), {})
    editor.render()
  },

  render() {
    return (
      <section>
        <h1 className="colonel-toolbar">
          ColKurtz
        </h1>
        <div className="colonel-body">
          <p>This is a demo of the Colonel Kurtz block editor.</p>
          <div ref="app"></div>
        </div>
      </section>
    )
  }

})

module.exports = Home
