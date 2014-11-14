/** @jsx React.DOM **/
var React = require('react')
var BlockStore = require('../../stores/block')
var BlockSet = require('../../stores/block_set')
var _ = require('underscore')
var BlockRegistry = require('./blocks/block_registry')

var AddBlock = React.createClass({
  getInitialState() {
    return { active: false }
  },

  getDefaultProps() {
    return {
      blockTypes: BlockRegistry.allKeys()
    }
  },

  cancel() {
    this.setState({ active: false })
  },

  getUid() {
    return Math.random();
  },

  addBlock(block) {
    this.props.blockSet.insertBlockAt(block, this.props.position)
    this.setState({ active: false })
  },

  toggleBlockOptions() {
    this.setState({ active: true })
  },

  addBlockCallback(component, blockTypeDefinition) {
    return function() {
      var newBlock = {
        type: blockTypeDefinition.key,
        label: blockTypeDefinition.label,
        uid: component.getUid(),
        content: blockTypeDefinition.defaultContent
      }

      component.addBlock(newBlock)
    }
  },

  renderOptions() {
    var component = this

    return this.props.blockTypes.map(function(blockType){
      var blockTypeDef = BlockRegistry.find(blockType)

      return(
        <li className="block-option" onClick={ component.addBlockCallback(component, blockTypeDef) }>{ blockTypeDef.label }</li>
      )
    })
  },

  render() {
    if(this.state.active) {
      return (
        <div className="block">
          <div className="cancel" onClick={ this.cancel }>Cancel</div>
          <p><strong>Choose your new block type.</strong></p>
          <ul className="block-options">
            { this.renderOptions() }
          </ul>
        </div>
      )
    } else {
      return (
        <li className="add-block" onClick={ this.toggleBlockOptions }>+</li>
      )
    }

  }

})

module.exports = AddBlock
