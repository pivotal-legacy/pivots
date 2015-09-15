var Reflux = require('reflux');
var FaceActions = require('../actions/FaceActions');
var Api = require('../utils/Api');

var FaceStore = Reflux.createStore({
  listenables: [FaceActions],
  faceList: [],

  fetchAll: function () {
    Api.get('/employees')
      .then(function(response) {
        this.faceList = response.body;
        this.trigger(this.faceList);
      }.bind(this))
      .fail(function() {})
      .done();
  }
});

module.exports = FaceStore;
