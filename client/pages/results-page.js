var PageView = require('./base');
var CurrentQueryView = require('../partials/current-query.js');
var CurrentQuery = require('../models/query-model');
var ResultView = require('../partials/search-result');
var templates = require('../templates');

module.exports = PageView.extend({
  pageTitle: 'Stucco Search Results',
  template: templates.pages.results,
  initialize: function (spec) {
    this.queryModel = new CurrentQuery();
    // used to update the query in the subview
    this.queryModel.query = spec.query;
    // used to update the url in the collection
    this.collection.queryModel = this.queryModel;
  },
  render: function() {
    console.log('URL: ' + this.collection.url());

    this.renderWithTemplate();

    // render subview, which only handles storing/showing the current query
    var model = this.queryModel;
    this.renderSubview(new CurrentQueryView({
      model: model
    }), this.el.querySelector('.q'));

    // render the collection of results
    var list = this.el.querySelector('.resList');
    // This does not work!! var list = this.queryByHook('results-list');
    this.renderCollection(this.collection, ResultView, list);

    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    this.collection.fetch();
    return false;
  },
  resetCollection: function () {
    this.collection.reset();
  },
});
