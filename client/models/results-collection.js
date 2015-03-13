var Collection = require('ampersand-rest-collection');
var ResultsModel = require('./results-model');


module.exports = Collection.extend({
  model: ResultsModel,
  urlRoot: '/api/search',
  totalCount: ['number', true, 0],
  url: function() {
    return (this.queryModel ? this.urlRoot + '?' + this.queryModel.query : this.urlRoot);
  },
  parse: function(data) {
  	this.totalCount = data.count;
  	return data.results;
  }
});
