var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.extraProps,
  render: function(el) {
  	this.renderWithTemplate();
  }
});
