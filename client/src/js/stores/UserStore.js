var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');
var Api = require('../utils/Api');
var LocalStorage = require('../utils/LocalStorage');

var UserStore = Reflux.createStore({
  listenables: [UserActions],

  login: function(username, password) {
    Api.post('/login', {username: username, password: password})
      .then(function(res) {
        LocalStorage.set('savedJwt', res.headers['x-auth-token']);
        this.trigger();
      }.bind(this))
      .fail(function() {})
      .done();
  },

  getToken: function() {
    return window.localStorage.getItem('savedJwt');
  },

  isLoggedIn: function() {
    return (this.getToken() !== null);
  }
});

module.exports = UserStore;
