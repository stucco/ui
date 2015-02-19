var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.edge,
  bindings: {
    'model._id': '[data-hook~=_id]',
    'model.edgeName': '[data-hook~=edgeName]',
    'model.name': '[data-hook~=name]',
    'model._label': '[data-hook~=_label]',
    'model.description': '[data-hook~=description]',
    'model._inV': '[data-hook~=_inV]',
    'model.inVType': '[data-hook~=inVType]',
    'model._outV': '[data-hook~=_outV]',
    'model.outVType': '[data-hook~=outVType]',
    'model.isInEdge': '[data-hook~=isInEdge]',
    'model.nextNodeUrl': {
      type: 'attribute',
      hook: '_label',
      name: 'href'
    },
    'model.adjacentNode.name': '[data-hook~=adjacentNodeName]',
    'model.adjacentNode.description': '[data-hook~=adjacentNodeDesc]',
    'model.adjacentNode.vertexType': '[data-hook~=adjacentNodeVType]'
  },
  initialize: function(spec) {
    // console.log("edge-details spec = " + JSON.stringify(spec));
  }
});
