/** @jsx React.DOM **/
var React      = require('react')
var TextBlock  = require('./blocks/text_block')
var CodeBlock  = require('./blocks/code_block')
var ImageBlock = require('./blocks/image_block')
var StepBlock  = require('./blocks/step_block')

var Block = React.createClass({

  render() {
    switch (this.props.block.type) {
      case 'text':
        return(<TextBlock blockSet={ this.props.blockSet } block={ this.props.block } />)
        break
      case 'code':
        return(<CodeBlock blockSet={ this.props.blockSet } block={ this.props.block } />);
        break
      case 'image':
        return(<ImageBlock blockSet={ this.props.blockSet } block={ this.props.block } />);
        break
      case 'step':
        return(<StepBlock blockSet={ this.props.blockSet } block={ this.props.block } />);
        break
      default:
        return (
          <li className="block">
            <p>Unkown block type.</p>
          </li>
        )
    }
  }

})

module.exports = Block
