var Block = function(params) {
  this.id = Math.random()
  this.parentBlockListId = params.parentBlockListId
  this.content = "I'm block " + this.id
}

Block.prototype = {

  toJson() {
    var json = {
      id: this.id,
      content: this.content
    }

    var childBlockList = this.childBlockList()

    if (childBlockList) {
      json.childBlockList = childBlockList.toJson()
    }

    return json
  },

  childBlockList() {
    BlockListActions.create({ blockId: this.id })

    return BlockListStore.findByBlockId(this.id)
  }

}

module.exports = Block

var BlockListStore = require('../stores/block_list_store')
var BlockListActions = require('../actions/block_list_actions')
