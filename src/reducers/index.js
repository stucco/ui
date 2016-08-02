import { combineReducers } from 'redux'

function vertex (state = {}, action) {
  switch (action.type) {
    case 'SET_VERTEX':
      state = action.vertex
      return state
    case 'GET_VERTEX':
      return state
    default:
      return state
  }
}

export default combineReducers({
  vertex
})
