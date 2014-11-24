/** @jsx React.DOM **/
var React = require('react')
var BlockStore = require('../stores/block_store')

var EditorBlock =  React.createClass({

  getInitialState() {
    return {
      block: BlockStore.find(this.props.initialBlockId)
    }
  },

  remove() {
    this.state.block.remove()
  },

  removeComponent() {
    return <button onClick={ this.remove }>Remove</button>
  },

  childBlockListComponent() {
    var childBlockList = this.state.block.childBlockList()

    if (childBlockList) {
      var EditorBlockList = require('./editor_block_list')

      return <EditorBlockList initialBlockListId={ childBlockList.id } />
    }
  },

  render() {
    return(
      <div className="block">
        { this.removeComponent() }
        { this.state.block.content }
        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = EditorBlock


