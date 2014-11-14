/** @jsx React.DOM **/
var React = require('react')
var EditorComponent = require('./editor')
var PreviewerComponent = require('./previewer')
var JsonConsoleComponent = require('./json_console')

var App =  React.createClass({

  getInitialState() {
    return {
      mode: 'edit'
    }
  },

  getBlockListId() {
    return this.props.editor.rootBlockList().id
  },

  setModeToPreview() {
    this.setState({ mode: 'preview' })
  },

  setModeToEdit() {
    this.setState({ mode: 'edit' })
  },

  setModeToJsonConsole() {
    this.setState({ mode: 'json_console' })
  },

  modeSelectionComponent() {
    var mode = this.state.mode;

    return (
      <div className="colonel-toolbar clearfix">
        <div className="colonel-btn-group colonel-right">
          <button className="colonel-btn" disabled={ mode === 'edit' } onClick={ this.setModeToEdit }>Edit</button>
          <button className="colonel-btn" disabled={ mode === 'preview' } onClick={ this.setModeToPreview }>Preview</button>
          <button className="colonel-btn" disabled={ mode === 'json_console' } onClick={ this.setModeToJsonConsole }>JSON</button>
        </div>
      </div>
    )
  },

  contentComponent() {
    if (this.state.mode === 'edit') {
      return(
        <EditorComponent initialBlockListId={ this.getBlockListId() } />
      )
    } else if (this.state.mode === 'preview') {
      return(
        <PreviewerComponent initialBlockListId={ this.getBlockListId() } />
      )
    } else if (this.state.mode === 'json_console') {
      return(
        <JsonConsoleComponent initialBlockListId={ this.getBlockListId() } />
      );
    }

  },

  render() {
    return(
      <div>
        { this.modeSelectionComponent() }
        { this.contentComponent() }
      </div>
    )
  }

})

module.exports = App
