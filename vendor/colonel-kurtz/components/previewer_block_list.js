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

  addBlockAtPosition(position) {
    var rootComponent = this

    return function() {
      BlockActions.create({ parentBlockListId: rootComponent.state.blockList.id, position: position })
    }
  },

  blockComponents() {
    var rootComponent = this
    var counter = 1
    return this.state.blockList.blockIds().map(function(blockId) {
      var components = <div>
        <PreviewerBlock key={ blockId } initialBlockId={ blockId } />
        <button onClick={ rootComponent.addBlockAtPosition(counter) }>Add Block</button>
      </div>

      counter += 1
      return components
    })
  },

  render() {
    return(
      <div className="blocks">
        <button onClick={ this.addBlockAtPosition(0) }>Add Block</button>
        { this.blockComponents() }
      </div>
    )
  }

})

module.exports = PreviewerBlockList
