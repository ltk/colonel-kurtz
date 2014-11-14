/** @jsx React.DOM **/
var React = require('react')
var BlockRegistry = require('./blocks/block_registry')

var HtmlOutput = React.createClass({

  blockViews() {
    var component = this

    return this.props.blockSet.blocks().map(function(block){
      var view = BlockRegistry.find(block.type).viewComponent
      return <view blockSet={ component.props.blockSet } block={ block } key={ block.key } />
    })
  },

  render() {
    return (
      <div className="html-output">
        { this.blockViews() }
      </div>
    )
  }

})

module.exports = HtmlOutput
