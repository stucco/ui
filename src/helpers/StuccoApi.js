// Read configuration from dev_config.json (or production_config.json)
import config from '../../dev_config'
import xhr from 'request'

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

// maybe use [request](https://github.com/request/request) for pulling
// data from rexster.
// Query a node based on an ID.
// Usage: curl -XGET :3000/api/nodes/<id>/inEdges
// Returns: JSON array of triples of objects associated with the requested ID, or an error object

export function getEdges (req, res, callback) {
  var id = encodeURIComponent(req.params.id)
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
      queryString = JSON.stringify({'page': page, 'pageSize': pageSize})
      queryURL = graphUri + '/inEdges/' + id + '?q=' + queryString
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
      queryURL = graphUri + '/outEdges/' + id + '?q=' + queryString
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
/*
export function getNode (req, res) {
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
        return res.status(500).send({error: err, node: id})
      }
      status = response.statusCode
      // TODO: status code other than 200 - redirect page to results
      results = (JSON.parse(body)).results
      // TODO: empty result - display pop up and return to results

      // TODO: remove after testing
      // var xml = '<stixCommon:Exploit_Target xmlns:stixCommon=\"http://stix.mitre.org/common-1\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"stucco:vulnerability-95a58902-594d-4c46-8bb8-dca5834f6682\" xsi:type=\"et:ExploitTargetType\"><et:Title xmlns:et=\"http://stix.mitre.org/ExploitTarget-1\">Vulnerability<\/et:Title><et:Vulnerability xmlns:et=\"http://stix.mitre.org/ExploitTarget-1\"><et:Description>WebGate eDVR Manager ActiveX Controls CVE-2015-2098 Multiple Buffer Overflow Vulnerabilities WebGate eDVR Manager is prone to multiple buffer-overflow vulnerabilities because it fails to perform boundary checks before copying user-supplied data to insufficiently sized memory buffer. The controls are identified.<\/et:Description><et:Short_Description>WebGate eDVR Manager ActiveX Controls CVE-2015-2098 Multiple Buffer Overflow Vulnerabilities<\/et:Short_Description><et:CVE_ID>CVE-nnnn-nnnn<\/et:CVE_ID><et:OSVDB_ID>72838453<\/et:OSVDB_ID><et:Source>NVD<\/et:Source><et:Published_DateTime>2015-03-28T00:30:00.000-04:00<\/et:Published_DateTime><et:References><stixCommon:Reference>http://support.microsoft.com/kb/240797<\/stixCommon:Reference><stixCommon:Reference>Second<\/stixCommon:Reference><stixCommon:Reference>Third<\/stixCommon:Reference><\/et:References><\/et:Vulnerability><et:Potential_COAs xmlns:et=\"http://stix.mitre.org/ExploitTarget-1\"><et:Potential_COA><stixCommon:Course_Of_Action idref=\"stucco:vulnerability-9d31d334-93f5-4819-ac1e-8ea8ce957cdf\" xsi:type=\"coa:CourseOfActionType\"/><\/et:Potential_COA><\/et:Potential_COAs><\/stixCommon:Exploit_Target>'
      // results["sourceDocument"] = pretty_data.pd.xml(xml)
      // console.info(">>> getNode() response:\n\t" + JSON.stringify(results))

      res.status(status).send(results)
    }
  )
}
*/

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
      console.log('found: ' + res['send'])
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
      console.info('vertex count with keys:' + keys)
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

