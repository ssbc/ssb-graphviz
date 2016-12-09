const { Action } = require('inux')

const SET = Symbol('set')
const SET_FOCUS = Symbol('setFocus')
const FETCH = Symbol('fetch')
const FOCUS = Symbol('focus')

const set = Action(SET)
const setFocus = Action(SET_FOCUS)
const fetch = Action(FETCH)
const focus = Action(FOCUS)

module.exports = {
  SET,
  SET_FOCUS,
  FETCH,
  FOCUS,
  set,
  setFocus,
  fetch,
  focus
}
