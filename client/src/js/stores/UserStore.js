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
      .done();
  },

  logout: function() {
    LocalStorage.remove('savedJwt');
    this.trigger();
  }
});

module.exports = UserStore;
