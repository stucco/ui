var NodeModel = require('./node-model');
var EdgeCollection = require('./edge-collection');

module.exports = NodeModel.extend({
  idAttribute: '_id',
  urlRoot: '/api/flows',
  props: {
    srcCountry: ['string', false, ''],
    srcCountryCode: ['string', false, ''],
    dstCountry: ['string', false, ''],
    dstCountryCode: ['string', false, '']
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
  parse: function(data) {
    if (data.length >= 1) {
      var edge1 = data[0][1];
      var addressRange1 = data[0][4];
      if (data.length == 2) {
        var addressRange2 = data[1][4];
      }
      if (edge1._label == "dstAddress") {
        if (addressRange1.countryName) {
          this.dstCountry = addressRange1.countryName;
          this.dstCountryCode = addressRange1.countryCode;
        }
        if (addressRange2 && addressRange2.countryName) {
          this.srcCountry = addressRange2.countryName;
          this.srcCountryCode = addressRange2.countryCode;
        }
      }
      else {
        if (addressRange1.countryName) {
          this.srcCountry = addressRange1.countryName;
          this.srcCountryCode = addressRange1.countryCode;
        }
        if (addressRange2 && addressRange2.countryName) {
          this.dstCountry = addressRange2.countryName;
          this.dstCountryCode = addressRange2.countryCode;
        }
      }
    }
  }
});
