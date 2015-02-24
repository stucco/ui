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

  if (req.query.inEdges) {
    xhr(graphUri + '/tp/gremlin?script=g.v(' + id + ').inE.outV.path&rexster.offset.end=3',
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
    xhr(graphUri + '/tp/gremlin?script=g.v(' + id + ').outE.inV.path&rexster.offset.end=3',
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
  var status = 200;
  var q = req.query;
  var err;

  var pageSize = 25;
  if(req.query.pageSize){
    pageSize = req.query.pageSize;
  }
  var page = 0;
  if(req.query.page){
    page = req.query.page;
  }
  var start = pageSize * page;
  var end = start + (+pageSize) - 1;

  // Get the first key - other key/values are ignored
  var keys = Object.keys(q);
  if (! keys ) {
    err = "Malformed search query: no query defined.";
    console.warn(err);
    return res.status(500).send({error: err});
  }
  var key = keys[0];
  var val = q[key];
  if ( !val ) {
    err = "Malformed search query: no value defined. Query: " + JSON.stringify(q);
    console.warn(err);
    return res.status(500).send({error: err});
  }

  // Set the gremlin query.
  //Check if this paging is faster than using rexster.offset.start & rexster.offset.end
  var gremlinQ = '?script=g.V("' + key + '","' + val + '")[' + start + '..' + end + ']';
  
  xhr(graphUri + '/tp/gremlin' + gremlinQ,
    function (error, response, body) {
      if (error) {
        err = "Error executing search query: " + error;
        console.error(error);
        return res.status(500).send({error: err, gremlinQuery: gremlinQ});
      }
      status = response.statusCode;
      var results = (JSON.parse(body)).results;
      if (results.length === 0) { status = 404; }
      return res.status(status).send(results);
  });
};

// Get the count of nodes or edges in the graph
// Usage: curl -XGET :3000/api/count
// Required parameters:
//  * q: search query (string)
// Optional parameters:
//  * t: type: vertex (default) or edge
// Returns: JSON object of {"count": <count>}
exports.countNodes = function (req, res) {
  count(req, res, 'node');
};

exports.countEdges = function (req, res) {
  count(req, res, 'edge');
};

// Count nodes or edges.
function count (req, res, type) {
  var status = 200;
  var q = req.query;
  var gremlinQ;
  var err;

  // Either query based on a key/value or get all nodes/edges.
  var keys = Object.keys(q);
  if ( keys.length > 0 ) {
    var key = keys[0];
    var val = q[key];
    if ( !val ) {
      err = "Malformed search query: no value defined. Query: " + JSON.stringify(q);
      console.warn(err);
      return res.status(500).send({error: err});
    }
    gremlinQ = '?script=g.V("' + key + '","' + val + '").count()';
    if ( type === 'edge' || type === 'edges' ) {
      gremlinQ = '?script=g.E("' + key + '","' + val + '").count()';
    }
  }
  else {
    gremlinQ = '?script=g.V().count()';
    if ( type === 'edge' || type === 'edges' ) {
      gremlinQ = '?script=g.E().count()';
    }
  }

  // Query rexster using gremlin to get the count.
  xhr(graphUri + '/tp/gremlin' + gremlinQ,
    function (error, response, body) {
      if (error) {
        err = "Error getting " + type + " count: " + error;
        console.error(error);
        return res.status(500).send({error: err});
      }
      status = response.statusCode;
      var result = {count: (JSON.parse(body)).results[0]};
      if (result.count === 0) { status = 404; }
      return res.status(status).send(result);
  });
}


//TODO: Implement this if possible with rexster
exports.updateNode = function (req, res) {
  var status = 200; // all good
  var body = req.body;

  res.status(status).send(body);
};

