/*global me, app*/
var Router = require('ampersand-router');
var SearchPage = require('./pages/search-page');
var ResultsPage = require('./pages/results-page');
// var DetailsPage = require('./pages/details-page');
var InfoPage = require('./pages/info-page');

module.exports = Router.extend({
  routes: {
    '': 'search',
    'search/:query': 'results',
    // ':type/:id': 'details',
    'info': 'info',
    '(*path)': 'catchAll'
  },

  // ------- ROUTE HANDLERS ---------

  // default search page
  search: function () {
    this.trigger('page', new SearchPage());
  },

  // list of search results
  results: function (query) {
    this.trigger('page', new ResultsPage({
      query: query,
    }));
  },

  // details of selected search result
  // details: function (nodeType, id) {
  //   this.trigger('page', new DetailsPage({
  //     type: nodeType,
  //     id: id
  //   }));
  // },

  // info/help page
  info: function () {
    this.trigger('page', new InfoPage());
  },

  catchAll: function () {
    this.redirectTo('');
  }
});
