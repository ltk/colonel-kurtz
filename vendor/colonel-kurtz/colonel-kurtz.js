/** @jsx React.DOM **/
var React = require('react')
var App = require('./components/app')
var BlockListStore = require('./stores/block_list_store')
var BlockListActions = require('./actions/block_list_actions')

// API:
// var editor = ColonelKurtz.new(document.querySelector('#app'), { some: 'json'} )
// editor.onChange(function(editor){
//   document.querySelector('#app').innerHTML = editor.toHtml()
// })
// editor.render()

var _instances = []

var ColonelKurtz = function(dom_element, initJson) {
  this.id = Math.random()
  this._callbacks = []
  this._dom_element = dom_element
  this._initJson = initJson


  // Emit newEditor action, including editor (or editor ID)

  _instances.push(this)

  BlockListActions.create({ editorId: this.id })
}

ColonelKurtz.prototype = {

  onChange(callback) {
    return this._callbacks.push(callback)
  },

  _runCallbacks() {
    this._callbacks.forEach(function(callback){
      callback(this)
    })
  },

  render() {
    return React.renderComponent(this.rootComponent(), this.getDomElement())
  },

  toJson() {
    return BlockListStore.rootList().asJson()
  },

  toHtml() {
    return React.renderComponentToStaticMarkup(this.rootComponent())
  },

  getReact() {
    return React
  },

  getInitJson() {
    return this._initJson
  },

  getDomElement() {
    return this._dom_element
  },

  rootComponent() {
    return <App editor={ this } />
  },

  rootBlockListId() {
    return this.rootBlockList().id
  },

  rootBlockList() {
    return BlockListStore.findByEditorId(this.id)
  }

}

module.exports = ColonelKurtz
