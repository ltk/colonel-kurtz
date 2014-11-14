var merge = require('react/lib/merge')
var Events = require('events')
var Dispatcher = require('../dispatcher')
var Constants = require('../constants/block_constants')
var Actions = require('../actions/block_actions')
var BlockListActions = require('../actions/block_list_actions')
var Block = require('../models/block')
var _ = require('underscore')

var _blocks = []

var BlockStore = merge(Events.EventEmitter.prototype, {

  all() {
    return _blocks
  },

  find(id) {
    return _.find(this.all(), function(block) {
      return block.id === id
    })
  },

  _create(parentBlockListId) {
    var block = new Block({ parentBlockListId: parentBlockListId })
    _blocks.push(block)
    this.emit(Constants.BLOCK_CREATED)
    return block
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {
      case Constants.BLOCK_CREATE:
        var block = BlockStore._create(action.parentBlockListId)
        action.block = block
        break
      case Constants.BLOCK_UPDATE:
        // do a thing
        break
      default:
        // do nothing
    }
  })

})

module.exports = BlockStore