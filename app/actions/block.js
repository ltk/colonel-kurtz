var Actions    = require('../constants/block')
var Dispatcher = require('../dispatcher')

module.exports = {

  update() {
    Dispatcher.dispatch({ type: Actions.UPDATE })
  }

}
