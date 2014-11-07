/** @jsx React.DOM **/
var React = require('react')
var BlockStore = require('../../stores/block')
var BlockList = require('./block_list')
var EditorJsonDisplay = require('./editor_json_display')
// var BlockActions = require('../../actions/block')
// var Counter = require('../../stores/counter')
// var CounterActions = require('../../actions/counter')

var ColonelKurtz = React.createClass({

  getInitialState() {
    return this.getState()
  },

  getState() {
    // debugger;
    return {
      blockSet: BlockStore.getBlockSet()
    }
  },

  updateState() {
    this.setState(this.getState())
  },

  componentWillMount() {
    BlockStore.onChange(this.updateState)
  },

  componentWillUnmount() {
    BlockStore.offChange(this.updateState)
  },

  render() {
    return (
      <div>
        <BlockList blockSet={ this.state.blockSet } />
        <EditorJsonDisplay json={ this.state.blockSet.toJson() } />
        <textarea className="hidden-textarea" value={ JSON.stringify(this.state.blockSet.toJson()) }></textarea>
      </div>
    )
  }

})

module.exports = ColonelKurtz
