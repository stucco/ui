var AmpersandModel = require('ampersand-model');
var NodeModel = require('./results-model');

module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  props: {
    _id: ['string', true, ''],
    _label: ['string', true, ''],
    _inV: ['string', true, ''],
    _outV: ['string', true, ''],
    inVType: ['string', true, ''],
    outVType: ['string', true, ''],
    description: ['string', false, ''],
    edgeName: ['string', true, ''],
    adjacentNode: [NodeModel, true, '{}']
  },
  extraProperties: 'allow',
  session: {
    isInEdge: ['boolean', true, true]
  },
  derived: {
    nextNodeUrl: {
      deps: ['isInEdge'],
      fn: function () {
        if (this.isInEdge) {
          return '/' + this.outVType + '/' + encodeURIComponent(this._outV);
        }
        else {
          return '/' + this.inVType + '/' + encodeURIComponent(this._inV);
        }
      }
    }
  },
  parse: function(data) {
    for (var key in data[1]) {
      this[key] = data[1][key];
    }
    this.adjacentNode = data[2];
    if (this._outV === this.adjacentNode._id) {
      this.isInEdge = true;
    }
    else {
      this.isInEdge = false;
    }
  }
});
