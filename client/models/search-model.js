var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  props: {
    query: ['string', true, '']
  }
});
