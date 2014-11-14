/** @jsx React.DOM **/
var React = require('react')

var MoveableBlock = {

  moveBlockUp() {
    if (this.canMoveUp()) {
      this.props.blockSet.moveBlockTo(this.props.block, this.props.block.position - 1)
    }
  },

  moveBlockDown() {
    if (this.canMoveDown()) {
      this.props.blockSet.moveBlockTo(this.props.block, this.props.block.position + 1)
    }
  },

  canMoveUp() {
    return (this.props.block.position > this.props.blockSet.minIndex())
  },

  canMoveDown() {
    return (this.props.block.position < this.props.blockSet.maxIndex())
  },

  moveButtons() {
    var components = []

    if (this.canMoveUp()){
      components.push(<span className="move-block" key="move-up" onClick={ this.moveBlockUp }>⇡</span>)
    }

    if (this.canMoveDown()){
      components.push(<span className="move-block" key="move-down" onClick={ this.moveBlockDown }>⇣</span>)
    }

    return components
  }
}

module.exports = MoveableBlock
