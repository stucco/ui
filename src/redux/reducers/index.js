import { combineReducers } from 'redux'

function vertex (state = {}, action) {
  console.log('in reducer .. with action: ', action)
  switch (action.type) {
    case 'SET_VERTEX':
      state = action.vertex
      console.log('new state: ', state)
      return state
    case 'GET_VERTEX':
      return state
    default:
      return state
  }
}

function edges (state = {}, action) {
  switch (action.type) {
    case 'SET_INEDGES':
      var edges = {}
      edges['inEdges'] = action.inEdges
      return Object.assign({}, state, edges)
    case 'SET_OUTEDGES':
      edges = {}
      edges['outEdges'] = action.outEdges
      return Object.assign({}, state, edges)
    case 'GET_EDGES':
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
  edges,
  report
})
