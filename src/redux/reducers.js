import { combineReducers } from 'redux'

const user = (state = null) => state

const cars = (state = []) => state

export default combineReducers({ user, cars })