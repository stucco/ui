var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  props: {
    _id: ['string', true, ''],
    vertexType: ['string', true, ''],
    description: ['array', true, ''],
    name: ['string', true, '']
  },
  session: {
    query: ['string', true, false]
  },
  derived: {
    nodeUrl: {
      deps: ['_id', 'vertexType'],
      fn: function () {
        return '/' + this.vertexType + '/' + encodeURIComponent(this._id);
      }
    }
  }
});
