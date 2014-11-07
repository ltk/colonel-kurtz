// var merge = require('react/lib/merge')
var emitter = require('events').EventEmitter
var Actions = require('../constants/block')
var BlockActions = require('../actions/block')
var jQuery = require('jquery')
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

BlockSet.prototype.blocks = function() {
  return this._blocks;
}

BlockSet.prototype.toJson = function() {
  return this._blocks.map(this._blockToJson)
}

BlockSet.prototype._blockToJson = function(block) {
  // var clone = deepCopy(block)
  var clone = jQuery.extend(true, {}, block);
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
