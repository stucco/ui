/*global app, alert*/
var PageView = require('./base');
//Why do we not want the result-model from the collection?
var NodeModel = require('../models/node-model');
var templates = require('../templates');

module.exports = PageView.extend({
  pageTitle: 'Node Details',
  template: templates.pages.details,
  bindings: {
    'model._id': '[data-hook~=_id]',
    'model.name': '[data-hook~=name]',
    'model.vertexType': '[data-hook~=vertexType]',
    'model.description': '[data-hook~=description]',
    'model.nodeUrl': {
      type: 'attribute',
      hook: 'name',
      name: 'href'
    }
  },
  events: {
    'click [data-hook~=delete]': 'handleDeleteClick'
  },
  initialize: function (spec) {
    var numId = Number(spec.id);
    this.model = new NodeModel({_id: numId});
  },
  render: function() {
    this.model.fetch();
    this.renderWithTemplate();
  },
});
