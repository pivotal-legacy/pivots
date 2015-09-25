var Reflux = require('reflux');
var FaceActions = require('../actions/FaceActions');
var Api = require('../utils/Api');
var _ = require('lodash');

var FaceStore = Reflux.createStore({
  listenables: [FaceActions],
  faces: [],

  getInitialState: function () {
    return this.faces;
  },

  fetchAll: function () {
    Api.get('/employees')
      .then(function (response) {
        this.faces = response.data;
        this.trigger(this.faces);
      }.bind(this));
  },

  search: function (searchName) {
    if (_.isEmpty(searchName)) {
      this.trigger(this.faces);
    } else {
      var results = _.filter(this.faces, function (f) {
        return new RegExp(searchName, 'i').test(f.firstName) ||
          (new RegExp(searchName, 'i').test(f.lastName));
      });

      this.trigger(results);
    }
  }
});

module.exports = FaceStore;
