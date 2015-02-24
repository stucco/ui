/*global app, alert*/
var PageView = require('./base');
var NodeModel = require('../models/node-model');
var templates = require('../templates');
var SoftwareSubView = require('../partials/software-details');
var MalwareSubView = require('../partials/malware-details');
var EdgeView = require('../partials/edge-details');
var EdgeCollection = require('../models/edge-collection');

module.exports = PageView.extend({
  pageTitle: 'Node Details',
  template: templates.pages.details,
  bindings: {
    'model._id': '[data-hook~=_id]',
    'model.name': '[data-hook~=name]',
    'model.vertexType': '[data-hook~=vertexType]',
    'model.description': '[data-hook~=description]'
  },
  events: {
    'click [data-hook~=delete]': 'handleDeleteClick'
  },
  //Note: Listing subviews here do no get rendered for some reason. The subview instances have their render() function called.
  // subviews: {
  //   software: {
  //     container: '[data-hook~=software-details]',
  //     prepareView: function(el) {
  //       console.log("in sw");
  //       return new SoftwareSubView({
  //         model: this.model
  //       });
  //     }
  //   }
  // },
  initialize: function (spec) {
    var numId = Number(spec.id);
    this.model = new NodeModel({_id: numId});
    this.model.inEdges.parentNodeId = numId;
    this.model.outEdges.parentNodeId = numId;
    console.log("done init");
  },
  render: function() {
    this.model.fetch();
    this.renderWithTemplate();

    this.renderSubview(new SoftwareSubView({
      model: this.model
    }), this.el.querySelector('software-details'));

    this.renderSubview(new MalwareSubView({
      model: this.model
    }), this.el.querySelector('malware-details'));

    //TODO: add other vertex type subviews

    // render the collection of inEdges
    // details.jade contains ul.edgeList => <ul class="edgeList"> to list out the edge.jade (i.e. each edge)
    var inList = this.queryByHook('in-edge-list');
    if (!this.model.inEdges.length) {
      this.model.inEdges.fetch({data: {inEdges: true}});
    }
    this.renderCollection(this.model.inEdges, EdgeView, inList);
    var outList = this.queryByHook('out-edge-list');
    if (!this.model.outEdges.length) {
      this.model.outEdges.fetch({data: {outEdges: true}});
    }
    this.renderCollection(this.model.outEdges, EdgeView, outList);
  },
  resetCollection: function () {
    this.model.inEdges.reset();
    this.model.outEdges.reset();
  }
});
