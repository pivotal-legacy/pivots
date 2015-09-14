var Reflux = require('reflux');
var request = require('superagent');
var FaceActions = require('../actions/FaceActions');
var API_SERVER = require('../constants/EnvConstants').API_SERVER;

var FaceStore = Reflux.createStore({
  listenables: [FaceActions],
  faceList: [],

  fetchAll: function () {

    request.get(API_SERVER + '/employees')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-AUTH-TOKEN', window.localStorage.getItem('savedJwt'))
      .end(function (err, result) {
        this.faceList = result.body;
        this.trigger(this.faceList);
      }.bind(this));
  }
});

module.exports = FaceStore;
