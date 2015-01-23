var PageView = require('./base');
var templates = require('../templates');

module.exports = PageView.extend({
  pageTitle: 'Stucco Search Results',
  template: templates.pages.results,
  initialize: function (spec) {
    console.log('Query: "' + spec.query + '"');
  }
  render: function() {
    this.renderWithTemplate();
  }
});
