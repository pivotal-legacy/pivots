import Reflux from 'reflux';
import React from 'react/addons';
import {History} from 'react-router';
import _ from 'lodash';
import Face from './Face';
import FaceStore from '../stores/FaceStore';
import FaceActions from '../actions/FaceActions';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';

var Directory = React.createClass({
  mixins: [
    Reflux.connect(FaceStore, 'faceStore'),
    Reflux.listenTo(AuthStore, 'onAuthStoreChange'),
    History
  ],

  onAuthStoreChange() {
    this.history.pushState(null, '/login');
  },

  componentDidMount() {
    FaceActions.fetchAll();
  },

  handleLogout(e) {
    e.preventDefault();

    AuthActions.logout();
  },

  handleChange(newValue) {
    FaceActions.search(newValue);
  },

  render() {
    var pivotFaces = _.map(this.state.faceStore, function (pivot) {
      return (
        <Face key={pivot.id} pivot={pivot}/>
      );
    });

    return (
      <div className="container">
        <div className="bg-brand row">
          <div className="col-md-10">
            <h2 className="neutral-1">Directory</h2>
          </div>
          <div className="col-md-2 aligner txt-r" style={{height: '53px'}}>
            <a className="aligner-item text-uppercase neutral-1" onClick={this.handleLogout} href="#" ref="logout">Logout</a>
          </div>
        </div>

        <div className="bg-neutral-2 row">
          <div className="col-md-12">
            <form>
              <input type="text"
                     className="pull-right"
                     placeholder="Search by Name"
                     id="search_input"
                     ref="search"
                     valueLink={{requestChange: this.handleChange}}/>
            </form>
          </div>
        </div>

        {pivotFaces}
      </div>
    );
  }
});

export default Directory;
