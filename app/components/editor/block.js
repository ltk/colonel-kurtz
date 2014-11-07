/** @jsx React.DOM **/
var React = require('react')
var NewBlock = require('./new_block')
var AddBlock = require('./add_block')
var ContentEditable = require('./content_editable')

var Block = React.createClass({
  nestedBlockSet() {
    return this.props.block.content.blockSet
  },

  nestedBlockComponents() {
    var blockSet = this.nestedBlockSet()
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

  nestedBlockList() {
    if(this.nestedBlockSet()) {
      return(
         <ol className="blocks">
           { this.nestedBlockComponents() }
        </ol>
      )
    }
  },

  textContent() {
    if (this.props.block.content.text) {
      return <ContentEditable html={ this.props.block.content.text } onChange={ this.onChange } />
    }
  },

  onChange(event) {
    this.props.block.content.text = event.target.value
    this.props.blockSet.notifyChange()
  },

  delete() {
    this.props.blockSet.deleteAtPosition(this.props.block.position)
  },

  render() {
    return (
      <li className="block">
        <div className="delete-block" onClick={ this.delete }>Delete</div>
        <span className="block-type-label">{ this.props.block.type }</span>
        { this.textContent() }
        { this.nestedBlockList() }
      </li>
    )
  }

})

module.exports = Block
