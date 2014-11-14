/** @jsx React.DOM **/
var React = require('react')
var ContentEditable = require('../content_editable')
var AddBlock = require('../add_block')
var MoveableBlock = require('../mixins/moveable_block')

var StepBlock = React.createClass({
  mixins: [MoveableBlock],

  typeLabel(){
    return "Step"
  },

  delete() {
    this.props.blockSet.deleteAtPosition(this.props.block.position)
  },

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

  render() {
    return(
      <li className="block" key={ this.props.key }>
        <div className="delete-block" onClick={ this.delete }>Delete</div>
        <span className="block-type-label">{ this.typeLabel() }</span>
        { this.moveComponents() }
        { this.textContent() }
        { this.nestedBlockList() }
      </li>
    );
  }
})

module.exports = StepBlock

var Block = require('../block')
