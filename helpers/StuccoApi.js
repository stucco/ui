// Read configuration from dev_config.json (or production_config.json)
import xhr from 'request'
import config from '!json!../dev_config'

var graphHost = config.graphServer.graphHost
var graphPort = config.graphServer.graphPort
var isRexster = config.graphServer.isRexster // leaving both for testing, but planning to remove rexster support.

var graphUri
if (isRexster) {
  var graphName = ''
  var rex = 'http://' + graphHost + ':' + graphPort
  graphUri = rex + '/graphs/' + graphName
} else {
  var graphRootPath = 'api'
  graphUri = 'http://' + graphHost + ':' + graphPort + '/' + graphRootPath
}

console.log(graphUri)


export function getEdges (req, res, callback) {
  var id = encodeURIComponent(req.params.id)
  var name = encodeURIComponent(req.params.name)
  var vertexType = req.params.vertexType

  var err
  var pageSize = 10
  if (req.query.pageSize) {
    pageSize = Number(req.query.pageSize)
  }
  var page = 0
  if (req.query.page) {
    page = Number(req.query.page)
  }
  var start = Number(pageSize * page)
  var end = Number(start + pageSize)

  var queryURL
  var gremlinQ
  var rexsterPaging
  var gremlinFiltering
  var queryString

  var type = req.query.type
  if (type === 'inEdges') {
    if (isRexster) {
      gremlinQ = 'g.v("' + id + '")'
      rexsterPaging = '&rexster.offset.start=' + start + '&rexster.offset.end=' + end + '&returnTotal=true'
      gremlinFiltering = '[' + start + '..' + end + ']'
      gremlinQ = gremlinQ + '.inE.outV.path'
      if (start > 0) {
        gremlinQ = 'g.v("' + id + '").inE' + gremlinFiltering + '.outV.path'
      } else {
        gremlinQ = gremlinQ + rexsterPaging
      }
      queryURL = graphUri + '/tp/gremlin?script=' + gremlinQ
    } else {
      console.log("stuccoApi name: " + name)
      queryString = JSON.stringify({'page': page, 'pageSize': pageSize})
      console.log("stuccoApi query string: " + queryString)
      queryURL = graphUri + '/inEdges/vertexType=' + vertexType + '&name=' + name + '&id=' + id + '?q=' + queryString
    }
    console.log('getEdges() query = ' + queryURL)
    xhr(queryURL,
      function (error, response, body) {
        if (error) {
          err = 'Error executing search for incoming edges: ' + error
          console.error(error)
          res['status'] = 500
          res['send'] = {error: err, query: queryURL}
          console.log("In edges: ", res)

          return callback(res)
        }
        res['status'] = response.statusCode
        res['send'] = JSON.parse(body)
        console.log("In edges: ", res)

        return callback(res)
      }
    )
  } else if (type === 'outEdges') {
    if (isRexster) {
      gremlinQ = 'g.v("' + id + '")'
      rexsterPaging = '&rexster.offset.start=' + start + '&rexster.offset.end=' + end + '&returnTotal=true'
      gremlinFiltering = '[' + start + '..' + end + ']'

      gremlinQ = gremlinQ + '.outE.inV.path'
      if (start > 0) {
        gremlinQ = 'g.v("' + id + '").outE' + gremlinFiltering + '.inV.path'
      } else {
        gremlinQ = gremlinQ + rexsterPaging
      }

      queryURL = graphUri + '/tp/gremlin?script=' + gremlinQ
    } else {
      queryString = JSON.stringify({'page': page, 'pageSize': pageSize})
      queryURL = graphUri + '/outEdges/vertexType=' + vertexType + '&name=' + name + '&id=' + id + '?q=' + queryString
      console.log("stuccoApi query string: " + queryString)
    }
    console.log('getEdges() query = ' + queryURL)

    xhr(queryURL,
      function (error, response, body) {
        if (error) {
          err = 'Error executing search for incoming edges: ' + error
          console.error(error)
          res['status'] = 500
          res['send'] = {error: err, query: queryURL}

          return callback(res)
        }
        res['status'] = response.statusCode
        res['send'] = JSON.parse(body)
        console.log("Out edges: ", res)

        return callback(res)
      }
    )
  } else {
    console.error('Unknown edge type in request ' + JSON.stringify(req.query) + '\'!')
    res['send']['results'] = []

    return callback(res)
  }
}

