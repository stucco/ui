var pretty_data  = require('pretty-data');

/* normalizing namespaces */
var stix_elements = {
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
  "coa:CourseOfAction": {
    "element": {
      "name": "stix:Course_Of_Action",
      "ns": "http://stix.mitre.org/stix-1"
    },
    "parent": {
      "name": "stix:Courses_Of_Action",
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
  "ta:ThreatActor": {
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

var element_sequence = {
  "stix:Observables": 0,
  "stix:Indicators": 1,
  "stix:TTPs": 2,
  "stix:Exploit_Targets": 3,
  "stix:Incidents": 4,
  "stix:Courses_Of_Action": 5,
  "stix:Campaigns": 6,
  "stix:Threat_Actors": 7
}

exports.report = function() {
  try {
    var parser = new DOMParser();
    var doc;
    var report = window.localStorage.getItem("report");

    if (window.localStorage.getItem("index") !== null) {
      /* if report already exist, and we just need to edit it, then parsing what we already have, and adding new verts(elements) to it */
      if (report === null) {
        doc = document.implementation.createDocument("http://stix.mitre.org/stix-1", "stix:STIX_Package", null);
      } else {
        doc = parser.parseFromString(report, 'text/xml');
      }
      var root = doc.documentElement;

      var index = Number(window.localStorage.getItem("index"));
      for (var i = 0; i <= index; i++) {
        var key = window.localStorage.getItem(i);
        var elementString = window.localStorage.getItem(key);
        // indicates that item is in a report
        if (elementString === 'defined') {
          continue;
        }
        // if item is not in a report, retrieving it, and marking as 'defined'
        window.localStorage.setItem(key, "defined"); 
      //  window.localStorage.removeItem(key); //cleaning memory right away

        var element = parser.parseFromString(elementString, 'text/xml').documentElement;

        var name = element.nodeName;
        var newElement = doc.createElementNS(stix_elements[name].element.ns, stix_elements[name].element.name);

        // copying attributes
        var attrs = element.attributes;
        for (var j = 0; j < attrs.length; j++) {
            var attr = attrs[j];
            newElement.setAttributeNS(attr.namespaceURI, attr.nodeName, attr.value);
        }

        // copying child nodes
        var children = element.children;
        for (var j = 0; j < children.length; j++) {
          var child = children[j].cloneNode(true);
          newElement.appendChild(child);
        }



        /* checking if proper parent element exists in a report, then just appending to it, if not, creating and adding it */
        var parent = root.getElementsByTagName(stix_elements[name].parent.name.split(":")[1])[0];
        if (parent === null || parent === undefined) {
          parent = doc.createElementNS(stix_elements[name].parent.ns, stix_elements[name].parent.name);
          parent.appendChild(newElement);
          // making sure to insert it in order indicated by index object, or stix will invalidate it
          name = parent.nodeName;
          var parentIndex = element_sequence[name];
          var children = root.children;
          var length = children.length;
          if (length === 0) {
            root.appendChild(parent);
          } else {
            for (var j = 0; j < length; j++) {
              name = children[j].nodeName;
              var childIndex = element_sequence[name];
              if (childIndex < parentIndex) {
                if (j === (length - 1)) {
                  root.appendChild(parent);
                  break;
                } else {
                  continue;
                }
              } 
              root.insertBefore(parent, children[j]);
              break;
            }
          }
        } else {
          parent.appendChild(newElement);
        }
        /* traversing attributes of new element, looking for the one with prefix xmlns (xmlns:attrName, except xmlns:xsi)
           removing it, and addint to the root ... not sure why, but stix will not render other wise, 
           even if element is totally valid */
        var nodeIterator = doc.createNodeIterator(newElement, NodeFilter.SHOW_ELEMENT);
        while (currNode = nodeIterator.nextNode()) {
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
      var newReport = new XMLSerializer().serializeToString(root);
      return pretty_data.pd.xml(newReport);
    } else {
      return report;
    }
  } catch (e) {
     alert("ERROR occurred during report building!");
     console.error(e);
     window.localStorage.clear();
  }
};











