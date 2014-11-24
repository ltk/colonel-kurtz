/** @jsx React.DOM **/
var React = require('react')
var PreviewerBlockList = require('./previewer_block_list')

var Previewer =  React.createClass({

  blockComponents() {
    return this.state.blocks.map(function(block) {
      return <div>{ block }</div>
    })
  },

  render() {
    return(
      <div>
        <p>This is the previewer interface.</p>
      </div>
    )
  }

})

module.exports = Previewer
