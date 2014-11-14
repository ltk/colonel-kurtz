/** @jsx React.DOM **/
var React = require('react')
var ContentEditable = require('../../content_editable')
var Block = require('../../mixins/block')
var MoveableBlock = require('../../mixins/moveable_block')
var DeletableBlock = require('../../mixins/deletable_block')

var ImageBlockEditor = React.createClass({
  mixins: [
    Block,
    MoveableBlock,
    DeletableBlock
  ],

  valid(){
    return (this.props.block.content.image_url && this.props.block.content.image_alt_text)
  },

  validityClassName() {
    return(this.valid() ? 'valid' : 'invalid')
  },

  className() {
    return ["block", this.validityClassName()].join(' ')
  },

  imageContent() {
    var components = []

    components.push(
      <div className="image-input">
        <input placeholder="Image URL" value={ this.props.block.content.image_url } onChange={ this.onChangeUrl } />
        <input placeholder="Alt Text" value={ this.props.block.content.image_alt_text } onChange={ this.onChangeAlt } />
      </div>
    )

    if (this.props.block.content.image_url) {
      components.push(<img src={ this.props.block.content.image_url } alt={ this.props.block.content.image_alt_text } onChange={ this.onChange } />)
    }

    return components
  },

  onChangeUrl(event) {
    this.props.block.content.image_url = event.target.value
    this.props.blockSet.notifyChange()
  },

  onChangeAlt(event) {
    this.props.block.content.image_alt_text = event.target.value
    this.props.blockSet.notifyChange()
  },

  render() {
    return(
      <li className={ this.className() } key={ this.props.key}>
        { this.deleteButton() }
        { this.typeLabel() }
        { this.moveButtons() }

        { this.imageContent() }
      </li>
    );
  }
})

module.exports = ImageBlockEditor
