// Read configuration from dev_config.json (or production_config.json)
var config = require('getconfig');

var rexsterHost = config.server.rexsterHost;
var rexsterPort = config.server.rexsterPort;
var rexsterGraph = config.server.rexsterGraph;

var rex = 'http://' + rexsterHost + ':' + rexsterPort;
var graphUri = rex + '/graphs/' + rexsterGraph;

// maybe use [request](https://github.com/request/request) for pulling
// data from rexster.
var xhr = require('request');

// Query a node based on an ID.
// Usage: curl -XGET :3000/api/nodes/<id>/inEdges
// Returns: JSON array of triples of objects associated with the requested ID, or an error object
exports.getEdges = function (req, res) {
  var id = req.params.id;
  console.info("Edge request " + JSON.stringify(req.query));
  console.info("inEdges =" + req.query.inEdges);
  console.info("outEdges =" + req.query.outEdges);

  if (req.query.inEdges) {
    xhr(graphUri + '/tp/gremlin?script=g.v(' + id + ').inE.outV.path',
      function (error, response, body) {
        if (error) {
          console.error(error);
        }
        var status = response.statusCode;
        //TODO: status code other than 200 - redirect page to results
        var results = (JSON.parse(body)).results;
        //TODO: empty result - display pop up and return to results
        
        console.info(">>> getInEdges() response:\n\t" + JSON.stringify(results));

        res.status(status).send(results);
    });
  }
  else if (req.query.outEdges) {
    xhr(graphUri + '/tp/gremlin?script=g.v(' + id + ').outE.inV.path',
      function (error, response, body) {
        if (error) {
          console.error(error);
        }
        var status = response.statusCode;
        //TODO: status code other than 200 - redirect page to results
        var results = (JSON.parse(body)).results;
        //TODO: empty result - display pop up and return to results

        console.info(">>> getOutEdges() response:\n\t" + JSON.stringify(results));

        res.status(status).send(results);
    });
  }
  else {
    console.error("Unknown edge type in request '" + JSON.stringify(req.query) + "'!");
  }
};

// Query a node based on an ID.
// Usage: curl -XGET :3000/api/nodes/<id>
// Returns: JSON object of the requested ID, or an error object
exports.getNode = function (req, res) {
  var id = req.params.id;

  var status = 404;
  var results = {};

  xhr(graphUri + '/vertices/' + id, 
    function (error, response, body) {
      if (error) {
        console.error(error);
      }
      status = response.statusCode;
      //TODO: status code other than 200 - redirect page to results
      results = (JSON.parse(body)).results;
      //TODO: empty result - display pop up and return to results

      console.info(">>> getNode() response:\n\t" + JSON.stringify(results));

      res.status(status).send(results);
  });
};

// Search knowledge graph.
// Usage: curl -XGET :3000/api/search
// Required parameters:
//  * q: search query (string)
// Returns: JSON array of objects matching the query, or an error object
exports.search = function (req, res) {

  // TODO: NEED TO HAVE A WELL-DEFINED FORMAT FOR SEARCH QUERIES

  var q = req.query;
  console.info("stuccoAPI query: " + JSON.stringify(q));
  console.info("stuccoAPI name: " + q.name);
  var gremlinQ = '?script=g.V.has("name","' + q.name + '")';
  var status = 404;
  var results = [];
  
  xhr(graphUri + '/tp/gremlin' + gremlinQ,
    function (error, response, body) {
      if (error) {
        console.error(error);
      }
      status = response.statusCode;
      //TODO: status code other than 200 - redirect page back to query
      results = (JSON.parse(body)).results;
      if (results.length === 0) {
        status = 404;
        console.error("Search returned 0 results!");
      }
      //TODO: empty result - display pop up and return to query

      console.info(">>> search() results:\n\t" + JSON.stringify(results));

      res.status(status).send(results);
  });
};

//TODO: Implement this if possible with rexster
exports.updateNode = function (req, res) {
  var status = 200; // all good
  var body = req.body;

  res.status(status).send(body);
};

