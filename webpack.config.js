'use strict';

var webpack = require('webpack');

var HtmlWebpack = require('html-webpack-plugin');
var htmlWebPackPlugin = new HtmlWebpack({
  template: 'src/index.html',
  inject: 'body'
});

var envPlugin = new webpack.DefinePlugin({
  __API_SERVER__: JSON.stringify(process.env.API_SERVER)
});

module.exports = {

  output: {
    filename: 'application.[hash].js'
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
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: [envPlugin, htmlWebPackPlugin]

};
