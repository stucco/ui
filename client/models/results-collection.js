var Collection = require('ampersand-rest-collection');
var ResultsModel = require('./results-model');


module.exports = Collection.extend({
  model: ResultsModel,
  urlRoot: '/api/search',
  url: function() {
    return (this.queryModel ? this.urlRoot + '?' + this.queryModel.query : this.urlRoot);
  }
});
