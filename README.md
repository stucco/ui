NCDOC: alert-vis
================

Web app for visualizing IDS alerts.

## Usage

1. Install [elasticsearch](http://www.elasticsearch.org/overview/elkdownloads/). On a Mac, use [homebrew](http://brew.sh/): `brew install elasticsearch`. On Ubuntu or other distributions, see [package manager instructions](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/setup-repositories.html).
1. Download [node.js](http://nodejs.org/). On a Mac, use [homebrew](http://brew.sh/): `brew install node`. On Ubuntu or other distributions, see [package manager instructions](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#debian-and-ubuntu-based-linux-distributions).
1. Install dependencies and load data: `npm install`
1. Start the web server: `npm start`
1. Open http://localhost:3000 in a browser.

Use `NODE_ENV` environment variable to set appropriate config (`dev` by default), which will determine the configuraiton file to be used (`environment_config.json`).
