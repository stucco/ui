var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.address,
  bindings: {
    'model.source': '[data-hook~=source]'
  },
  render: function(el) {
  	if (this.model.vertexType === "address") {
  		this.renderWithTemplate();
  	}
  }
});
