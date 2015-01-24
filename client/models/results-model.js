var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  idAttribute: 'gid',
  props: {
    gid: ['string', true, ''],
    nodeType: ['string', true, ''],
    desc: ['string', true, ''],
    name: ['string', true, ''],
    // SHOULD REFERENCE ANOTHER NODE BY ID
    edgesIn: ['string', true, ''],
    edgesOut: ['string', true, '']
  },
  session: {
    query: ['string', true, false]
  },
  derived: {
    nodeUrl: {
      deps: ['gid'],
      fn: function () {
        return '/nodes/' + this.gid;
      }
    }
  }
});