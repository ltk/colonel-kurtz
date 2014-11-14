/** @jsx React.DOM **/
var React = require('react')
var EditorBlock = require('./editor_block')

var EditorBlockList =  React.createClass({

  blockComponents() {
    return this.props.blocks.map(function(block) {
      return <EditorBlock block={ block } />
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

module.exports = EditorBlockList
