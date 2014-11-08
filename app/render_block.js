/** @jsx React.DOM **/
var TextBlock = require('./components/editor/blocks/text_block')
var CodeBlock = require('./components/editor/blocks/code_block')
var ImageBlock = require('./components/editor/blocks/image_block')
var StepBlock = require('./components/editor/blocks/step_block')

var renderBlock = function(block) {
  switch (block.type) {
    case 'text':
      return(<TextBlock blockSet={ block.blockSet } block={ block } />)
      break
    case 'code':
      return(<CodeBlock blockSet={ block.blockSet } block={ block } />);
      break
    case 'image':
      return(<ImageBlock blockSet={ block.blockSet } block={ block } />);
      break
    case 'step':
      return(<StepBlock blockSet={ block.blockSet } block={ block } />);
      break
    default:
      return (
        <li className="block">
          <p>Unkown block type.</p>
        </li>
      )
  }
}

module.exports = renderBlock
