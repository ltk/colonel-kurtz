/** @jsx React.DOM **/
var React = require('react')
var ContentEditable = require('../content_editable')
var MoveableBlock = require('../mixins/moveable_block')

var TableOfContentsEntryBlock = React.createClass({
  mixins: [MoveableBlock],

  typeLabel(){
    return "Table of Contents Entry"
  },

  valid(){
    return (this.props.block.content.image_url &&
            this.props.block.content.image_alt_text &&
            this.props.block.content.link_url &&
            this.props.block.content.link_text)
  },

  validityClassName() {
    return(this.valid() ? 'valid' : 'invalid')
  },

  className() {
    return ["block", this.validityClassName()].join(' ')
  },

  delete() {
    this.props.blockSet.deleteAtPosition(this.props.block.position)
  },

  imageContent() {
    var components = []

    components.push(
      <div className="image-input">
        <input placeholder="Image URL" value={ this.props.block.content.image_url } onChange={ this.onChangeImageUrl } />
        <input placeholder="Image Alt Text" value={ this.props.block.content.image_alt_text } onChange={ this.onChangeAlt } />

        <input placeholder="Link URL" value={ this.props.block.content.link_url } onChange={ this.onChangeLinkUrl } />
        <input placeholder="Link Text" value={ this.props.block.content.link_text } onChange={ this.onChangeLinkText } />
      </div>
    )

    if (this.props.block.content.image_url) {
      components.push(<img src={ this.props.block.content.image_url } alt={ this.props.block.content.image_alt_text } onChange={ this.onChange } />)
    }

    components.push(<a href={ this.props.block.content.link_url }>{ this.props.block.content.link_text }</a>)

    return components
  },

  onChangeImageUrl(event) {
    this.props.block.content.image_url = event.target.value
    this.props.blockSet.notifyChange()
  },

  onChangeLinkUrl(event) {
    this.props.block.content.link_url = event.target.value
    this.props.blockSet.notifyChange()
  },

  onChangeLinkText(event) {
    this.props.block.content.link_text = event.target.value
    this.props.blockSet.notifyChange()
  },

  onChangeAlt(event) {
    this.props.block.content.image_alt_text = event.target.value
    this.props.blockSet.notifyChange()
  },

  render() {
    return(
      <li className={ this.className() } key={ this.props.key}>
        <div className="delete-block" onClick={ this.delete }>Delete</div>
        <span className="block-type-label">{ this.typeLabel() }</span>
        { this.moveComponents() }
        { this.imageContent() }
      </li>
    );
  }
})

module.exports = TableOfContentsEntryBlock
