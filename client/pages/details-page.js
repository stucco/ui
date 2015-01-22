/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');

module.exports = PageView.extend({
  pageTitle: 'Node Details',
  template: templates.pages.details,
  bindings: {
    'model.gid': '[data-hook~=gid]',
    'model.name': '[data-hook~=name]',
    'model.descr': '[data-hook~=descr]',
    'model.detailsUrl': {
      type: 'attribute',
      hook: 'details',
      name: 'href'
    }
  },
  events: {
    'click [data-hook~=delete]': 'handleDeleteClick'
  },
  initialize: function (spec) {
    var self = this;
    app.alerts.getOrFetch(spec.id, {all: true}, function (err, model) {
      if (err) alert('couldnt find a model with id: ' + spec.id);
      self.model = model;
    });
  }
});
