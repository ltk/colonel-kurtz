var Constants  = require('../constants/block_list_constants')
var Dispatcher = require('../dispatcher')

var BlockListActions = {

  create(params) {
    Dispatcher.dispatch({ type: Constants.BLOCK_LIST_CREATE, editorId: params.editorId, blockId: params.blockId })
  },

  update() {
    Dispatcher.dispatch({ type: Constants.BLOCK_LIST_UPDATE })
  }

}

module.exports = BlockListActions
