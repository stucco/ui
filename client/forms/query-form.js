var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
});

module.exports = FormView.extend({
  fields: function () {
    return [
      new ExtendedInput({
          label: 'Query',
          name: 'search',
          value: this.model && this.model.query,
          placeholder: 'Search',
          parent: this
      }),
    ];
  }
});
