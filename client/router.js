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
    // 'node/:id': 'nodeDetails',
    'info': 'info',
    '(*path)': 'catchAll'
  },

  // ------- ROUTE HANDLERS ---------
  search: function () {
    this.trigger('page', new SearchPage({

    }));
  },

  results: function (query) {
    this.trigger('page', new ResultsPage({
      query: query,
      collection: app.nodes
    }));
  },

  // nodeDetails: function (id) {
  //   this.trigger('page', new DetailsPage({
  //     id: id
  //   }));
  // },

  info: function () {
    this.trigger('page', new InfoPage());
  },

  catchAll: function () {
    this.redirectTo('');
  }
});
