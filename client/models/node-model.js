var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  idAttribute: 'gid',
  urlRoot: '/api/nodes',
  props: {
    gid: ['string', true, ''],
    nodeType: ['string', true, ''],
    desc: ['string', true, ''],
    name: ['string', true, ''],
    // SHOULD REFERENCE ANOTHER NODE BY ID
    edgesIn: ['string', true, ''],
    edgesOut: ['string', true, '']
  },
  derived: {
    nodeUrl: {
      deps: ['gid', 'nodeType'],
      fn: function () {
        return '/' + this.nodeType + '/' + this.gid;
      }
    }
  }
});
