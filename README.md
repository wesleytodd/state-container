# State Container

[![NPM Version](https://img.shields.io/npm/v/@wesleytodd/state-container.svg)](https://npmjs.org/package/@wesleytodd/state-container)
[![NPM Downloads](https://img.shields.io/npm/dm/@wesleytodd/state-container.svg)](https://npmjs.org/package/@wesleytodd/state-container)
[![Build Status](https://travis-ci.org/wesleytodd/state-container.svg?branch=master)](https://travis-ci.org/wesleytodd/state-container)
[![js-happiness-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)

A state container for any javascript app.  Unopinionated and minimalistic.

## Usage

```
npm i --save @wesleytodd/state-container
```

```
const createStore = require('@wesleytodd/state-container')

const store = createStore(function reducer (state = 0, action) {
  return state + action.value
}, 1)

store.subscribe((state) => {
  console.log(state)
})

store.dispatch({
  value: 1
})

store.dispatch(Promise.resolve({
  value: 2
}))

store.dispatch((dispatch) => {
  dispatch({
    value: 3
  })
  dispatch({
    value: 4
  })
})

console.log(`Final State: ${store.getState()}`)

/*
2
4
7
11
Final State: 11
*/
```
