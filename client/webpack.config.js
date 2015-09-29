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
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [envPlugin, htmlWebPackPlugin]

};
