'use strict';

const express = require('express');
const build = require('webpack-build');
const path = require('path');
 
build({
  config: path.join(__dirname, 'webpackProd.config.js'),
  watch: false
}, function(err, data) {
  console.log('err: ', err);
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('public'));
app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
