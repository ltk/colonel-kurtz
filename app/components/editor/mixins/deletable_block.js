/** @jsx React.DOM **/
var React = require('react')

var DeletableBlock = {

  delete() {
    return this.props.blockSet.deleteAtPosition(this.props.block.position)
  },

  deleteButton() {
    return(
      <div className="delete-block" onClick={ this.delete }>Delete</div>
    )
  }

}

module.exports = DeletableBlock
