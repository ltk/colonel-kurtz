var merge = require('react/lib/merge')
var Events = require('events')
var Dispatcher = require('../dispatcher')
var Constants = require('../constants/block_list_constants')
var BlockConstants = require('../constants/block_constants')
var Actions = require('../actions/block_list_actions')
var BlockList = require('../models/block_list')
var BlockStore = require('../stores/block_store')
var _ = require('underscore')

var _blockLists = []

var BlockListStore = merge(Events.EventEmitter.prototype, {

  all() {
    return _blockLists
  },

  findByEditorId(editorId) {
    var blockList = _.find(this.all(), function(blockList) {
      return blockList.editorId === editorId
    })

    if (blockList) {
      return blockList
    } else {
      return null
    }
  },

  find(id) {
    var blockList = _.find(this.all(), function(blockList) {
      return blockList.id === id
    })

    if (blockList) {
      return blockList
    } else {
      return null
    }
  },

  _create(editorId) {
    var blockList = new BlockList({ editorId: editorId })
    return _blockLists.push(blockList)
    this.emit(Constants.BLOCK_LIST_CREATED)
  },

  _addBlockToList(block) {
    var blockList = this.find(block.parentBlockListId)
    blockList.addBlock(block)
    this.emit(Constants.BLOCK_LIST_CHANGE)
  },

  onChange(callback) {
    this.on(Constants.BLOCK_LIST_CHANGE, callback)
  },

  offChange(callback) {
    this.removeListener(Constants.BLOCK_LIST_CHANGE, callback)
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {
      case BlockConstants.BLOCK_CREATE:
        Dispatcher.waitFor([BlockStore.dispatchToken])
        BlockListStore._addBlockToList(action.block)
        break;
      case Constants.BLOCK_LIST_CREATE:
        BlockListStore._create(action.editorId)
        break
      default:
        // do nothing
    }
  })


})

module.exports = BlockListStore
