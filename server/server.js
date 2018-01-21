'use strict';

const express = require('express');
const expressProxy = require('express-http-proxy');
const url = require('url');
const build = require('webpack-build');
const path = require('path');
const config = require('./serverConfig');
 
build({
  config: path.join(__dirname, '../webpackProd.config.js'),
  watch: false
}, function(err, data) {
  if (err) {
    console.error(err);
  }
});

// App
const app = express();
app.use(express.static('public'));

app.listen(config.port, config.host);

console.log(`Running on http://${config.host}:${config.port}`);
