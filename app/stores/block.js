var Events     = require('events')
var Dispatcher = require('../dispatcher')
var Actions    = require('../constants/block')
// var BlockSetActions = require('../constants/actions').BLOCK_SET
var Immutable  = require('immutable')
var merge      = require('react/lib/merge')
var BlockSet   = require('./block_set')

var _data = new BlockSet([
  {
    type: 'text',
    content: {
      text: "I'm a text block."
    }
  },
  {
    type: 'code',
    content: {
      text: "function(){ alert('I'm a code block!'); }"
    }
  },
  {
    type: 'step',
    content: {
      text: 'This is a component with nested blocks.',
      blocks: [
        {
          type: 'text',
          content: {
            text: 'Nested text block.'
          }
        },
        {
          type: 'step',
          content: {
            text: 'Such nesting.',
            blocks: [
              {
                type: 'text',
                content: {
                  text: 'Nested text block.',
                  blocks: []
                }
              }
            ]
          }
        }
      ]
    }
  }

])

var _data = new BlockSet([])

// var _data = Immutable.Map({
//   blocks: [
//     {
//       type: 'text',
//       content: "I'm a text block."
//     },
//     {
//       type: 'code',
//       content: "function(){ alert('I'm a code block!'); }"
//     },
//     {
//       type: 'step',
//       content: "This is a step block.",
//       blocks: [
//         {
//           type: 'text',
//           content: "I'm a nested text block."
//         },
//         {
//           type: 'text',
//           content: "I'm another nested text block."
//         }
//       ]
//     }
//   ]
// })

var Block = merge(Events.EventEmitter.prototype, {

  /**
   * Adds an event listener to subscribe to data changes
   */
  onChange(callback) {
    // debugger;
    this.on(Actions.CHANGE, callback)
    // this.on(BlockSetActions.CHANGE, callback)
  },

  /**
   * Removes an event listener on data changes
   */
  offChange(callback) {
    this.removeListener(Actions.CHANGE, callback)
    // this.removeListener(BlockSetActions.CHANGE, callback)
  },

  // all() {
  //   return _data;
  // },

  // toJSON() {
  //   _data
  // },

  getBlockSet() {
    // debugger;
    return _data;
  },

  // add(block, relativePosition, existingBlock) {
  //   var existingBlocks = _data.get('blocks')
  //   // _data = { blocks: existingBlocks.unshift(block) }
  //   _data = Immutable.Map({ blocks: existingBlocks.push(block) })
  //   Block.emit(Actions.CHANGE)
  // }

  /**
   * Returns properties. If given a string KEY, returns the specific value.
   * Otherwise it returns the entire object as JS.
   */
  // get(key) {
  //   return typeof key === 'string' ? _data.get(key) : _data.toJS()
  // },

  /**
   * Sets a given set of properties. If given an object, merge it into the Map.
   * Otherwise set a given PROP string key to a given VALUE.
   *
   * Triggers Bus.publish()
   */
  // set(prop, value) {
  //   _data = typeof prop === 'object' ? _data.merge(prop) : _data.set(prop, value)
  //   Block.emit(Actions.CHANGE)
  // },

  // /**
  //  * Increase the count attribute by one.
  //  */
  // incr() {
  //   Block.set('count', Block.get('count') + 1)
  // }

})

module.exports = Block

Dispatcher.register(function(action) {
  switch (action.type) {
    case Actions.UPDATE:
      // debugger;
      Block.emit(Actions.CHANGE)
      break
    default:
      // do nothing
  }
})
