var Collection = require('ampersand-rest-collection');
var NodeModel = require('./node-model');


module.exports = Collection.extend({
  model: NodeModel,
  url: '/api/search',
  mainIndex: 'gid'
});
