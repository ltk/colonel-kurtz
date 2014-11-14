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

  findByBlockId(blockId) {
    var blockList = _.find(this.all(), function(blockList) {
      return blockList.blockId === blockId
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

  _create(params) {
    var blockList = new BlockList({ editorId: params.editorId, blockId: params.blockId })
    return _blockLists.push(blockList)
    this.emit(Constants.BLOCK_LIST_CREATED)
  },

  _addBlockToList(block, position) {
    var blockList = this.find(block.parentBlockListId)
    blockList.insertBlock(block, position)
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
        BlockListStore._addBlockToList(action.block, action.position)
        break;
      case Constants.BLOCK_LIST_CREATE:
        BlockListStore._create({ editorId: action.editorId, blockId: action.blockId })
        break
      default:
        // do nothing
    }
  })


})

module.exports = BlockListStore
