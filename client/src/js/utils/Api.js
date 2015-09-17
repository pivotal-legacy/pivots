var Q = require('Q'),
  Request = require('superagent'),
  LocalStorage = require('../utils/LocalStorage'),
  API_SERVER = require('../constants/EnvConstants').API_SERVER;

var Api = {
  get: function(route) {
    var url = API_SERVER + route;

    return Q.Promise(function(resolve, reject) {
      Request.get(url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-AUTH-TOKEN', LocalStorage.get('savedJwt'))
        .end(function (err, response) {
          if (response.ok) {
            resolve(response);
          } else {
            reject(response);
          }
        });
    });
  },

  post: function(path, data) {
    var url = API_SERVER + path;

    return Q.Promise(function(resolve, reject) {
      Request.post(url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(data)
        .end(function (err, response) {
          if (response.ok) {
            resolve(response);
          } else {
            reject(response);
          }
        });
    });
  }
};

module.exports = Api;
