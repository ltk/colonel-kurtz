/** @jsx React.DOM **/
var React = require('react')
var PreviewerBlock = require('./previewer_block')

var PreviewerBlockList =  React.createClass({

  blockComponents() {
    return this.props.blocks.map(function(block) {
      return <PreviewerBlock block={ block } />
    })
  },

  render() {
    return(
      <div>
        { this.blockComponents() }
      </div>
    )
  }

})

module.exports = PreviewerBlockList
