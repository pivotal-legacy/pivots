import Reflux from 'reflux';
import FaceActions from '../actions/FaceActions';
import Api from '../utils/Api';
import _ from 'lodash';

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
