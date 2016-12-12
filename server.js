const express = require('express')
const path = require('path')
const app = express()
const dev_config = require('./dev_config.json')

var PORT = dev_config.http.port
var HOST = dev_config.http.listen

var URL = 'http://' + HOST + ':' + PORT

// serve static assets normally
app.use(express.static(__dirname + '/public'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, './public', 'index.html'))
})
								
app.listen(PORT, function () {
	console.log('SERVER IS LISTENING ON: ', URL)
})
 
