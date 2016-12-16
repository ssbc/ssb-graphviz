const { Action } = require('inux')

const SET = Symbol('set')
const SET_HOVER = Symbol('setHover')
const FETCH = Symbol('fetch')
const HOVER = Symbol('hover')

const set = Action(SET)
const setHover = Action(SET_HOVER)
const fetch = Action(FETCH)
const hover = Action(HOVER)

module.exports = {
  SET,
  SET_HOVER,
  FETCH,
  HOVER,
  set,
  setHover,
  fetch,
  hover
}
