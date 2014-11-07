var Actions    = require('../constants/block')
var Dispatcher = require('../dispatcher')

module.exports = {

  update() {
    // debugger;
    Dispatcher.dispatch({ type: Actions.UPDATE })
  }

}
