var addClass = require('amp-add-class');
var removeClass = require('amp-remove-class');

var PageView = require('./base');
var templates = require('../templates');
var SearchForm = require('../forms/query-form');
var ResultsView = require('../partials/search-results');

module.exports = PageView.extend({
  pageTitle: 'Stucco Search',
  template: templates.pages.search,
  events: {
    'click [data-hook~=search]': 'search',
    'click [data-hook~=close]': 'close'
  },
  initialize: function () {

  },
  render: function () {
    this.renderWithTemplate();
  },
  search: function () {
    // set the query!
    this.collection.fetch();
    removeClass(this.queryByHook('results-panel'), 'hidden');
    this.renderCollection(this.collection, ResultsView, this.queryByHook('results-list'));
    return false;
  },
  close: function () {
    this.collection.reset();
  }
});
