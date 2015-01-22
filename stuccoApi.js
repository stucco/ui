// Read configuration from dev_config.json (or production_config.json)
var config = require('getconfig');

var rexsterHost = config.server.rexsterHost;
var rexsterPort = config.server.rexsterPort;

// maybe use [request](https://github.com/request/request) for pulling
// data from rexster.


// Query a node based on an ID.
// Usage: curl -XGET :3000/api/node/<id>
// Optional parameters:
//  * edges: whether to return edges as well (boolean)
// Returns: JSON object of the requested ID, or an error object
exports.getNode = function (req, res) {
  var id = req.params.id;
  var getEdges = req.query.edges;

  var status = 200; // all good
  var body = {"id": "1234", "type": "vulnerability", "other": "stuff"};

  res.status(status).send(body);
};

// Search knowledge graph.
// Usage: curl -XGET :3000/api/search
// Required parameters:
//  * q: search query (string)
// Returns: JSON array of object matching the query, or an error object
exports.search = function (req, res) {

  // TODO: NEED TO HAVE A WELL-DEFINED FORMAT FOR SEARCH QUERIES

  var q = req.query.query;

  var status = 200; // all good
  var body = {"id": "1234", "type": "vulnerability", "other": "stuff"};

  res.status(status).send(body);
};

