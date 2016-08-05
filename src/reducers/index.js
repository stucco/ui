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

function report (state = {}, action) {
  switch (action.type) {
    case 'ADD_TO_REPORT':
      var newReport = {}
      newReport[action.report.id] = action.report.xml
      return Object.assign({}, state, newReport)
    case 'GET_REPORT':
      return state
    case 'CLEAR_REPORT':
      return {}
    default:
      return state
  }
}

export default combineReducers({
  vertex,
  report
})