// Query a node based on an ID.
// Usage: curl -XGET :3000/api/nodes/<id>
// Returns: JSON object of the requested ID, or an error object

export function getNode (req, res, callback) {
  var id = encodeURIComponent(req.params.id)
  var err

  var status = 404
  var results = {}

  var queryURL
  if (isRexster) {
    queryURL = graphUri + '/vertices/' + id
  } else {
    queryURL = graphUri + '/vertex/' + id
  }
  console.log('getNode() query = ' + queryURL)
  xhr(queryURL,
    function (error, response, body) {
      if (error) {
        err = 'Error obtaining node: ' + error
        console.error(error)
        res['status'] = 500
        res['send'] = {error: err, node: id}

        return callback(res)
      }
      status = response.statusCode
      // TODO: status code other than 200 - redirect page to results
      res['status'] = status
      res['send'] = (JSON.parse(body)).results

      return callback(res)
    }
  )
}

// Search knowledge graph.
// Usage: curl -XGET :3000/api/search
// Required parameters:
//  * q: search query (string)
// Returns: JSON array of objects matching the query, or an error object
export function search (req, res, callback) {
  var status = 200
  var q = req.query
  var err

  var pageSize = 20
  if (req.query.pageSize) {
    pageSize = Number(req.query.pageSize)
  }
  var page = 0
  if (req.query.page) {
    page = Number(req.query.page)
  }
  var start = Number(pageSize * page)
  var end = Number(start + pageSize)

  // Get the first key - other key/values are ignored
  var keys = Object.keys(q)
  if (!keys) {
    err = 'Malformed search query: no query defined.'
    console.warn(err)
    return res.status(500).send({error: err})
  }
  var key = keys[0]
  var val = q[key]
  if (!val) {
    err = 'Malformed search query: no value defined. Query: ' + JSON.stringify(q)
    console.warn(err)
    return res.status(500).send({error: err})
  }

  var queryURL
  if (isRexster) {
    var gremlinQ = '?script=g.V("' + key + '","' + val + '")'
    var rexsterPaging = '&rexster.offset.start=' + start + '&rexster.offset.end=' + end + '&returnTotal=true'
    queryURL = graphUri + '/tp/gremlin' + gremlinQ + rexsterPaging
  } else {
    var queryString = JSON.stringify(q)
    queryURL = graphUri + '/search?q=' + queryString
  }
  console.log('query: ', queryURL)
  xhr(queryURL,
    function (error, response, body) {
      if (error) {
        err = 'Error executing search query: ' + error
        console.error(error)
        res['status'] = 500
        res['send'] = {error: err, query: queryURL}
        return callback(res)
      }
      status = response.statusCode
      if ((JSON.parse(body)).count === 0) {
        res['status'] = 404
      } else {
        res['status'] = status
      }
      res['send'] = JSON.parse(body)
      return callback(res)
    }
  )
}

/*
export function search (req, res) {
  console.log(req)
  var status = 200
  var q = req.query
  var err

  var pageSize = 20
  if (req.query.pageSize) {
    pageSize = Number(req.query.pageSize)
  }
  var page = 0
  if (req.query.page) {
    page = Number(req.query.page)
  }
  var start = Number(pageSize * page)
  var end = Number(start + pageSize)

  // Get the first key - other key/values are ignored
  var keys = Object.keys(q)
  if (!keys) {
    err = 'Malformed search query: no query defined.'
    console.warn(err)
    return res.status(500).send({error: err})
  }
  var key = keys[0]
  var val = q[key]
  if (!val) {
    err = 'Malformed search query: no value defined. Query: ' + JSON.stringify(q)
    console.warn(err)
    return res.status(500).send({error: err})
  }

  var queryURL
  if (isRexster) {
    // Set the gremlin query.
    var gremlinQ = '?script=g.V("' + key + '","' + val + '")'
  //  if (_.contains(config.indices.fulltext, key)) {
  //    gremlinQ = '?script=g.query().has("' + key + '",CONTAINS,"' + val + '").vertices()'
  //  }
    var rexsterPaging = '&rexster.offset.start=' + start + '&rexster.offset.end=' + end + '&returnTotal=true'
    queryURL = graphUri + '/tp/gremlin' + gremlinQ + rexsterPaging
  } else {
    var queryString = JSON.stringify(q)
    queryURL = graphUri + '/search?q=' + queryString
  }
  xhr(queryURL,
    function (error, response, body) {
      if (error) {
        err = 'Error executing search query: ' + error
        console.error(error)
        res['status'] = 500
        res['send'] = {error: err, query: queryURL}
        return res
      }
      status = response.statusCode
      if ((JSON.parse(body)).count === 0) {
        res['status'] = 404
      } else {
        res['status'] = status
      }
      res['send'] = JSON.parse(body)
      return res
    }
  )
}
*/

