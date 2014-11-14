/** @jsx React.DOM **/
var React = require('react')

var Block = {

  typeLabel() {
    return(
      <span className="block-type-label">{ this.props.block.label }</span>
    )
  }

}

module.exports = Block
