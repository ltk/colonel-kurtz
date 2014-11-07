jest.dontMock('../counter')
jest.dontMock('events')

describe('Store - Counter', function() {
  var Counter

  beforeEach(function() {
    Counter = require('../counter')
  })

  it ('can set properties with string keys', function() {
    Counter.set('foo', 'bar')
    expect(Counter.get('foo')).toEqual('bar')
  })

  it ('publishes an event when a property is set', function() {
    var mock = jest.genMockFunction()

    Counter.onChange(mock)

    Counter.set('foo', 'bar')

    expect(mock).toBeCalled()
  })

  it ('can set properties by merging objects', function() {
    Counter.set({ 'foo': 'baz' })
    expect(Counter.get('foo')).toEqual('baz')
  })

  it ('changed data returns different objects', function() {
    var old = Counter.get()

    Counter.set({ 'foo': 'baz' })

    expect(Counter.get()).not.toEqual(old)
  })

  it ('can increment its count property', function() {
    var current = Counter.get('count')

    Counter.incr()

    expect(Counter.get('count')).toEqual(current + 1)
  })

})
