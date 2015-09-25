import Reflux from 'reflux';
import React from 'react/addons';
import Router from 'react-router';
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
    Router.History
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
        <div className="row">
          <div className="col-md-10">
            <h1>Directory</h1>
          </div>
          <div className="col-md-2">
            <a onClick={this.handleLogout} href="#" ref="logout">Logout</a>
          </div>
        </div>

        <form>
          <input type="text"
                 placeholder="search"
                 id="search_input"
                 ref="search"
                 valueLink={{requestChange: this.handleChange}}/>
        </form>

        {pivotFaces}
      </div>
    );
  }
});

export default Directory;
