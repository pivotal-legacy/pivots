var Q = require('Q'),
  Request = require('superagent'),
  LocalStorage = require('../utils/LocalStorage'),
  contentType = 'application/json',
  accept = 'application/json',
  API_SERVER = require('../constants/EnvConstants').API_SERVER;

var Api = {
  get: function(route) {
    var url = API_SERVER + route;

    return Q.Promise(function(resolve, reject) {
      Request.get(url)
        .set('Content-Type', contentType)
        .set('Accept', accept)
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
        .set('Content-Type', contentType)
        .set('Accept', accept)
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
