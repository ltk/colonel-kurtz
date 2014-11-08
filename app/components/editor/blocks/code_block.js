/** @jsx React.DOM **/
var React = require('react')
var ContentEditable = require('../content_editable')

var CodeBlock = React.createClass({
  typeLabel(){
    return "Code"
  },

  delete() {
    this.props.blockSet.deleteAtPosition(this.props.block.position)
  },

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
      <li className="block">
        <div className="delete-block" onClick={ this.delete }>Delete</div>
        <span className="block-type-label">{ this.typeLabel() }</span>
        { this.textContent() }
      </li>
    );
  }
})

module.exports = CodeBlock
