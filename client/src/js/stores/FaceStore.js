var Reflux = require('reflux');
var FaceActions = require('../actions/FaceActions');
var Api = require('../utils/Api');
var _ = require('lodash');

var FaceStore = Reflux.createStore({
  listenables: [FaceActions],
  faceList: [],

  fetchAll: function () {
    Api.get('/employees')
      .then(function (response) {
        this.faceList = response.body;
        this.trigger(this.faceList);
      }.bind(this))
      .done();
  },

  search: function (searchName) {
    if (_.isEmpty(searchName)) {
      this.trigger(this.faceList);
    } else {
      var results = _.filter(this.faceList, function (f) {
        return new RegExp(searchName, 'i').test(f.firstName) ||
          (new RegExp(searchName, 'i').test(f.lastName));
      });

      this.trigger(results);
    }
  }
});

module.exports = FaceStore;
