/** @jsx React.DOM **/
var React = require('react')

var PreviewerBlock =  React.createClass({

  render() {
    return(
      <div>
        { this.props.block }
      </div>
    )
  }

})

module.exports = PreviewerBlock
