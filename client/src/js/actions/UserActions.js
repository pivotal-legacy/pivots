var Reflux = require('reflux');

var UserActions = Reflux.createActions([
  'login',
  'logout'
]);

module.exports = UserActions;
