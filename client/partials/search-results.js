var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.node,
  bindings: {
    'model.gid': '[data-hook~=gid]',
    'model.name': '[data-hook~=name]',
    'model.desc': '[data-hook~=desc]',
    'model.nodeUrl': {
      type: 'attribute',
      hook: 'name',
      name: 'href'
    }
  }
});
