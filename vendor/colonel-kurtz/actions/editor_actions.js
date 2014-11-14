var Constants  = require('../constants/editor_constants')
var Dispatcher = require('../dispatcher')

var EditorActions = {

  update() {
    Dispatcher.dispatch({ type: Constants.EDITOR_UPDATE })
  }

}

module.exports = EditorActions
