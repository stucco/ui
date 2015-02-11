var AmpersandModel = require('ampersand-model');
var EdgeCollection = require('./edge-collection');

module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  urlRoot: '/api/nodes',
  props: {
    _id: ['number', true, ''],
    vertexType: ['string', true, ''],
    description: ['string', true, ''],
    name: ['string', true, '']
  },
  extraProperties: 'allow',
  derived: {
    nodeUrl: {
      deps: ['_id'],
      fn: function () {
        return this.urlRoot + '/' + this._id;
      }
    }
  },
  collections: {
    inEdges: EdgeCollection,
    outEdges: EdgeCollection
  }
});
