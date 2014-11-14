/** @jsx React.DOM **/
var React = require('react')

var CodeBlockView = React.createClass({

  render() {
    return(
      <div
        key={ this.props.key }
        dangerouslySetInnerHTML={{ __html: this.props.block.content.text }}>
      </div>
    );
  }

})

module.exports = CodeBlockView
