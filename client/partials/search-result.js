var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.result,
  bindings: {
    'model._id': '[data-hook~=_id]',
    'model.name': '[data-hook~=name]',
    'model.vertexType': '[data-hook~=vertexType]',
    'model.description': '[data-hook~=description]',
    'model.nodeUrl': {
      type: 'attribute',
      hook: 'name',
      name: 'href'
    }
  }
});
