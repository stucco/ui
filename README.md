# User Interface

## Prerequisites
* [Bower](http://bower.io) installed for Polymer package management
* [http-server](https://www.npmjs.org/package/http-server) installed to serve the ui locally
* Titan-Rexster server started at http://localhost:8182

### Installing and Configuring Titan-Rexster Server
1. Download [Titan-Rexster server](https://github.com/thinkaurelius/titan/wiki/Downloads) - use version 0.4.4 referred to as "Titan Server (All + Rexster)"
2. Open a Terminal, cd to the Titan download, and unzip it
3. Move the server directory to another location, if desired
4. To start the server:

	titan-server-0.4.4/bin/titan.sh start
	
5. Open a Chrome window and go to the URL:

	http://localhost:8182/doghouse/main/graph/graph
	
6. Click the section labeled "tp:gremlin"
7. In the "script" textbox type:

	g.loadGraphSON('path-to-ui-directory/resources/metasploit_short.json')
	
8. Click "Execute"

## Build and Start Locally
1. Open a terminal and cd into the ui directory
2. To start the ui server run:

	http-server ./
	
3. Open a Chrome window and go to the URL:

	http://0.0.0.0:8080
	

## Usage
### Query Screen
Enter a query in the format <vertexType_two-letter_representation>:<property>=<value>,<property>=<value>, etc. The '=' symbol could also be a '<' or '>' symbol. All queries must have at least the vertex type portion of the query.

Example - Find all malware that were discovered after 2013.
MA:discoveryDate>2013-00-00 00:00:00

### Results Screen
Click on a table row to view more details about the vertex and see the edges attached to the vertex.

