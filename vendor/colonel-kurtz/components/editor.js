/** @jsx React.DOM **/
var React = require('react')
var EditorBlockList = require('./editor_block_list')

var Editor =  React.createClass({

  blockComponents() {
    return this.state.blocks.map(function(block) {
      return <div>{ block }</div>
    })
  },

  render() {
        // <EditorBlockList blocks={ this.state.blocks } />
    return(
      <div>
        <p>This is the editor interface.</p>
      </div>
    )
  }

})

module.exports = Editor
