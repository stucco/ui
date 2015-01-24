/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var QueryForm = require('../forms/query-form');

module.exports = PageView.extend({
  pageTitle: 'Stucco Search',
  template: templates.pages.search,
  render: function () {
    var self = this;
    this.renderWithTemplate();
    this.form = new QueryForm({
      model: this.searchModel,
      el: this.queryByHook('query-form'),
      submitCallback: function (data) {
        self.search(data); 
      }
    });
    this.registerSubview(this.form);
    this.queryByHook('query-input').focus();
  },
  search: function (query) {
    app.navigate('search/' + query.search);
  },
  close: function () {
    this.collection.reset();
  }
});
