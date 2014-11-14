/** @jsx React.DOM **/
var React = require('react')

var EditorBlock =  React.createClass({

  render() {
    return(
      <div>
        { this.props.block }
      </div>
    )
  }

})

module.exports = EditorBlock
