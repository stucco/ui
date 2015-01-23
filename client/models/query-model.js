var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  session: {
    query: ['string', true, '']
  }
});
