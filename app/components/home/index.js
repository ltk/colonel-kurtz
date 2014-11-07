/** @jsx React.DOM **/
var React = require('react')
var BlockStore = require('../../stores/block')
var BlockActions = require('../../actions/block')
var ColonelKurtz = require('../editor/colonel_kurtz')

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

  render() {
    return (
      <section>
        <header>
          <h1>Welcome</h1>
        </header>
        <p>This is a demo of the Colonel Kurtz block editor.</p>
        <ColonelKurtz />
      </section>
    )
  }

})

module.exports = Home
