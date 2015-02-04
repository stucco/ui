var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  props: {
    _id: ['number', true, ''],
    vertexType: ['string', true, ''],
    details: ['string', true, ''],  //remove details when ontology is normalized to include description on every vertexType
    description: ['string', true, ''],
    name: ['string', true, '']
  },
  session: {
    query: ['string', true, false]
  },
  derived: {
    nodeUrl: {
      deps: ['_id', 'vertexType'],
      fn: function () {
        return '/' + this.vertexType + '/' + this._id;
      }
    }
  }
});
