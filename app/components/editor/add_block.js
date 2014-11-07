/** @jsx React.DOM **/
var React = require('react')
var BlockStore = require('../../stores/block')
var BlockSet = require('../../stores/block_set')

var AddBlock = React.createClass({
  getInitialState() {
    return { active: false }
  },

  cancel() {
    this.setState({ active: false })
  },

  addTextBlock() {
    var newBlock = {
      type: 'text',
      content: {
        text: 'This is a new text block!'
      }
    }

    this.addBlock(newBlock)
  },

  addImageBlock() {
    var newBlock = {
      type: 'image',
      content: {
        text: 'This is a new image block.'
      }
    }

    this.addBlock(newBlock)
  },

  addStepBlock() {
    var newBlock = {
      type: 'step',
      content: {
        text: 'This is a new step block. You can add other blocks to its content.',
        blocks: [],
        blockSet: new BlockSet([])
      }
    }

    this.addBlock(newBlock)
  },

  addCodeBlock() {
    var newBlock = {
      type: 'code',
      content: {
        text: "function(){\nalert('I'm a code block!');\n}",
        blockSet: new BlockSet([])
      }
    }

    this.addBlock(newBlock)
  },

  addBlock(block) {
    this.props.blockSet.insertBlockAt(block, this.props.position)
    this.setState({ active: false })
  },

  toggleBlockOptions() {
    this.setState({ active: true })
  },

  render() {
    if(this.state.active) {
      return (
        <div className="block">
          <div className="cancel" onClick={ this.cancel }>Cancel</div>
          <p><strong>Choose your new block type.</strong></p>
          <ul className="block-options">
            <li className="block-option" onClick={ this.addTextBlock }>Text</li>
            <li className="block-option" onClick={ this.addImageBlock }>Image</li>
            <li className="block-option" onClick={ this.addStepBlock }>Step</li>
            <li className="block-option" onClick={ this.addCodeBlock }>Code</li>
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
