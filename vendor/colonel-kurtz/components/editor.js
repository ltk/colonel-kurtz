/** @jsx React.DOM **/
var React = require('react')
var EditorBlockList = require('./editor_block_list')

var Editor =  React.createClass({

  render() {
    return(
      <div>
        <p>This is the editor interface.</p>
        <EditorBlockList initialBlockListId={ this.props.initialBlockListId } />
      </div>
    )
  }

})

module.exports = Editor
