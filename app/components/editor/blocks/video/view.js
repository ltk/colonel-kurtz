/** @jsx React.DOM **/
var React = require('react')

var VideoBlockView = React.createClass({

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

  render() {
    return(
      <div
        key={ this.props.key}>
        { this.videoComponent() }
      </div>
    )
  }

})

module.exports = VideoBlockView
