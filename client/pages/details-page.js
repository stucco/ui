/*global app, alert*/
var addClass = require('amp-add-class');
var removeClass = require('amp-remove-class');
var hasClass = require('amp-has-class');
var Blob = require('blob');
var FileSaver = require('filesaver.js/FileSaver');
var xmldom = require('xmldom').DOMParser;
var reportBuilder = require("../helpers/report-builder");

var PageView = require('./base');
var NodeModel = require('../models/node-model');
var templates = require('../templates');
var ExtraDetailsSubView = require('../partials/extra-details');
var AccountSubView = require('../partials/account-details');
var AddressSubView = require('../partials/address-details');
var AddressRangeSubView = require('../partials/addressRange-details');
var AttackSubView = require('../partials/attack-details');
var AttackerSubView = require('../partials/attacker-details');
var DNSNameSubView = require('../partials/dnsName-details');
var FlowSubView = require('../partials/flow-details');
var HostSubView = require('../partials/host-details');
var IPSubView = require('../partials/ip-details');
var PortSubView = require('../partials/port-details');
var SoftwareSubView = require('../partials/software-details');
var MalwareSubView = require('../partials/malware-details');
var ServiceSubView = require('../partials/service-details');
var UserSubView = require('../partials/user-details');
var VulnerabilitySubView = require('../partials/vulnerability-details');
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
    'model.sourceDocument': '[data-hook~=sourceDocument]',
  },
  events: {
    'click [data-hook~=prev-InE-Btn]': 'previousInEPage',
    'click [data-hook~=next-InE-Btn]': 'nextInEPage',
    'click [data-hook~=prev-OutE-Btn]': 'previousOutEPage',
    'click [data-hook~=next-OutE-Btn]': 'nextOutEPage',
    'click [data-hook~=show-stix]': 'showStix',
    'click [data-hook~=download]': 'download',
    'click [data-hook~=add-to-report]': 'addToReport',
    'click [data-hook~=download-report]': 'downloadReport',
    'click [data-hook~=clear-report]': 'clearReport',
    'click [data-hook~=show-report]': 'showReport'
  },
  subviews: {
    account: {
      container: '[data-hook~=account-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new AccountSubView({
          el: el,
          model: this.model
        });
      }
    },
    address: {
      container: '[data-hook~=address-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new AddressSubView({
          el: el,
          model: this.model
        });
      }
    },
    addressRange: {
      container: '[data-hook~=addressRange-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new AddressRangeSubView({
          el: el,
          model: this.model
        });
      }
    },
    attack: {
      container: '[data-hook~=attack-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new AttackSubView({
          el: el,
          model: this.model
        });
      }
    },
    attacker: {
      container: '[data-hook~=attacker-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new AttackerSubView({
          el: el,
          model: this.model
        });
      }
    },
    dnsName: {
      container: '[data-hook~=dnsName-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new DNSNameSubView({
          el: el,
          model: this.model
        });
      }
    },
    flow: {
      container: '[data-hook~=flow-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new FlowSubView({
          el: el,
          model: this.model
        });
      }
    },
    host: {
      container: '[data-hook~=host-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new HostSubView({
          el: el,
          model: this.model
        });
      }
    },
    ip: {
      container: '[data-hook~=ip-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new IPSubView({
          el: el,
          model: this.model
        });
      }
    },
    port: {
      container: '[data-hook~=port-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new PortSubView({
          el: el,
          model: this.model
        });
      }
    },
    service: {
      container: '[data-hook~=service-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new ServiceSubView({
          el: el,
          model: this.model
        });
      }
    },
    user: {
      container: '[data-hook~=user-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new UserSubView({
          el: el,
          model: this.model
        });
      }
    },
    vulnerability: {
      container: '[data-hook~=vulnerability-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new VulnerabilitySubView({
          el: el,
          model: this.model
        });
      }
    },
    software: {
      container: '[data-hook~=software-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new SoftwareSubView({
          el: el,
          model: this.model
        });
      }
    },
    malware: {
      container: '[data-hook~=malware-details]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new MalwareSubView({
          el: el,
          model: this.model
        });
      }
    },
    extras: {
      container: '[data-hook~=extra-properties]',
      waitFor: 'model.vertexType',
      prepareView: function(el) {
        return new ExtraDetailsSubView({
          el: el,
          model: this.model
        });
      }
    }
  },
  initialize: function (spec) {
    var strID = spec.id;
    this.model = new NodeModel({_id: strID});
    this.model.inEdges.parentNodeId = strID;
    this.model.outEdges.parentNodeId = strID;

    console.log("api get details and edges for node with id=" + strID);
    console.log("and global me = ", window.me);

    this.currentInEPage = 0;
    this.currentOutEPage = 0;
    this.pageSize = 10;
  },
  render: function() {
    this.fetchNodeModel();
    this.renderWithTemplate();

    // render the collection of inEdges and outEdges
    // details.jade contains ul.edgeList => <ul class="edgeList"> to list out the edge.jade (i.e. each edge)
    var inList = this.queryByHook('in-edge-list');
    if (!this.model.inEdges.length) {
      this.fetchInEdgeCollection();
    }
    this.renderCollection(this.model.inEdges, EdgeView, inList);
    
    var outList = this.queryByHook('out-edge-list');
    if (!this.model.outEdges.length) {
      this.fetchOutEdgeCollection();
    }
    this.renderCollection(this.model.outEdges, EdgeView, outList);
  },
  fetchNodeModel: function() {
    this.model.fetch();
  },
  fetchInEdgeCollection: function() {
    this.model.inEdges.fetch({data: {inEdges: true, page: this.currentInEPage, pageSize: this.pageSize}});
  },
  fetchOutEdgeCollection: function() {
    this.model.outEdges.fetch({data: {outEdges: true, page: this.currentOutEPage, pageSize: this.pageSize}});
  },
  updateInEButtonState: function() {
    var numPages = Math.ceil((this.model.inEdges.totalCount - 1) / this.pageSize);
    var maxPageIndex = 0;
    if (numPages) {
      maxPageIndex = Math.max(0, numPages);
    }
    if (this.currentInEPage >= maxPageIndex){
      this.currentInEPage = maxPageIndex;
      addClass(this.queryByHook('next-InE-BtnContainer'), 'disabled');
    }
    if (this.currentInEPage <= 0 ) {
      this.currentInEPage = 0;
      addClass(this.queryByHook('prev-InE-BtnContainer'), 'disabled');
    }
    if(this.currentInEPage > 0 && this.currentInEPage < maxPageIndex){
      removeClass(this.queryByHook('prev-InE-BtnContainer'), 'disabled');
      removeClass(this.queryByHook('next-InE-BtnContainer'), 'disabled');
    }
  },
  previousInEPage: function() {
    if (!hasClass(this.queryByHook('prev-InE-BtnContainer'), 'disabled')) {
      this.currentInEPage--;
      this.updateInEButtonState();
      this.model.inEdges.reset();
      this.fetchInEdgeCollection();
    }
  },
  nextInEPage: function() {
    if (!hasClass(this.queryByHook('next-InE-BtnContainer'), 'disabled') && (this.model.inEdges.totalCount > this.pageSize)) {
      this.currentInEPage++;
      this.updateInEButtonState();
      this.model.inEdges.reset();
      this.fetchInEdgeCollection();
    }
    else {
      this.updateInEButtonState();
    }
  },
  updateOutEButtonState: function() {
    var numPages = Math.ceil((this.model.outEdges.totalCount - 1) / this.pageSize);
    var maxPageIndex = 0;
    if (numPages) {
      maxPageIndex = Math.max(0, numPages);
    } 
    if (this.currentOutEPage >= maxPageIndex){
      this.currentOutEPage = maxPageIndex;
      addClass(this.queryByHook('next-OutE-BtnContainer'), 'disabled');
    }
    if (this.currentOutEPage <= 0 ) {
      this.currentOutEPage = 0;
      addClass(this.queryByHook('prev-OutE-BtnContainer'), 'disabled');
    }
    if(this.currentOutEPage > 0 && this.currentOutEPage < maxPageIndex){
      removeClass(this.queryByHook('prev-OutE-BtnContainer'), 'disabled');
      removeClass(this.queryByHook('next-OutE-BtnContainer'), 'disabled');
    }
  },
  previousOutEPage: function() {
    if (!hasClass(this.queryByHook('prev-OutE-BtnContainer'), 'disabled')) {
      this.currentOutEPage--;
      this.updateOutEButtonState();
      this.model.outEdges.reset();
      this.fetchOutEdgeCollection();
    }
  },
  nextOutEPage: function() {
    if (!hasClass(this.queryByHook('next-OutE-BtnContainer'), 'disabled') && (this.model.outEdges.totalCount > this.pageSize)) {
      this.currentOutEPage++;
      this.updateOutEButtonState();
      this.model.outEdges.reset();
      this.fetchOutEdgeCollection();
    }
    else {
      this.updateOutEButtonState();
    }
  },
  showStix: function() {
    var checked = this.queryByHook('show-stix').checked;
    if (checked) {
      this.model.sourceDocument = this.model.sourceDocument;
      this.queryByHook('showSourceDocument').setAttribute("style", "display: block");
    }
    else {
      this.queryByHook('showSourceDocument').setAttribute("style", "display: none");
    }
  },
  download: function() {
    var blob = new Blob([this.model.sourceDocument], {type: 'text/xml;charset=utf-8'});
    FileSaver.saveAs(blob, 'stix.xml');
  },
  addToReport: function() {  
    if (window.localStorage.getItem(this.model.name) === null) {
      try {
        var index = (window.localStorage.getItem("index") === null) ? 0 : Number(window.localStorage.getItem("index")) + 1;
        window.localStorage.setItem(index, this.model.name);
        window.localStorage.setItem(this.model.name, this.model.sourceDocument);
        window.localStorage.setItem("index", index);
      } catch (e) {
        window.alert("Required local storage is unavailable!");
      }
    }
  },
  downloadReport: function() {
    var report = reportBuilder.report();
    if (report !== null && report !== undefined) {
      window.localStorage.setItem("report", report);
      var blob = new Blob([report], {type: 'text/xml;charset=utf-8'});
      FileSaver.saveAs(blob, 'stix_report.xml');
    } else {
      window.alert("There are no items in this report!");
    }
  },
  clearReport: function() {
  //  window.localStorage.clear();
    if (window.localStorage.getItem("index") !== null) {
      var index = Number(window.localStorage.getItem("index"));
      for (var i = 0; i <= index; i++) {
        var name = window.localStorage.getItem(i);
        window.localStorage.removeItem(i);
        window.localStorage.removeItem(name);
      }
      window.localStorage.removeItem("index");
    }
    if (window.localStorage.getItem("report") !== null) {
      window.localStorage.removeItem("report");
    }
  /*  
    window.localStorage.removeItem("report");
    if (window.localStorage.getItem("stucco_report_names") !== null) {
      var stucco_report_names = window.localStorage.getItem("stucco_report_names").split("##stucco##");
      for (var i = 0; i < stucco_report_names.split("##stucco##").length; i++) {
        window.localStorage.removeItem(stucco_report_names[i]); 
      }
      window.localStorage.removeItem("stucco_report_names");
    }
  */  
  },
  showReport: function() {
    var report = reportBuilder.report(); 
    if (report === null) {
      window.alert("There are no items in this report!");
    } else {
      window.localStorage.setItem("report", report);
      window.open("/stix-to-html/stix.html");
    }
  }
});
