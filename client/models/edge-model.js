var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  props: {
    _id: ['string', true, ''],
    _label: ['string', true, ''],
    _inV: ['number', true, ''],
    _outV: ['number', true, ''],
    inVType: ['string', true, ''],
    outVType: ['string', true, ''],
    description: ['string', false, ''],
    edgeName: ['string', true, '']
  },
  extraProperties: 'allow',
  session: {
    currentNodeId: ['number', true, '']
  },
  derived: {
    nextNodeUrl: {
      deps: ['_inV', '_outV'],
      fn: function () {
        if (this.currentNodeId === this._inV) {
          return '/' + this.outVType + '/' + this._outV;
        }
        else {
          return '/' + this.inVType + '/' + this._inV;
        }
      }
    }
  }
});
