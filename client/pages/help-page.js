var PageView = require('./base');
var HelpModel = require('../models/help-model');
var templates = require('../templates');

module.exports = PageView.extend({
  pageTitle: 'Stucco Help',
  template: templates.pages.help,
  initialize: function () {
    this.model = new HelpModel({apiUrl: window.apiUrl});
  },
  bindings: {
    'model.apiUrl': {
      hook: 'apiUrl'
    }
  }
});
