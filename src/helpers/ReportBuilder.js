/* normalizing namespaces */
var stixElements = {
  'cybox:Observable': {
    'element': {
      'name': 'cybox:Observable',
      'ns': 'http://cybox.mitre.org/cybox-2'
    },
    'parent': {
      'name': 'stix:Observables',
      'ns': 'http://stix.mitre.org/stix-1'
    }
  },
  'indicator:Indicator': {
    'element': {
      'name': 'stix:Indicator',
      'ns': 'http://stix.mitre.org/stix-1'
    },
    'parent': {
      'name': 'stix:Indicators',
      'ns': 'http://stix.mitre.org/stix-1'
    }
  },
  'ttp:TTP': {
    'element': {
      'name': 'stix:TTP',
      'ns': 'http://stix.mitre.org/stix-1'
    },
    'parent': {
      'name': 'stix:TTPs',
      'ns': 'http://stix.mitre.org/stix-1'
    }
  },
  'et:Exploit_Target': {
    'element': {
      'name': 'stixCommon:Exploit_Target',
      'ns': 'http://stix.mitre.org/common-1'
    },
    'parent': {
      'name': 'stix:Exploit_Targets',
      'ns': 'http://stix.mitre.org/stix-1'
    }
  },
  'incident:Incident': {
    'element': {
      'name': 'stix:Incident',
      'ns': 'http://stix.mitre.org/stix-1'
    },
    'parent': {
      'name': 'stix:Incidents',
      'ns': 'http://stix.mitre.org/stix-1'
    }
  },
  'coa:CourseOfAction': {
    'element': {
      'name': 'stix:Course_Of_Action',
      'ns': 'http://stix.mitre.org/stix-1'
    },
    'parent': {
      'name': 'stix:Courses_Of_Action',
      'ns': 'http://stix.mitre.org/stix-1'
    }
  },
  'campaign:Campaign': {
    'element': {
      'name': 'stix:Campaign',
      'ns': 'http://stix.mitre.org/stix-1'
    },
    'parent': {
      'name': 'stix:Campaigns',
      'ns': 'http://stix.mitre.org/stix-1'
    }
  },
  'ta:ThreatActor': {
    'element': {
      'name': 'stix:Threat_Actor',
      'ns': 'http://stix.mitre.org/stix-1'
    },
    'parent': {
      'name': 'stix:Threat_Actors',
      'ns': 'http://stix.mitre.org/stix-1'
    }
  }
}

var elementSequence = {
  'stix:Observables': 0,
  'stix:Indicators': 1,
  'stix:TTPs': 2,
  'stix:Exploit_Targets': 3,
  'stix:Incidents': 4,
  'stix:Courses_Of_Action': 5,
  'stix:Campaigns': 6,
  'stix:Threat_Actors': 7
}

export function buildReport (reportElements) {
  var doc = document.implementation.createDocument('http://stix.mitre.org/stix-1', 'stix:STIX_Package', null)
  var root = doc.documentElement
  for (var i in reportElements) {
    var parser = new DOMParser()
    var element = parser.parseFromString(reportElements[i], 'text/xml').documentElement
    var name = element.nodeName
    var newElement = doc.createElementNS(stixElements[name].element.ns, stixElements[name].element.name)
    // copying attributes
    var attrs = element.attributes
    for (var j = 0; j < attrs.length; j++) {
      var attr = attrs[j]
      newElement.setAttributeNS(attr.namespaceURI, attr.nodeName, attr.value)
    }

    var children = element.children
    for (j = 0; j < children.length; j++) {
      var child = children[j].cloneNode(true)
      newElement.appendChild(child)
    }
    /* checking if proper parent element exists in a report, then just appending to it, if not, creating and adding it */
    var parent = root.getElementsByTagName(stixElements[name].parent.name.split(':')[1])[0]
    if (parent === null || parent === undefined) {
      parent = doc.createElementNS(stixElements[name].parent.ns, stixElements[name].parent.name)
      parent.appendChild(newElement)
      // making sure to insert it in order indicated by index object, or stix will invalidate it
      name = parent.nodeName
      var parentIndex = elementSequence[name]
      children = root.children
      var length = children.length
      if (length === 0) {
        root.appendChild(parent)
      } else {
        for (j = 0; j < length; j++) {
          name = children[j].nodeName
          var childIndex = elementSequence[name]
          if (childIndex < parentIndex) {
            if (j === (length - 1)) {
              root.appendChild(parent)
              break
            } else {
              continue
            }
          }
          root.insertBefore(parent, children[j])
          break
        }
      }
    } else {
      parent.appendChild(newElement)
    }

    /* traversing attributes of new element, looking for the one with prefix xmlns (xmlns:attrName, except xmlns:xsi)
   removing it, and addint to the root ... not sure why, but stix will not render other wise,
   even if element is totally valid */
    var nodeIterator = doc.createNodeIterator(newElement, NodeFilter.SHOW_ELEMENT)
    var currNode = nodeIterator.nextNode()
    while (currNode) {
      attrs = currNode.attributes
      for (j = 0; j < attrs.length; j++) {
        attr = attrs[j]
        if (attr.prefix === 'xmlns') {
          if (attr.localName !== 'xsi') {
            root.setAttributeNS(attr.namespaceURI, attr.nodeName, attr.value)
            currNode.removeAttributeNode(attr)
            j--
          }
        }
      }
      currNode = nodeIterator.nextNode()
    }
  }
  var newReport = new XMLSerializer().serializeToString(root)
  return newReport
}

