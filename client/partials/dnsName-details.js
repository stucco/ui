var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.dnsName,
  bindings: {
    'model.source': '[data-hook~=source]'
  },
  render: function(el) {
  	if (this.model.vertexType === "DNSName") {
  		this.renderWithTemplate();
  	}
  }
});
