/** @jsx React.DOM **/
var React = require('react')

var TableOfContentsBlockView = React.createClass({

  nestedBlockSet() {
    return this.props.block.content.blockSet
  },

  nestedBlockTypes() {
    return ['table-of-contents-entry']
  },

  nestedBlockComponents() {
    var blockSet = this.nestedBlockSet()
    var blocks = blockSet.blocks()

    // components.push(<Block blockSet={ blockSet } block={ block } blockTypes={ this.nestedBlockTypes() } />)
    return blocks.map(function(block){
      return <Block blockSet={ blockSet } block={ block } />
    })
  },

  nestedBlockList() {
    if(this.nestedBlockSet()) {
      return(
         <ol className="entries">
           { this.nestedBlockComponents() }
        </ol>
      )
    }
  },

  render() {
    return(
      <li
        key={ this.props.key }>
        <div dangerouslySetInnerHTML={{ __html: this.props.block.content.text }}></div>

        { this.nestedBlockList() }
      </li>
    );
  }
})

module.exports = TableOfContentsBlockView

var Block = require('../../block')
