var BlockList = function(params) {
  this.editorId = params.editorId
  this.blockId = params.blockId
  this.id = Math.random()
  this._blockIds = []
}

BlockList.prototype = {

  blockIds() {
    return this._blockIds
  },

  addBlock(block) {
    this._blockIds.push(block.id)
  }


}

module.exports = BlockList
