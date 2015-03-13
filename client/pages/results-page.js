var xhr = require('xhr');
var addClass = require('amp-add-class');
var removeClass = require('amp-remove-class');
var hasClass = require('amp-has-class');

var PageView = require('./base');
var SearchResults = require('../models/results-collection');
var CurrentQueryView = require('../partials/current-query.js');
var CurrentQuery = require('../models/query-model');
var ResultView = require('../partials/search-result');
var templates = require('../templates');

module.exports = PageView.extend({
  pageTitle: 'Stucco Search Results',
  template: templates.pages.results,
  events: {
    'click [data-hook~=prevBtn]': 'previousPage',
    'click [data-hook~=nextBtn]': 'nextPage'
  },
  initialize: function (spec) {
    this.currentPage = 0;
    this.pageSize = 20;

    this.collection = new SearchResults();

    this.queryModel = new CurrentQuery();
    // used to update the query in the subview

    // check if this query specifies the property, if not use 'name'
    var rawQuery = spec.query;
    var query = rawQuery;
    var res = rawQuery.indexOf('=');
    if ( res > 0 ) {
      // change 'type' to 'vertexType'
      var k = rawQuery.slice(0, res);
      if ( k && k === 'type' ) {
        var v = rawQuery.slice(res+1);
        query = 'vertexType=' + v;
      }
    }
    else {
      query = 'name=' + rawQuery;
    }
    console.log('api search query: ' + query);

    this.queryModel.query = query;
    // used to update the url in the collection
    this.collection.queryModel = this.queryModel;
  },
  render: function() {
    if (!this.collection.length) {
      this.fetchCollection();
    }

    //TODO: if the collection has 0 results, go back to search page
    this.renderWithTemplate();

    // render subview, which only handles storing/showing the current query
    var model = this.queryModel;
    this.renderSubview(new CurrentQueryView({
      model: model
    }), this.el.querySelector('.q'));

    // render the collection of results
    // results.jade contains ul.resList => <ul class="resList"> to list out the result.jade (i.e. each result object)
    var list = this.el.querySelector('.resList');
    // This does not work!! var list = this.queryByHook('results-list');
    this.renderCollection(this.collection, ResultView, list);
  },
  updateButtonState: function(){
    var numPages = Math.ceil((this.collection.totalCount - 1) / this.pageSize);
    var maxPageIndex = 0;
    if (numPages) {
      maxPageIndex = Math.max(0, numPages);
    } 
    if (this.currentPage >= maxPageIndex){
      this.currentPage = maxPageIndex;
      addClass(this.queryByHook('nextBtnContainer'), 'disabled');
    }
    if (this.currentPage <= 0 ) {
      this.currentPage = 0;
      addClass(this.queryByHook('prevBtnContainer'), 'disabled');
    }
    if(this.currentPage > 0 && this.currentPage < maxPageIndex){
      removeClass(this.queryByHook('prevBtnContainer'), 'disabled');
      removeClass(this.queryByHook('nextBtnContainer'), 'disabled');
    }
  },
  previousPage: function () {
    if (!hasClass(this.queryByHook('prevBtnContainer'), 'disabled')) {
      this.currentPage--;
      this.updateButtonState();
      this.resetCollection();
      this.fetchCollection();
    }
    else {
      this.updateButtonState();
    }
  },
  nextPage: function () {
    if (!hasClass(this.queryByHook('nextBtnContainer'), 'disabled') && (this.collection.totalCount > this.pageSize)) {
      this.currentPage++;
      this.updateButtonState();
      this.resetCollection();
      this.fetchCollection();
    }
    else {
      this.updateButtonState();
    }
  },
  fetchCollection: function () {
    this.collection.fetch({data: {page: this.currentPage, pageSize: this.pageSize}});
  },
  resetCollection: function () {
    this.collection.reset();
  }
});
