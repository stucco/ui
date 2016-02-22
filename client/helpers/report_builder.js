/* normalizing namespaces */
var stix_elements = {
  "et:Exploit_Target": {
    "element": {
      "name": "stixCommon:Exploit_Target",
      "ns": "http://stix.mitre.org/common-1"
    },
    "parent": {
      "name": "stix:Exploit_Targets",
      "ns": "http://stix.mitre.org/stix-1"
    }    
  },
  "cybox:Observable": {
    "element": {
      "name": "cybox:Observable",
      "ns": "http://cybox.mitre.org/cybox-2"
    },
    "parent": {
      "name": "stix:Observables",
      "ns": "http://stix.mitre.org/stix-1"
    }    
  },
  "coa:Course_Of_Action": {
    "element": {
      "name": "stix:Course_Of_Action",
      "ns": "http://stix.mitre.org/stix-1"
    },
    "parent": {
      "name": "stix:Courses_Of_Action",
      "ns": "http://stix.mitre.org/stix-1"
    }    
  },
  "indicator:Indicator": {
    "element": {
      "name": "stix:Indicator",
      "ns": "http://stix.mitre.org/stix-1"
    },
    "parent": {
      "name": "stix:Indicators",
      "ns": "http://stix.mitre.org/stix-1"
    }    
  },
  "ttp:TTP": {
    "element": {
      "name": "stix:TTP",
      "ns": "http://stix.mitre.org/stix-1"
    },
    "parent": {
      "name": "stix:TTPs",
      "ns": "http://stix.mitre.org/stix-1"
    }    
  },
  "incident:Incident": {
    "element": {
      "name": "stix:Incident",
      "ns": "http://stix.mitre.org/stix-1"
    },
    "parent": {
      "name": "stix:Incidents",
      "ns": "http://stix.mitre.org/stix-1"
    }
  },
  "campaign:Campaign": {
    "element": {
      "name": "stix:Campaign",
      "ns": "http://stix.mitre.org/stix-1"
    },
    "parent": {
      "name": "stix:Campaigns",
      "ns": "http://stix.mitre.org/stix-1"
    }
  },
  "ta:Threat_Actor": {
    "element": {
      "name": "stix:Threat_Actor",
      "ns": "http://stix.mitre.org/stix-1"
    },
    "parent" : {
      "name": "stix:Threat_Actors",
      "ns": "http://stix.mitre.org/stix-1"
    }
  }
};    

exports.report = function() {
  var parser = new DOMParser();
  var doc;
  var report = window.localStorage.getItem("report");

  /* if there were no new verts added since the last report building, then just send what is already built */
  if (window.localStorage.getItem("stucco_report_names") === false) {
    return report;
  }

  /* if report already exist, and we just need to edit it, then parsing what we already have, and addint new verts(elements) to it */
  if (report === null) {
    doc = document.implementation.createDocument("http://stix.mitre.org/stix-1", "stix:STIX_Package", null);
  } else {
    doc = parser.parseFromString(report, 'text/xml');
  }
  var root = doc.documentElement;

  if (window.localStorage.getItem("stucco_report_names") === null) {
    return report;
  }

  /* extracting list on element's names, parsing it, traversing the list and adding new elements to our report */
  var stucco_report_names = window.localStorage.getItem("stucco_report_names").split("##stucco##");
  /* and cleaning local storage right away ... */
  window.localStorage.removeItem("stucco_report_names");
  for (var i = 0; i < stucco_report_names.length; i++) {
    var newElementName = stucco_report_names[i];
    var elementString = window.localStorage.getItem(newElementName);
    window.localStorage.removeItem(newElementName); //cleaning memory right away
    var element = parser.parseFromString(elementString, 'text/xml').documentElement;

    var name = element.nodeName;
    var newElement = doc.createElementNS(stix_elements[name].element.ns, stix_elements[name].element.name);

    var attrs = element.attributes;
    for (var j = 0; j < attrs.length; j++) {
        var attr = attrs[j];
        newElement.setAttributeNS(attr.namespaceURI, attr.nodeName, attr.value);
    }
    var childNodes = element.childNodes;
    for (var j = 0; j < childNodes.length; j++) {
      var child = childNodes[j].cloneNode(true);
      newElement.appendChild(child);
    }

    /* checking if proper parent element exists in a report, then just retrievign it, if not, adding it */
    var parent = root.getElementsByTagName(stix_elements[name].parent.name.split(":")[1])[0];
    if (parent === null || parent === undefined) {
      parent = doc.createElementNS(stix_elements[name].parent.ns, stix_elements[name].parent.name);
    }
    parent.appendChild(newElement);
    root.appendChild(parent);

    /* traversing attributes of new element, looking for the one with prefix xmlns (xmlns:attrName, except xmlns:xsi)
       removing it, and addint to the root ... not sure why, but stix will not render other wise, 
       even if element is totally valid */
    var nodeIterator = doc.createNodeIterator(newElement, NodeFilter.SHOW_ELEMENT);
    while (var currNode = nodeIterator.nextNode()) {
      var attrs = currNode.attributes;
      for (var j = 0; j < attrs.length; j++) {
        var attr = attrs[j];
        if (attr.prefix === "xmlns") {
          if (attr.localName !== "xsi") {
            root.setAttributeNS(attr.namespaceURI, attr.nodeName, attr.value);
            currNode.removeAttributeNode(attr);
            j--;
          }
        }
      }
    }
  }

  return new XMLSerializer().serializeToString(root);
};











