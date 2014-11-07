/**
 * All action types go in here.
 *
 * keyMirror replaces `null` with the string value of the key.
 * This provides a clean way to have unique keys for a given set
 * of constants.
 */

var keyMirror = require('react/lib/keyMirror')

module.exports = keyMirror({

  BLOCK: {
    CHANGE : null,
    UPDATE : null
  },
  BLOCK_SET: {
    CHANGE : null
  }

})
