var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.edge,
  bindings: {
    'model._id': '[data-hook~=_id]',
    'model.edgeName': '[data-hook~=edgeName]',
    'model._label': '[data-hook~=_label]',
    'model.description': '[data-hook~=description]',
    'model._inV': '[data-hook~=_inV]',
    'model.inVType': '[data-hook~=inVType]',
    'model._outV': '[data-hook~=_outV]',
    'model.outVType': '[data-hook~=outVType]',
    'model.nextNodeUrl': {
      type: 'attribute',
      hook: 'edgeName',
      name: 'href'
    }
  },
  initialize: function(spec) {
    this.model.currentNodeId = spec.currentNodeId;
  }
});
