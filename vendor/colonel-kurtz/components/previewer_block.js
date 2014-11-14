/** @jsx React.DOM **/
var React = require('react')
var BlockStore = require('../stores/block_store')

var PreviewerBlock =  React.createClass({

  getInitialState() {
    return {
      block: BlockStore.find(this.props.initialBlockId)
    }
  },

  render() {
    return(
      <div>
        { this.state.block.content }
      </div>
    )
  }

})

module.exports = PreviewerBlock
