/** @jsx React.DOM **/
var React = require('react')
var PreviewerBlockList = require('./previewer_block_list')

var Previewer =  React.createClass({

  render() {
    return(
      <div>
        <p>This is the previewer interface.</p>
        <PreviewerBlockList initialBlockListId={ this.props.initialBlockListId } />
      </div>
    )
  }

})

module.exports = Previewer
