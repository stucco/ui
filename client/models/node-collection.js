var Collection = require('ampersand-rest-collection');
var Alert = require('./node-model');


module.exports = Collection.extend({
  model: Alert,
  url: '/api/nodes',
  mainIndex: 'gid'
});
