var Reflux = require('reflux');
var request = require('superagent');
var UserActions = require('../actions/UserActions');
var API_SERVER = require('../constants/EnvConstants').API_SERVER;

var UserStore = Reflux.createStore({
  listenables: [UserActions],

  login: function (username, password) {
    var that = this;

    request
      .post(API_SERVER + '/login')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({username: username, password: password})
      .end(function (err, res) {
        if (res.ok) {
          window.localStorage.setItem('savedJwt', res.headers['x-auth-token']);
          that.trigger();
        }
      }.bind(this));
  },

  getToken: function() {
    return window.localStorage.getItem('savedJwt');
  },

  isLoggedIn: function() {
    return (this.getToken() !== null);
  }
});

module.exports = UserStore;
