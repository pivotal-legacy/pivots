'use strict';

var webpack = require('webpack');
var config  = require('./webpack.config');

config.plugins = config.plugins.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.NoErrorsPlugin()
]);

module.exports = config;
