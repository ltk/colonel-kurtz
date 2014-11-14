/** @jsx React.DOM **/
var React = require('react')
var ContentEditable = require('../../content_editable')
var Block = require('../../mixins/block')
var MoveableBlock = require('../../mixins/moveable_block')
var DeletableBlock = require('../../mixins/deletable_block')

var VideoBlockEditor = React.createClass({
  mixins: [
    Block,
    MoveableBlock,
    DeletableBlock
  ],

  valid(){
    return (this.props.block.content.video_id)
  },

  validityClassName() {
    return(this.valid() ? 'valid' : 'invalid')
  },

  className() {
    return ["block", this.validityClassName()].join(' ')
  },

  videoUrl() {
    return "http://www.youtube.com/embed/" + this.props.block.content.video_id
  },

  videoComponent() {
    if (this.props.block.content.video_id) {
      return(
        <iframe style={ { overflow: "hidden", height:"400px", width: "100%" } }
                width="100%"
                height="100%"
                key={ this.props.block.content.video_id }
                src={ this.videoUrl() }
                frameborder="0"
                allowfullscreen>
        </iframe>
      )
    }
  },

  videoContent() {
    return(
      <div>
        <input placeholder="Video ID" value={ this.props.block.content.video_id } onChange={ this.onChange } />

        { this.videoComponent() }
      </div>
    );
  },

  onChange(event) {
    this.props.block.content.video_id = event.target.value
    this.props.blockSet.notifyChange()
  },

  render() {
    return(
      <li className={ this.className() } key={ this.props.key}>
        { this.deleteButton() }
        { this.typeLabel() }
        { this.moveButtons() }

        { this.videoContent() }
      </li>
    );
  }
})

module.exports = VideoBlockEditor
