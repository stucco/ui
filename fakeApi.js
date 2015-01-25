var _ = require('underscore');


var nodes = [
  {
    gid: '1',
    name: 'CVE-2014-3127',
    nodeType: 'vulnerability',
    desc: 'this is a long description of an ssl vulnerability.'
  },
  {
    gid: '2',
    name: 'CVE-2014-54321',
    nodeType: 'vulnerability',
    desc: 'this is a long description of a buffer overflow vulnerability.'
  },
  {
    gid: '3',
    name: 'CVE-2014-456132',
    nodeType: 'vulnerability',
    desc: 'this is a long description of an SSH vulnerability.'
  },
  {
    gid: '4',
    name: 'mal-1234',
    nodeType: 'malware',
    desc: 'this is a long description of a very bad piece of malware.'
  },
  {
    gid: '5',
    name: 'mal-5678',
    nodeType: 'malware',
    desc: 'this is a long description of a kind of bad piece of malware.'
  },
  {
    gid: '6',
    name: 'mal-9012',
    nodeType: 'malware',
    desc: 'this is a long description of a terrible piece of malware.'
  }
];
var gid = '7';

function get(id) {
  return _.findWhere(nodes, {gid: id});
}

// Search query should be in format of q=text or key1=val1&key2=val2 like this:
//  Key/Value search: curl :3000/api/search\?type\=vulnerability
exports.search = function (req, res) {
  var q = req.query;

  // this needs much better checking of query
  // console.log('search keys: ' + _.keys(q));
  var searchResults = _.where(nodes, q);

  res.send(searchResults);
};

exports.getNode = function (req, res) {
  var found = get(req.params.id);
  // console.log(found)
  res.status(found ? 200 : 404);
  res.send(found);
};

exports.updateNode = function (req, res) {
  var found = get(req.params.id);
  if (found) _.extend(found, req.body);
  res.status(found ? 200 : 404);
  res.send(found);
};

