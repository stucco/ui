# User Interface

## Prerequisites
* [Bower](http://bower.io) installed for Polymer package management
* [http-server](https://www.npmjs.org/package/http-server) installed to serve the ui locally
* Titan-Rexster server started at http://localhost:8182

## Build and Start Locally
1. Open a terminal and cd into the ui directory
2. Run the following command to download all the dependencies:
	
	bower update
	
3. To start the ui server run:

	http-server ./
	
4. Open a Chrome window and go to the URL:

	http://0.0.0.0:8080
	

## Usage
### Query Screen
Enter a query in the format <vertexType_two-letter_representation>:<property>=<value>,<property>=<value>, etc. The '=' symbol could also be a '<' or '>' symbol. All queries must have at least the vertex type portion of the query.

Example - Find all malware that were discovered after 2013.
MA:discoveryDate>2013-00-00 00:00:00

### Results Screen
Click on a table row to view more details about the vertex and see the edges attached to the vertex.

