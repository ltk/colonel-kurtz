var _blockTypes = {}

var BlockRegistry = {

  registerType(type, label) {
    return this.register(
      type,
      label,
      require('./' + type + '/editor'),
      require('./' + type + '/view'),
      require('./' + type + '/default_content')
    )
  },

  register(key, label, editorComponent, viewComponent, defaultContent) {
    return _blockTypes[key] = {
      key: key,
      label: label,
      editorComponent: editorComponent,
      viewComponent: viewComponent,
      defaultContent: defaultContent
    }
  },

  allKeys() {
    var keys = []

    for (var key in _blockTypes) {
      if (_blockTypes.hasOwnProperty(key)) {
        keys.push(key)
      }
    }

    return keys
  },

  all() {
    return _blockTypes
  },

  find(key) {
    return _blockTypes[key]
  }

}

// var fs = require('fs')
// var blocksDir = './app/components/editor/blocks/'
// var types = []

// fs.readdir(blocksDir,function(err,files){
//     if(err) throw err;
//     files.forEach(function(file){
//       var isDirectory = fs.lstatSync(blocksDir + file).isDirectory()
//       if (isDirectory) {
//         types.push(file)
//       }
//     });
//  });

// var types = ['text', 'rich_text']

// types.forEach(function(type){
//   BlockRegistry.register(type, type, require('./' + type + '/editor'), require('./' + type + '/view'), require('./' + type + '/default_content'))
// })

BlockRegistry.registerType('text', 'Text')
BlockRegistry.registerType('rich_text', 'Formatted Text')
BlockRegistry.registerType('video', 'YouTube Video')
BlockRegistry.registerType('table_of_contents', 'Table of Contents')

module.exports = BlockRegistry


