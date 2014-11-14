/** @jsx React.DOM **/
var React = require('react')
var EditorComponent = require('./editor')
var PreviewerComponent = require('./previewer')

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

  modeSelectionComponent() {
    if (this.state.mode === 'edit') {
      return(
        <div>
          <button disabled>Edit</button>
          <button onClick={ this.setModeToPreview }>Preview</button>
        </div>
      )
    } else if (this.state.mode === 'preview') {
      return(
        <div>
          <button onClick={ this.setModeToEdit }>Edit</button>
          <button disabled>Preview</button>
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
