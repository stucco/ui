var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
// var ExtendedInput = InputView.extend({
//     template: templates.includes.queryForm()
// });

module.exports = FormView.extend({
  fields: function () {
    return [
      new InputView({
        template: templates.includes.queryForm,
        label: 'Search query',
        name: 'search',
        required: true,
        placeholder: 'Search...'
      }),
    ];
  }
});
