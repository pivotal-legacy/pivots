'use strict';

var webpack = require('webpack');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/scripts/'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],

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
