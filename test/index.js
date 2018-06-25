'use strict'
// vim: set ts=2 sw=2 expandtab:
const {describe, it} = require('mocha')
const assert = require('assert')
const {name: pkgName} = require('../package.json')
const createStore = require('../')

describe(pkgName, () => {
  it('should create an empty store', (done) => {
    const s = createStore()
    assert.equal(s.getState(), undefined)
    s.subscribe(() => {
      assert.equal(s.getState(), undefined)
      done()
    })
    s.dispatch()
  })

  it('should create a store with initial state', (done) => {
    const s = createStore((i) => ++i, 0)
    assert.equal(s.getState(), 0)
    s.subscribe(() => {
      assert.equal(s.getState(), 1)
      done()
    })
    s.dispatch()
  })

  it('should support thunk style action creators', (done) => {
    const s = createStore((state, action) => state + action.value, 0)
    assert.equal(s.getState(), 0)
    s.subscribe(() => {
      assert.equal(s.getState(), 5)
      done()
    })
    s.dispatch(function (dispatch) {
      dispatch({
        value: 5
      })
    })
  })

  it('should support promise style action creators', (done) => {
    const s = createStore((state, action) => state + action.value, 0)
    assert.equal(s.getState(), 0)
    s.subscribe(() => {
      assert.equal(s.getState(), 5)
      done()
    })
    s.dispatch(Promise.resolve({
      value: 5
    }))
  })

  it('should call multiple subscribers', (done) => {
    const s = createStore((state, action) => state + action.value, 0)

    let called = 0
    s.subscribe(() => {
      assert.equal(s.getState(), 5)
      called++
    })

    s.subscribe(() => {
      assert.equal(s.getState(), 5)
      assert.equal(called, 1)
      done()
    })

    s.dispatch(Promise.resolve({
      value: 5
    }))
  })

  it('should support unsubscribing', (done) => {
    const s = createStore((state, action) => state + action.value, 0)

    let called = 0
    let unsub = s.subscribe(() => {
      assert.equal(s.getState(), 5)
      called++
      unsub()
    })

    s.subscribe(() => {
      assert.equal(s.getState(), 5)
      assert.equal(called, 1)
      done()
    })

    s.dispatch(Promise.resolve({
      value: 5
    }))
    s.dispatch(Promise.resolve({
      value: 0
    }))
  })
})
