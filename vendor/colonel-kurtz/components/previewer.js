/** @jsx React.DOM **/
var React = require('react')
var PreviewerBlockList = require('./previewer_block_list')
var PreviewerJsonConsole = require('./previewer_json_console')

var Previewer =  React.createClass({

  render() {
    return(
      <div>
        <p>This is the previewer interface.</p>
        <PreviewerBlockList initialBlockListId={ this.props.initialBlockListId } />
        <PreviewerJsonConsole initialBlockListId={ this.props.initialBlockListId } />
      </div>
    )
  }

})

module.exports = Previewer
