/** @jsx React.DOM **/
var React = require('react')

var ImageBlockView = React.createClass({

  render() {
    return(
      <div
        key={ this.props.key}>
        <img src={ this.props.block.content.image_url } alt={ this.props.block.content.image_alt_text } />
      </div>
    )
  }

})

module.exports = ImageBlockView
