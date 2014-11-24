var merge = require('react/lib/merge')
var Events = require('events')
var Dispatcher = require('../dispatcher')
var Constants = require('../constants/block_type_constants')
// var Actions = require('../actions/block_type_actions')
var _ = require('underscore')

var _blockTypes = []

var BlockTypeStore = merge(Events.EventEmitter.prototype, {

  all() {
    return _blockTypes
  },

  find(id) {
    return this._findBy('id', id)
  },

  findByKey(key) {
    return this._findBy('key', key)
  },

  _findBy(property, value) {
    return _.find(this.all(), function(blockType) {
      return blockType[property] === value
    })
  },

  // _create(parentBlockListId) {
  //   var block = new Block({ parentBlockListId: parentBlockListId })
  //   _blocks.push(block)
  //   // this.emit(Constants.BLOCK_CREATED)
  //   return block
  // },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {
      case Constants.BLOCK_TYPE_CREATE:
        // var block = BlockStore._create(action.parentBlockListId)
        // action.block = block
        break
      case Constants.BLOCK_TYPE_UPDATE:
        // do a thing
        break
      default:
        // do nothing
    }
  })

})

module.exports = BlockTypeStore
