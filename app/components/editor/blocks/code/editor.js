/** @jsx React.DOM **/
var React = require('react')
var ContentEditable = require('../../content_editable')
var Block = require('../../mixins/block')
var MoveableBlock = require('../../mixins/moveable_block')
var DeletableBlock = require('../../mixins/deletable_block')

var CodeBlockEditor = React.createClass({
  mixins: [
    Block,
    MoveableBlock,
    DeletableBlock
  ],

  textContent() {
    if (this.props.block.content.text) {
      return <ContentEditable html={ this.props.block.content.text } onChange={ this.onChange } />
    }
  },

  onChange(event) {
    this.props.block.content.text = event.target.value
    this.props.blockSet.notifyChange()
  },

  render() {
    return(
      <li className="block" key={ this.props.key }>
        { this.deleteButton() }
        { this.typeLabel() }
        { this.moveButtons() }

        { this.textContent() }
      </li>
    );
  }
})

module.exports = CodeBlockEditor
