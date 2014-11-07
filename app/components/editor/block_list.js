/** @jsx React.DOM **/
var React = require('react')
var Block = require('./block')
var NewBlock = require('./new_block')
var AddBlock = require('./add_block')

var BlockList = React.createClass({
  blockComponents() {
    var blockSet = this.props.blockSet
    var blocks = blockSet.blocks()
    components = [
      <AddBlock blockSet={ blockSet } position={ 0 } />
    ]

    blocks.forEach(function(block){
      components.push(<Block blockSet={ blockSet } block={ block } />)
      components.push(<AddBlock blockSet={ blockSet } position={ block.position + 1 } />)
    })

    return components
  },

  render() {
    return (
      <ol className="blocks">
        { this.blockComponents() }
     </ol>
    )
  }

})

module.exports = BlockList
