/** @jsx React.DOM **/
var React = require('react')
var BlockStore = require('../../stores/block')
var BlockList = require('./block_list')
var EditorJsonConsole = require('./editor_json_console')
var HtmlOutput = require('./html_output')

var ColonelKurtz = React.createClass({

  getInitialState() {
    return this.getState()
  },

  getState() {
    return {
      blockSet: BlockStore.getBlockSet(),
      preview: false
    }
  },

  updateState() {
    this.setState(this.getState())
  },

  componentWillMount() {
    BlockStore.onChange(this.updateState)
  },

  componentWillUnmount() {
    BlockStore.offChange(this.updateState)
  },

  toHtml() {
    return React.renderComponentToStaticMarkup(<HtmlOutput blockSet={ this.state.blockSet } />)
  },

  toJson() {
    var json = {
      blocks: this.state.blockSet.toJson(),
      compiled: this.toHtml()
    }

    return json
  },

  enablePreview() {
    this.setState({ preview: true })
  },

  disablePreview() {
    this.setState({ preview: false })
  },

  editorComponents() {
    if (this.state.preview) {
      return(
        <div>
          <button onClick={ this.disablePreview }>Edit</button>
          <HtmlOutput blockSet={ this.state.blockSet } />
        </div>
      )
    } else {
      //<EditorJsonConsole json={ this.toJson() } />
      //<textarea className="hidden-textarea" value={ JSON.stringify(this.toJson()) }></textarea>
      return(
        <div>
          <button onClick={ this.enablePreview }>Preview</button>
          <BlockList blockSet={ this.state.blockSet } />
          <hr/>

        </div>
      )

    }
  },

  render() {
    return (
      <div>
        { this.editorComponents() }
      </div>
    )
  }

})

module.exports = ColonelKurtz
