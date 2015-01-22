var PageView = require('./base');
var templates = require('../templates');

module.exports = PageView.extend({
  pageTitle: 'About Stucco',
  template: templates.pages.info
});
