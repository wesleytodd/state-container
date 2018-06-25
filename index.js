'use strict'
// vim: set ts=2 sw=2 expandtab:

module.exports = function createStore (reducer, initialState) {
  const listeners = []
  let state = initialState
  let currentReducer = reducer || (state => state)

  function dispatch (action) {
    if (typeof action === 'function') {
      return action(dispatch)
    }
    if (action && typeof action.then === 'function') {
      return action.then(dispatch, dispatch)
    }

    let _s = state
    state = currentReducer(state, action)

    // Call subscribers
    listeners.forEach((listener) => listener(state, _s, action))

    return action
  }

  function subscribe (listener) {
    let subscribed = true
    listeners.push(listener)
    return () => {
      if (!subscribed) {
        return
      }
      subscribed = false
      listeners.splice(listeners.indexOf(listener), 1)
    }
  }

  function getState () {
    return state
  }

  return { dispatch, subscribe, getState }
}
