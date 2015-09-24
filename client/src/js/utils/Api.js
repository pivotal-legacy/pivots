var axios = require('axios');
var LocalStorage = require('../utils/LocalStorage');
var EnvConstants = require('../constants/EnvConstants');

var Api = {
  get: function(route) {
    var url = EnvConstants.getApiServerUrl() + route;

    return axios({
      url: url,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-AUTH-TOKEN': LocalStorage.get('savedJwt')
      }
    });
  },

  post: function(path, data) {
    var url = EnvConstants.getApiServerUrl() + path;

    return axios({
      url: url,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: data
    });
  }
};

module.exports = Api;
