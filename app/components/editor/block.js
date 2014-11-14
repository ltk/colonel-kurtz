/** @jsx React.DOM **/
var React = require('react')
var BlockRegistry = require('./blocks/block_registry')

var Block = React.createClass({

  render() {
    var component = BlockRegistry.find(this.props.block.type).editorComponent

    return <component blockSet={ this.props.blockSet } block={ this.props.block } key={ this.props.key } addBlockComponent={ this.props.addBlockComponent } />
  }

})

module.exports = Block
