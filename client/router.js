/*global me, app*/
var Router = require('ampersand-router');
var SearchPage = require('./pages/search-page');
var ResultsPage = require('./pages/results-page');
var DetailsPage = require('./pages/details-page');
var HelpPage = require('./pages/help-page');

module.exports = Router.extend({
  routes: {
    '': 'search',
    'search/:query': 'results',
    ':type/:id': 'details',
    'help': 'help',
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
  details: function (vertexType, id) {
    this.trigger('page', new DetailsPage({
      type: vertexType,
      id: id
    }));
  },

  // help page
  help: function () {
    this.trigger('page', new HelpPage());
  },

  catchAll: function () {
    this.redirectTo('');
  }
});
