var View = require('ampersand-view');
var templates = require('../templates');
var FlowModel = require('../models/flow-node-model');

module.exports = View.extend({
  template: templates.includes.flow,
  bindings: {
    'model.srcCountry': '[data-hook~=srcCountry]',
    'model.srcCountryCode': '[data-hook~=srcCountryCode]',
    'model.dstCountry': '[data-hook~=dstCountry]',
    'model.dstCountryCode': '[data-hook~=dstCountryCode]'
  },
  render: function(el) {
  	if (this.model.vertexType === "flow") {
  		this.flow = new FlowModel({_id: this.model._id});
  		this.flow.fetch();
  		this.model = this.flow;
  		this.renderWithTemplate();
  	}
  }
});
