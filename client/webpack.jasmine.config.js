'use strict';

var webpack = require('webpack');
//noinspection JSUnresolvedFunction
var envPlugin = new webpack.DefinePlugin({
  __API_SERVER__: JSON.stringify(process.env.API_SERVER)
});

var config = {
  output: {
    filename: 'spec.js'
  },

  plugins: [envPlugin]
};

module.exports = config;
