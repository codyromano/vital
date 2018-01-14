const baseConfig = require('./webpack.config.js');

// The webpack-build module requires us to export a function
// that returns an object literal.
module.exports = function() {
  return baseConfig;
};
