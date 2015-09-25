'use strict';

var Reflux = require('reflux');

var AuthActions = Reflux.createActions([
  'login',
  'logout'
]);

module.exports = AuthActions;
