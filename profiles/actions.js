const { Action } = require('inux')

const SET_ONE = Symbol('setOne')
const FETCH_ONE = Symbol('fetchOne')

const setOne = Action(SET_ONE)
const fetchOne = Action(FETCH_ONE)

module.exports = {
  SET_ONE,
  FETCH_ONE,
  setOne,
  fetchOne
}
