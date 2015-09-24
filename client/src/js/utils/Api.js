var axios = require('axios');
var LocalStorage = require('../utils/LocalStorage');
var API_SERVER = require('../constants/EnvConstants').API_SERVER;

var Api = {
  get: function(route) {
    var url = API_SERVER + route;

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
    var url = API_SERVER + path;

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
