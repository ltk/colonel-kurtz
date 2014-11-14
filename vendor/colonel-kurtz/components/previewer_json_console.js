/** @jsx React.DOM **/
var React = require('react')
var BlockListStore = require('../stores/block_list_store')

var PreviewerJsonConsole =  React.createClass({

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

  render() {
    return(
      <pre>
        { JSON.stringify(this.state.blockList.toJson(), undefined, 2) }
      </pre>
    )
  }

})

module.exports = PreviewerJsonConsole
