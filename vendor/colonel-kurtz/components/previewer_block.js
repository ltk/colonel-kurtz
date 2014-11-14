/** @jsx React.DOM **/
var React = require('react')
var BlockStore = require('../stores/block_store')

var PreviewerBlock =  React.createClass({

  getInitialState() {
    return {
      block: BlockStore.find(this.props.initialBlockId)
    }
  },

  childBlockListComponent() {
    var childBlockList = this.state.block.childBlockList()

    if (childBlockList) {
      var PreviewerBlockList = require('./previewer_block_list')

      return <PreviewerBlockList initialBlockListId={ childBlockList.id } />
    }
  },

  render() {
    return(
      <div className="block">
        { this.state.block.content }
        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = PreviewerBlock


