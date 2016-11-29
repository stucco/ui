export function ADD_TO_REPORT (xml, id) {
  return {
    type: 'ADD_TO_REPORT',
    report: {
      xml: xml,
      id: id
    }
  }
}

export function CLEAR_REPORT () {
  return {
    type: 'CLEAR_REPORT'
  }
}

export function SET_VERTEX (vertex) {
  return {
    type: 'SET_VERTEX',
    vertex: {
      vertex
    }
  }
}
