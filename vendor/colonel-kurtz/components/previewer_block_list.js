/** @jsx React.DOM **/
var React = require('react')
var PreviewerBlock = require('./previewer_block')
var BlockListStore = require('../stores/block_list_store')
var BlockActions = require('../actions/block_actions')

var PreviewerBlockList =  React.createClass({

  getInitialState() {
    return {
      blockList: BlockListStore.find(this.props.initialBlockListId)
    }
  },

  getState() {
    return {
      blockList: BlockListStore.find(this.state.blockList.id),
      thing: Math.random()
    }
  },

  updateState() {
    this.setState(this.getState())
  },

  componentWillMount() {
    BlockListStore.onChange(this.updateState)
  },

  componentWillUnmount() {
    BlockListStore.offChange(this.updateState)
  },

  addBlock() {
    BlockActions.create({ parentBlockListId: this.state.blockList.id })
  },

  blockComponents() {
    return this.state.blockList.blockIds().map(function(blockId) {
      return <PreviewerBlock initialBlockId={ blockId } />
    })
  },

  render() {
    return(
      <div>
        <button onClick={ this.addBlock }>Add Block</button>
        { this.blockComponents() }
      </div>
    )
  }

})

module.exports = PreviewerBlockList
