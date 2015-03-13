var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.user,
  bindings: {
    'model.source': '[data-hook~=source]'
  },
  render: function(el) {
  	if (this.model.vertexType === "user") {
  		this.renderWithTemplate();
  	}
  }
});
