var Block = function(params) {
  this.id = Math.random()
  this.parentBlockListId = params.parentBlockListId
  this.content = "I'm block " + this.id
}

Block.prototype = {

}

module.exports = Block
