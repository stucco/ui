/*global app, alert*/
var PageView = require('./base');
var NodeModel = require('../models/node-model');
var templates = require('../templates');
var EdgeView = require('../partials/edge-details');
var EdgeCollection = require('../models/edge-collection');

module.exports = PageView.extend({
  pageTitle: 'Node Details',
  template: templates.pages.details,
  bindings: {
    'model._id': '[data-hook~=_id]',
    'model.name': '[data-hook~=name]',
    'model.vertexType': '[data-hook~=vertexType]',
    'model.description': '[data-hook~=description]',
    'model.accessComplexity': '[data-hook~=accessComplexity]'
  },
  events: {
    'click [data-hook~=delete]': 'handleDeleteClick'
  },
  initialize: function (spec) {
    var numId = Number(spec.id);
    this.model = new NodeModel({_id: numId, collections: {edges: new EdgeCollection()}});
    this.edges = this.model.collections.edges;
    this.edges.parent = this.model;
  },
  render: function() {
    this.model.fetch();
    this.renderWithTemplate();

    // render the collection of inEdges
    // details.jade contains ul.edgeList => <ul class="edgeList"> to list out the edge.jade (i.e. each edge)
    var list = this.queryByHook('edge-list');
    if (!this.edges.length) {
      this.edges.fetch();
    }
    this.renderCollection(this.edges, EdgeView, list, {viewOptions: {currentNodeId: this.model._id}});
  }
});
