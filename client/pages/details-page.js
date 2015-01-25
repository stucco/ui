/*global app, alert*/
var PageView = require('./base');
var NodeModel = require('../models/node-model');
var templates = require('../templates');

module.exports = PageView.extend({
  pageTitle: 'Node Details',
  template: templates.pages.details,
  bindings: {
    'model.gid': '[data-hook~=gid]',
    'model.name': '[data-hook~=name]',
    'model.nodeType': '[data-hook~=nodeType]',
    'model.desc': '[data-hook~=desc]',
    'model.nodeUrl': {
      type: 'attribute',
      hook: 'details',
      name: 'href'
    }
  },
  events: {
    'click [data-hook~=delete]': 'handleDeleteClick'
  },
  initialize: function (spec) {
    this.model = new NodeModel({gid: spec.id});
  },
  render: function() {
    this.model.fetch();
    this.renderWithTemplate();
  },
});
