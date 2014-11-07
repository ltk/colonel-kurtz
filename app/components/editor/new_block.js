/** @jsx React.DOM **/
var React = require('react')
var BlockStore = require('../../stores/block')


var NewBlock = React.createClass({
  getInitialState() {
    return { active: false }
  },

  addTextBlock() {
    var block = {
      type: 'text',
      content: 'This is an added text block!'
    }

    BlockStore.add(block, this.props.position, this.props.block)
    this.setState({ active: false })
  },

  toggleBlockOptions() {
    this.setState({ active: true })
  },

  render() {
    if(this.state.active) {
      return (
        <ul class="block-options">
          <li className="block-option" onClick={ this.addTextBlock }>Text</li>
          <li className="block-option">Image</li>
          <li className="block-option">Code</li>
          <li className="block-option">Markdown</li>
          <li className="block-option">Step</li>
        </ul>
      )
    } else {
      return (
        <div className="new-block" onClick={ this.toggleBlockOptions }>+</div>
      )
    }

  }

})

module.exports = NewBlock
