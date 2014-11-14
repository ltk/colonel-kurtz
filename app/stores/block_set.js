// var merge = require('react/lib/merge')
var emitter = require('events').EventEmitter
var Actions = require('../constants/block')
var BlockActions = require('../actions/block')
var _ = require('underscore')
// var BlockStore = require('./block')

var BlockSet = function(blocks) {
  // Accepts an array of positionless blocks
  // [
  //   {
  //     type: 'text',
  //     content: {
  //       text: 'Wassup!'
  //     }
  //   },
  //   {
  //     type: 'text',
  //     content: {
  //       blocks: [
  //         {
  //           type: 'markdown',
  //           content: {
  //             markdown: '# OHAI'
  //           }
  //         }
  //       ]
  //     }
  //   }
  // ]
  var blockCounter = 0
  var blockSet = this

  blocks.forEach(function(block){
    // Convert nested blocks to BlockSet
    if (block.content.blocks) {
      block.content.blockSet = new BlockSet(block.content.blocks)
    }

    // Add reference to containing blockset
    block.blockSet = blockSet

    // Add position
    block.position = blockCounter
    blockCounter += 1
  });

  this._blocks = blocks
};

// var BlockSet = merge(Events.EventEmitter.prototype, {

//   constructor(blocks) {
//     var blockCounter = 0
//     var blockSet = this

//     blocks.forEach(function(block){
//       // Convert nested blocks to BlockSet
//       if (block.content.blocks) {
//         block.content.blockSet = new BlockSet(block.content.blocks)
//       }

//       // Add reference to containing blockset
//       block.blockSet = blockSet

//       // Add position
//       block.position = blockCounter
//       blockCounter += 1
//     });

//     this._blocks = blocks
//   },

//   // onChange(callback) {
//   //   this.on(Actions.CHANGE, callback)
//   // },

//   // offChange(callback) {
//   //   this.removeListener(Actions.CHANGE, callback)
//   // },

//   blocks() {
//     return this._blocks;
//   },

//   insertBlockAt(block, position) {
//     var newBlock = { type: 'text' }
//     this._incrementBlockPositionsAfter(position);
//     newBlock.position = position
//     this._blocks.unshift(newBlock)
//     this._sortBlocksByPosition();
//     BlockStore.emit(Actions.CHANGE)
//     return this.blocks()
//   },

//   _incrementBlockPositionsAfter(position) {
//     this._blocks.forEach(function(block){
//       if (block.position >= position) {
//         block.position += 1
//       }
//     })
//   },

//   _sortBlocksByPosition() {
//     this._blocks.sort(this._sortByPosition)
//   },

//   _sortByPosition(a, b) {
//     if (a.position < b.position) {
//       return -1
//     }

//     if (a.position > b.position) {
//       return 1
//     }

//     return 0
//   }

// })

BlockSet.prototype.isBlockSet = true

BlockSet.deepCloneNonBlockSets = function(obj) {
  var depth = 5
  if (!obj || (typeof obj !== 'object')) return obj
  else if (_.isString(obj)) return String.prototype.slice.call(obj)
  else if (_.isDate(obj)) return new Date(obj.valueOf())
  else if (_.isFunction(obj.clone)) return obj.clone()
  var clone
  if (_.isArray(obj)) clone = Array.prototype.slice.call(obj)
  else if (obj.constructor!=={}.constructor) return obj
  else clone = _.extend({}, obj)
  if (!_.isUndefined(depth) && (depth > 0)) {
    for (var key in clone) {
      if (clone[key].isBlockSet) {
        delete clone[key]
      } else {
        clone[key] = BlockSet.deepCloneNonBlockSets(clone[key], depth-1)
      }
    }
  }

  return clone
}

BlockSet.prototype.maxIndex = function() {
  return _.max(this._blocks.map(function(block){ return block.position }))
}

BlockSet.prototype.minIndex = function() {
  return _.min(this._blocks.map(function(block){ return block.position }))
}

BlockSet.prototype.blocks = function() {
  return this._blocks;
}

BlockSet.prototype.toJson = function() {
  return this._blocks.map(this._blockToJson)
}

BlockSet.prototype._blockToJson = function(block) {
  var clone = BlockSet.deepCloneNonBlockSets(block)

  if (clone.content.blockSet) {
    clone.content.blocks = clone.content.blockSet.toJson()
    delete clone.content.blockSet
  }

  return clone
}

BlockSet.prototype.insertBlockAt = function(block, position) {
  this._incrementBlockPositionsAfter(position)
  block.position = position
  this._blocks.unshift(block)
  this._sortBlocksByPosition()
  BlockActions.update()
}

BlockSet.prototype.positionOf = function(block) {
  return this._blocks.indexOf(block)
}

BlockSet.prototype.moveBlockTo = function(block, newPosition) {
  var originalPosition = this.positionOf(block)
  this.deleteAtPosition(originalPosition)
  this.insertBlockAt(block, newPosition)
  this._sortBlocksByPosition()
  BlockActions.update()
}

BlockSet.prototype.deleteAtPosition = function(position) {
  var blocks = this._blocks
  this._blocks.forEach(function(block) {
    if (block.position > position) {
      block.position -= 1
    }

    if (block.position === position) {
      var removalIndex = blocks.indexOf(block)
      blocks.splice(removalIndex, 1)
    }
  })

  this._sortBlocksByPosition()
  BlockActions.update()
}

BlockSet.prototype.notifyChange = function() {
  BlockActions.update()
}

BlockSet.prototype._incrementBlockPositionsAfter = function(position) {
  this._blocks.forEach(function(block){
    if (block.position >= position) {

      block.position += 1
    }
  })
}

BlockSet.prototype._sortBlocksByPosition = function() {
  this._blocks.sort(this._sortByPosition)
  this._resetPositions()
}

BlockSet.prototype._resetPositions = function() {
  var counter = 0

  this._blocks.map(function(block){
    block.position = counter
    counter += 1
  })
}

BlockSet.prototype._sortByPosition = function(a, b) {
  if (a.position < b.position) {
    return -1
  }

  if (a.position > b.position) {
    return 1
  }

  return 0
}

module.exports = BlockSet
