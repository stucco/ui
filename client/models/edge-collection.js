var Collection = require('ampersand-rest-collection');
var EdgeModel = require('./edge-model');

module.exports = Collection.extend({
  model: EdgeModel,
  urlRoot: '/api/nodes',
  url: function() {
    return (this.urlRoot + '/' + this.parent._id + '/edges');
  }
});
