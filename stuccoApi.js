// Read configuration from dev_config.json (or production_config.json)
var config = require('getconfig');

var rexsterHost = config.server.rexsterHost;
var rexsterPort = config.server.rexsterPort;

// maybe use [request](https://github.com/request/request) for pulling
// data from rexster.
var xhr = require('request');

function getInEdges(id) {
  xhr('http://10.10.10.100:8182/graphs/graph/vertices/' + id + '/inE', 
    function (error, response, body) {
      if (error) {
        console.log(error);
      }
      var status = response.statusCode;
      //TODO: status code other than 200 - redirect page to results
      var results = (JSON.parse(body)).results;
      //TODO: empty result - display pop up and return to results

      console.log("getInEdges() response:\n" + JSON.stringify(results));

      return results;
  });
}

function getOutEdges(id) {
  xhr('http://10.10.10.100:8182/graphs/graph/vertices/' + id + '/outE', 
    function (error, response, body) {
      if (error) {
        console.log(error);
      }
      var status = response.statusCode;
      //TODO: status code other than 200 - redirect page to results
      var results = (JSON.parse(body)).results;
      //TODO: empty result - display pop up and return to results

      console.log("getOutEdges() response:\n" + JSON.stringify(results));

      return results;
  });
}

// Query a node based on an ID.
// Usage: curl -XGET :3000/api/nodes/<id>
// Optional parameters:
//  * edges: whether to return edges as well (boolean)
// Returns: JSON object of the requested ID, or an error object
exports.getNode = function (req, res) {
  var id = req.params.id;
  var getEdges = req.query.edges;

  var status = 404;
  var results = {};

  xhr('http://10.10.10.100:8182/graphs/graph/vertices/' + id, 
    function (error, response, body) {
      if (error) {
        console.log(error);
      }
      status = response.statusCode;
      //TODO: status code other than 200 - redirect page to results
      results = (JSON.parse(body)).results;
      //TODO: empty result - display pop up and return to results

      console.log("getNode() response:\n" + JSON.stringify(results));

      //var inEdges = getInEdges(id);
      //var outEdges = getOutEdges(id);

      res.status(status).send(results);
  });
};

// Search knowledge graph.
// Usage: curl -XGET :3000/api/search
// Required parameters:
//  * q: search query (string)
// Returns: JSON array of object matching the query, or an error object
exports.search = function (req, res) {

  // TODO: NEED TO HAVE A WELL-DEFINED FORMAT FOR SEARCH QUERIES

  var q = req.query;
  console.log("query: " + JSON.stringify(q));
  var gremlinQ = '?script=g.V.has("name","' + q.name + '")';
  var status = 404;
  var results = [];
  
  xhr('http://10.10.10.100:8182/graphs/graph/tp/gremlin' + gremlinQ, 
    function (error, response, body) {
      if (error) {
        console.log(error);
      }
      status = response.statusCode;
      //TODO: status code other than 200 - redirect page back to query
      results = (JSON.parse(body)).results;
      //TODO: empty result - display pop up and return to query

      console.log("search() response:\n" + JSON.stringify(response));
      console.log("search() results:\n" + JSON.stringify(results));

      res.status(status).send(results);
  });
};

//TODO: Implement this if possible with rexster
exports.updateNode = function (req, res) {
  var status = 200; // all good
  var body = req.body;

  res.status(status).send(body);
};

