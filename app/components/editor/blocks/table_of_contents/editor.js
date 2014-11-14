/** @jsx React.DOM **/
var React = require('react')
var ContentEditable = require('../../content_editable')
var BlockMixin = require('../../mixins/block')
var MoveableBlock = require('../../mixins/moveable_block')
var DeletableBlock = require('../../mixins/deletable_block')

var TableOfContentsBlockEditor = React.createClass({
  mixins: [
    BlockMixin,
    MoveableBlock,
    DeletableBlock
  ],

  nestedBlockSet() {
    return this.props.block.content.blockSet
  },

  nestedBlockTypes() {
    return ['table-of-contents-entry']
  },

  nestedBlockComponents() {
    var addBlockComponent = this.props.addBlockComponent
    var blockComponent = require('../../block')
    var blockSet = this.nestedBlockSet()
    var blocks = blockSet.blocks()


    components = [
      <addBlockComponent blockSet={ blockSet } position={ 0 } />
    ]

    blocks.forEach(function(block){
      components.push(<blockComponent blockSet={ blockSet } block={ block } />)
      components.push(<addBlockComponent blockSet={ blockSet } position={ block.position + 1 } />)
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
        { this.deleteButton() }
        { this.typeLabel() }
        { this.moveButtons() }

        { this.textContent() }
        { this.nestedBlockList() }
      </li>
    );
  }
})

module.exports = TableOfContentsBlockEditor
