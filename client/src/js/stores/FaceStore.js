import Reflux from 'reflux';
import FaceActions from '../actions/FaceActions';
import _ from 'lodash';

var FaceStore = Reflux.createStore({
  listenables: [FaceActions],
  faces: [],

  getInitialState() {
    return this.faces;
  },

  fetchAllCompleted(faces) {
    this.faces = faces;
    this.trigger(this.faces);
  },

  search(searchName) {
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

export default FaceStore;
