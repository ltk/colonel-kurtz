/** @jsx React.DOM **/
var React = require('react')
var ContentEditable = require('../../content_editable')
var Block = require('../../mixins/block')
var MoveableBlock = require('../../mixins/moveable_block')
var DeletableBlock = require('../../mixins/deletable_block')

var RichTextBlockEditor = React.createClass({
  mixins: [
    Block,
    MoveableBlock,
    DeletableBlock
  ],

  componentDidMount() {
    if (window) {
      var Editor = require('medium-editor')
      var node = this.refs.mediumEditor.getDOMNode()
      var editor = new Editor(node)
      this.setState({ editor: editor })
    }
  },

  componentDidUnmount() {
    delete this.state.editor
  },

  textContent() {
    return <ContentEditable ref="mediumEditor" html={ this.props.block.content.text } onChange={ this.onChange } />
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

module.exports = RichTextBlockEditor
