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
    if (this.state.mode === 'edit') {
      return(
        <div>
          <button disabled>Edit</button>
          <button onClick={ this.setModeToPreview }>Preview</button>
          <button onClick={ this.setModeToJsonConsole }>JSON Console</button>
        </div>
      )
    } else if (this.state.mode === 'preview') {
      return(
        <div>
          <button onClick={ this.setModeToEdit }>Edit</button>
          <button disabled>Preview</button>
          <button onClick={ this.setModeToJsonConsole }>JSON Console</button>
        </div>
      );
    } else if (this.state.mode === 'json_console') {
      return(
        <div>
          <button onClick={ this.setModeToEdit }>Edit</button>
          <button onClick={ this.setModeToPreview }>Preview</button>
          <button disabled>JSON Console</button>
        </div>
      );
    }
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
