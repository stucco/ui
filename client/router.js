/*global me, app*/
var Router = require('ampersand-router');
var SearchPage = require('./pages/search-page');
var InfoPage = require('./pages/info-page');
var DetailsPage = require('./pages/details-page');

module.exports = Router.extend({
  routes: {
    '': 'searchPage',
    'info': 'infoPage',
    'node/:id': 'detailsPage',
    '(*path)': 'catchAll'
  },

  // ------- ROUTE HANDLERS ---------
  searchPage: function () {
    this.trigger('page', new SearchPage({
      model: app.searchState,
      collection: app.nodes
    }));
  },

  infoPage: function () {
    this.trigger('page', new InfoPage({
      model: me
    }));
  },

  detailsPage: function (id) {
    this.trigger('page', new DetailsPage({
      id: id
    }));
  },

  catchAll: function () {
    this.redirectTo('');
  }
});
