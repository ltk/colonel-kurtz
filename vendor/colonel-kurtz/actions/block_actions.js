var Constants  = require('../constants/block_constants')
var Dispatcher = require('../dispatcher')

var BlockActions = {

  create(params) {
    Dispatcher.dispatch({ type: Constants.BLOCK_CREATE, parentBlockListId: params.parentBlockListId, position: params.position })
  },

  update() {
    Dispatcher.dispatch({ type: Constants.BLOCK_UPDATE })
  }

}
module.exports = BlockActions
