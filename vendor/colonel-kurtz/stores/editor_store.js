var merge = require('react/lib/merge')
var Events = require('events')
var Dispatcher = require('../dispatcher')
var Constants = require('../constants/editor_constants')
var Actions = require('../actions/editor_actions')
var _ = require('underscore')

var _editors = []

var EditorStore = merge(Events.EventEmitter.prototype, {

  all() {
    return _editors
  },

  find(id) {
    return _.find(this.all(), function(editor) {
      editor.id() === id
    })
  },

  _create(editor) {
    return _editors.push(editor)
    this.emit(Constants.EDITOR_CREATED)
  }

})

module.exports = EditorStore

Dispatcher.register(function(action) {
  switch (action.type) {
    case Constants.EDITOR_CREATE:
      EditorStore._create(action.editor)
      break
    case Constants.EDITOR_UPDATE:
      // do a thing
      break
    default:
      // do nothing
  }
})
