import axios from 'axios';
import LocalStorage from '../utils/LocalStorage';
import EnvConstants from '../constants/EnvConstants';

function buildUrl(path) {
  return EnvConstants.getApiServerUrl() + path;
}

var Api = {
  get: function(path) {
    return axios({
      url: buildUrl(path),
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-AUTH-TOKEN': LocalStorage.get('savedJwt')
      }
    });
  },

  post: function(path, data) {
    return axios({
      url: buildUrl(path),
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
