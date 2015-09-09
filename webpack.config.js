'use strict';

var webpack = require('webpack');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/scripts/'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader'
      }
    ]
  }

};
