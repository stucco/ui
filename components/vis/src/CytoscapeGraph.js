import React from 'react'

import history from '../../../core/history'

import cytoscape from 'cytoscape'

const malware = {
  data: { id: "Malware", name: "Malware", parent: "ttp" },
  renderedPosition: { x: -45, y: -20 },
  labelValign: "Malware",
  style: {
    "backgroundImage": "./images/ttp.hover.png"
  }
}
 
const exploit = {
  data: { id: "Exploit", name: "Exploit", parent: "ttp"  },
  renderedPosition: { "x": -45, "y": 20 },
  labelValign: "Exploit", 
  style: {
    backgroundImage: "./images/ttp.hover.png"
  }
}

const vulnerability = {
  data: { id: "Vulnerability", name: "Vulnerability", parent: "et" },
  renderedPosition: { x: -15, y: -20 },
  labelValign: "Vulnerability",
  style: {
    "background-image": "./images/circleNode.hover.png"
  }
}

const weakness = {
  data: { id: "Weakness", name: "Weakness", parent: "et" },
  renderedPosition: { x: -15, y: 20 },
  labelValign: "Weakness",
  style: {
    "background-image": "./images/circleNode.hover.png"
  }
}

const ip = {
  data: { id: "IP", name: "IP", parent: "observable" },
  renderedPosition: { x: 105, y: -20 },
  labelValign: "IP",
  style: {
    "background-image": "./images/observable.hover.png"
  }
}

const addressRange = {
  data: { id: "AddressRange", name: "Address Range", parent: "observable" },
  renderedPosition: { x: 105, y: 20 },
  labelValign: "Address Range",
  style: {
   "background-image": "./images/observable.hover.png"
  }
}

var cy = null;

class CytoscapeGraph extends React.Component {
  constructor(props) {
    super(props)
    let elements = this.props.graph.elements
    let layout = this.props.graph.layout
    let style = this.props.graph.style
    this.state = {
      elements: elements,
      layout: layout,
      style: style,
      ttpClicked: false,
      exploitTargetClicked: false,
      observableClicked: false
    }

    this.updateGraph = this.updateGraph.bind(this)
    this.updateOntology = this.updateOntology.bind(this)
    this.addElements = this.addElements.bind(this)
    this.removeElements = this.removeElements.bind(this)
    this.transition = this.transition.bind(this)
  }

  componentDidMount () {
    this.updateGraph()
    this.unableOntologyFeatures()
  } 

  shouldComponentUpdate(nextProps, nextState) {
    this.updateGraph()
    return true
  }

  componentWillUnmount() {
    cy.destroy()
  }

  updateGraph() {
    cy = cytoscape({
      container: document.getElementById('cy'),
      elements: this.state.elements,
      layout: this.state.layout,
      style: this.state.style
    })
    cy.zoomingEnabled(false);
    cy.on('click', 'node', this.updateOntology);
  }

  updateOntology(evt) {
    evt.preventDefault();
    switch (evt.cyTarget.id()) {
      case 'TTP':
        if (this.state.ttpClicked === false) {
          this.addElements(malware, exploit, "ttpClicked"); 
        } else {
          this.transition(evt.cyTarget.id());
        }
        break;
      case 'Exploit_Target':
        if (this.state.exploitTargetClicked === false) {
          this.addElements(vulnerability, weakness, "exploitTargetClicked"); 
        } else {
          this.transition("Exploit_Target");
        }
        break;
      case 'Observable':
        if (this.state.observableClicked === false) {
          this.addElements(ip, addressRange, "observableClicked"); 
        } else {
          this.transition(evt.cyTarget.id());
        }
        break;
      default:
        this.transition(evt.cyTarget.id());
        break;
    }
  }

  transition (vertexType) {
    let url = encodeURI("/resultslist/search/vertexType=" + vertexType + "&page=0&pageSize=20")
    history.push({ pathname: url });
  }

  addElements (element1, element2, clicked) {
    let elements = this.state.elements
    elements.push(element1)
    elements.push(element2)
    let state = {
      elements: elements
    }
    state[clicked] = true

    this.setState(state)
  }

  removeElements (element1, element2, clicked) {
    let elements = this.state.elements
    let index = elements.indexOf(element1)
    if (index > -1) {
      elements.splice(index, 1)
    }
    index = elements.indexOf(element2)
    if (index > -1) {
      elements.splice(index, 1)
    }

    let state = {
      elements: elements
    }
    state[clicked] = false

    this.setState(state)
  }

  render () {

    var cyStyle = {
      width: "100%",
      height: "30%",
      position: "absolute",
      content: "data(name)",
      align: "center"
    }
    return (
      <div>
        <div style={cyStyle} id='cy' />
      </div>
    ) 
  }
}

CytoscapeGraph.propTypes = {
  graph: React.PropTypes.object
}

export default CytoscapeGraph
 