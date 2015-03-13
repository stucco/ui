var Collection = require('ampersand-rest-collection');
var EdgeModel = require('./edge-model');

module.exports = Collection.extend({
  model: EdgeModel,
  parentNodeId: ['number', true, ''],
  totalCount: ['number', true, 0],
  urlRoot: '/api/nodes',
  url: function() {
  	return (this.urlRoot + '/' + this.parentNodeId + '/edges');
  },
  parse: function(data) {
    if (data.count) {
  	 this.totalCount = data.count;
    }
    return data.results;
  }
});
