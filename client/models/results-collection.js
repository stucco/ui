var Collection = require('ampersand-rest-collection');
var NodeModel = require('./results-model');


module.exports = Collection.extend({
  model: NodeModel,
  urlRoot: '/api/search',
});
