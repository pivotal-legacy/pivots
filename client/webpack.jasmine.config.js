'use strict';

var webpack = require('webpack');
var envPlugin = new webpack.DefinePlugin({
  __API_SERVER__: JSON.stringify(process.env.API_SERVER)
});

var config = {
  output: {
    filename: 'spec.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: [envPlugin]
};

module.exports = config;
