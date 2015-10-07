var AmpersandModel = require('ampersand-model');
var EdgeCollection = require('./edge-collection');

module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  urlRoot: '/api/nodes',
  props: {
    _id: ['string', true, ''],
    vertexType: ['string', true, ''],
    description: ['string', true, ''],
    name: ['string', true, ''],
    inEdges: {
      type: EdgeCollection,
      required: true,
      default: function() {
        return new EdgeCollection();
      }
    },
    outEdges: {
      type: EdgeCollection,
      required: true,
      default: function() {
        return new EdgeCollection();
      }
    }
  },
  extraProperties: 'allow',
  derived: {
    nodeUrl: {
      deps: ['_id'],
      fn: function () {
        return this.urlRoot + '/' + encodeURIComponent(this._id);
      }
    }
  }
});
