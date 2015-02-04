var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  urlRoot: '/api/nodes',
  props: {
    _id: ['number', true, ''],
    vertexType: ['string', true, ''],
    description: ['string', true, ''],
    name: ['string', true, ''],
    //other: ['object', false, '{}'],
    // TODO: Add a way to include all other properties of a vertex
    // SHOULD REFERENCE ANOTHER NODE BY ID
    edgesIn: ['string', true, ''],
    edgesOut: ['string', true, '']
  },
  extraProperties: 'allow',
  derived: {
    nodeUrl: {
      deps: ['_id', 'vertexType'],
      fn: function () {
        return this.urlRoot + '/' + this._id;
      }
    }
  }
});