// Get the count of nodes or edges in the graph
// Usage: curl -XGET :3000/api/count
// Required parameters:
//  * q: search query (string)
// Optional parameters:
//  * t: type: vertex (default) or edge
// Returns: JSON object of {"count": <count>}
export function countNodes (req, res) {
  if (isRexster) {
    // count(req, res, 'node')
  } else {
    var q = req.query
    var keys = Object.keys(q)
    var queryURL
    if (keys && keys.length > 0) {
      var queryString = JSON.stringify(q)
      queryURL = graphUri + '/count/vertices?q=' + queryString
    } else {
      queryURL = graphUri + '/count/vertices'
    }

    xhr(queryURL,
      function (error, response, body) {
        if (error) {
          var err = 'Error getting node count: ' + error
          console.error(error)
          res['status'] = 500
          res['send'] = {error: err}
          return res
        }
        res['status'] = response.statusCode
        res['send'] = {count: (JSON.parse(body)).count}
      }
    )
  }
}

/*
export function countEdges (req, res) {
  if (isRexster) {
    count(req, res, 'edge')
  } else {
    // TODO: support query & count, like countNodes, if/when needed.
    var queryURL = graphUri + '/count/edges'
    console.log('countEdges() query = ' + queryURL)
    xhr(queryURL,
      function (error, response, body) {
        if (error) {
          var err = 'Error getting edge count: ' + error
          console.error(error)
          return res.status(500).send({error: err})
        }
        var statusCode = response.statusCode
        // console.info(">>> countEdges() response:\n\t" + JSON.stringify(body))
        var result = {count: (JSON.parse(body)).count}
        return res.status(statusCode).send(result)
      }
    )
  }
}

// Count nodes or edges.
// NOTE: only invoked by rexster
function count (req, res, type) {
  var status = 200
  var q = req.query
  var gremlinQ
  var err

  // Either query based on a key/value or get all nodes/edges.
  var keys = Object.keys(q)
  if (keys.length > 0) {
    var key = keys[0]
    var val = q[key]
    if (!val) {
      err = 'Malformed search query: no value defined. Query: ' + JSON.stringify(q)
      console.warn(err)
      return res.status(500).send({error: err})
    }
    gremlinQ = '?script=g.V("' + key + '","' + val + '").count()'
    if (type === 'edge' || type === 'edges') {
      gremlinQ = '?script=g.E("' + key + '","' + val + '").count()'
    }
  } else {
    gremlinQ = '?script=g.V().count()'
    if (type === 'edge' || type === 'edges') {
      gremlinQ = '?script=g.E().count()'
    }
  }

  // Query rexster using gremlin to get the count.
  console.log('count() query = ' + graphUri + '/tp/gremlin' + gremlinQ)
  xhr(graphUri + '/tp/gremlin' + gremlinQ,
    function (error, response, body) {
      if (error) {
        err = 'Error getting ' + type + ' count: ' + error
        console.error(error)
        return res.status(500).send({error: err})
      }
      status = response.statusCode
      var results = (JSON.parse(body)).results
      console.info('>>> count() response:\n\t' + JSON.stringify(results))
      var result = {count: (JSON.parse(body)).results[0]}
      if (result.count === 0) { status = 404 }
      return res.status(status).send(result)
    }
  )
}
// TODO: Implement this if needed
export function updateNode (req, res) {
  var status = 200 // all good
  var body = req.body

  res.status(status).send(body)
}
*/