'use strict';

var webpack = require('webpack');

var envPlugin = new webpack.DefinePlugin({
  __API_SERVER__: JSON.stringify(process.env.API_SERVER)
});

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/js/'
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
  },

  plugins: [envPlugin]

};
