var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.currentQuery,
  bindings: {
    'model.query': {
      type: 'text',
      hook: 'current-query'
    }
  }
});
