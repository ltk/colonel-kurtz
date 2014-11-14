/** @jsx React.DOM **/
var React = require('react')

var EditorJsonConsole = React.createClass({

  render() {
    return (
      <div className="editor-json-display">
        <p>Ooo look Col. Kurtz saves out to JSON:</p>
        <pre>{ JSON.stringify(this.props.json, undefined, 2) }</pre>
      </div>
    )
  }

})

module.exports = EditorJsonConsole
