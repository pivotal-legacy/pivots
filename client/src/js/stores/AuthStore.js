var Reflux = require('reflux');
var AuthActions = require('../actions/AuthActions');
var Api = require('../utils/Api');
var LocalStorage = require('../utils/LocalStorage');

var AuthStore = Reflux.createStore({
  listenables: [AuthActions],

  login: function (username, password) {
    Api.post('/login', {username: username, password: password})
      .then(function (res) {
        LocalStorage.set('savedJwt', res.headers['x-auth-token']);
        this.trigger();
      }.bind(this));
  },

  logout: function () {
    LocalStorage.remove('savedJwt');
    this.trigger();
  }
});

module.exports = AuthStore;
