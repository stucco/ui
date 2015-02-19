/* global console */
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Moonboots = require('moonboots-express');
var compress = require('compression');
var config = require('getconfig');
var semiStatic = require('semi-static');
var serveStatic = require('serve-static');
var stylizer = require('stylizer');
var templatizer = require('templatizer');
var app = express();

// a little helper for fixing paths for various environments
var fixPath = function (pathString) {
  return path.resolve(path.normalize(pathString));
};


// -----------------
// Configure express
// -----------------
app.use(compress());
app.use(serveStatic(fixPath('public')));

// we only want to expose tests in dev
if (config.isDev) {
  app.use(serveStatic(fixPath('test/assets')));
  app.use(serveStatic(fixPath('test/spacemonkey')));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// in order to test this with spacemonkey we need frames
if (!config.isDev) {
  app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());

app.set('view engine', 'jade');


// -----------------
// Stucco REST/HTTP API
// -----------------
// var api = require('./fakeApi');
var api = require('./stuccoApi');

/*************************************************************************
 * @api {get} /search Search the Stucco knowledge graph.
 * @apiName Search
 * @apiGroup Search
 *
 * @apiParam (Query String) {String} Key/values to search for as query parameters.
 * @apiParamExample {String} Request-Example: type=vulnerability&name=cve-2014
 *
 * @apiSuccess {Object[]} nodes   Graph nodes matching search parameters, or an
 * empty array if no nodes are found.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "1",
 *         "name": "CVE-2014-3127",
 *         "vertexType": "vulnerability",
 *         "description": "this is a long description of an ssl vulnerability."
 *       }
 *     ]
 * @apiError (404) NodeNotFound The id of the Node was not found. The result
 * will have no body, check the status for a 404.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
app.get('/api/search', api.search);


/*************************************************************************
 * @api {get} /nodes/:id Request a graph node.
 * @apiName GetNode
 * @apiGroup Node
 *
 * @apiParam {Number} id Graph node's unique ID.
 *
 * @apiSuccess {Object} node The requested graph node.
 * @apiSuccess {String} node._id Global unique id of node.
 * @apiSuccess {String} node.name The node's name.
 * @apiSuccess {String} node.vertexType The node's type.
 * @apiSuccess {String} node.description The description of the node.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "1",
 *       "name": "CVE-2014-3127",
 *       "vertexType": "vulnerability",
 *       "description": "this is a long description of an ssl vulnerability."
 *     }
 *
 * @apiError (404) NodeNotFound The id of the Node was not found. The result
 * will have no body, check the status for a 404.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
app.get('/api/nodes/:id', api.getNode);

/*************************************************************************
 * @api {get} /nodes/:id/edges Request a graph node's incoming or outgoing edges.
 * @apiName GetInEdges
 * @apiGroup Edge
 *
 * @apiParam {Number} id Graph node's unique ID.
 * @apiParam {Boolean} [inEdges] Retrieve the incoming edges for this node
 * @apiParam {Boolean} [outEdges] Retrieve the outgoing edges for this node 
 *
 * @apiSuccess {Object[[3]]} node, edge, node triples The requested graph node's edges and adjacent nodes
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      [
 *       {
 *         "_id": "12",
 *         "name": "CVE-2006-1066",
 *         "vertexType": "vulnerability",
 *         "description": "this is a long description of an ssl vulnerability."
 *       },
 *       {
 *         "_id": "abcd-1234",
 *         "edgeName": "cpe:/o:linux:linux_kernel:2.6.10_to_CVE-2006-1066",
 *         "_label": "hasVulnerability",
 *         "_inV": "12",
 *         "inVType": "vulnerability",
 *         "_outV": "34",
 *         "outVType": "software",
 *         "source": "NVD"
 *       },
 *       {
 *         "_id": "34",
 *         "name": "cpe:/o:linux:linux_kernel:2.6.10",
 *         "vertexType": "software",
 *         "description": "this is a piece of software."
 *       }
 *      ]
 *     ]
 *
 * @apiError (404) NodeNotFound The id of the Node was not found. The result
 * will have no body, check the status for a 404.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
app.get('/api/nodes/:id/edges', api.getEdges);


/*************************************************************************
 * @api {put} /nodes/:id Update a graph node.
 * @apiName PutNode
 * @apiGroup Node
 *
 * @apiParam {Number} id Graph node's unique ID, or an empty object if no node
 * is found.
 *
 * @apiSuccess {Boolean} node The graph node with updated values.
 * @apiSuccess {String} node._id Global unique id of node.
 * @apiSuccess {String} node.name The node's name.
 * @apiSuccess {String} node.vertexType The node's type.
 * @apiSuccess {String} node.description The description of the node.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "1",
 *       "name": "CVE-2014-3127",
 *       "vertexType": "vulnerability",
 *       "description": "this is a long description of an ssl vulnerability."
 *     }
 *
 * @apiError (404) NodeNotFound The id of the Node was not found. The result
 * will have no body, check the status for a 404.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
app.put('/api/nodes/:id', api.updateNode);


// -----------------
// Enable the functional test site in development
// -----------------
if (config.isDev) {
  app.get('/test*', semiStatic({
    folderPath: fixPath('test'),
    root: '/test'
  }));
}


// -----------------
// Set our client config cookie
// -----------------
app.use(function (req, res, next) {
  res.cookie('config', JSON.stringify(config.client));
  next();
});


// ---------------------------------------------------
// Configure Moonboots to serve our client application
// ---------------------------------------------------
new Moonboots({
  moonboots: {
    jsFileName: 'vis-experiment',
    cssFileName: 'vis-experiment',
    main: fixPath('client/app.js'),
    developmentMode: config.isDev,
    libraries: [
    ],
    stylesheets: [
      fixPath('public/css/bootstrap.css'),
      fixPath('public/css/app.css')
    ],
    browserify: {
      debug: false
    },
    beforeBuildJS: function () {
      // This re-builds our template files from jade each time the app's main
      // js file is requested. Which means you can seamlessly change jade and
      // refresh in your browser to get new templates.
      if (config.isDev) {
        templatizer(fixPath('templates'), fixPath('client/templates.js'));
      }
    },
    beforeBuildCSS: function (done) {
      // This re-builds css from stylus each time the app's main
      // css file is requested. Which means you can seamlessly change stylus files
      // and see new styles on refresh.
      if (config.isDev) {
        stylizer({
          infile: fixPath('public/css/app.styl'),
          outfile: fixPath('public/css/app.css'),
          development: true
        }, done);
      } else {
        done();
      }
    }
  },
  server: app
});


// listen for incoming http requests on the port as specified in our config
app.listen(config.http.port);
console.log('Listening and serving on :' + config.http.port);
