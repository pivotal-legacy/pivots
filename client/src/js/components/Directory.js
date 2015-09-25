'use strict';

var Reflux = require('reflux');
var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');
var Face = require('./Face');
var FaceStore = require('../stores/FaceStore');
var FaceActions = require('../actions/FaceActions');
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');
var LocalStorage = require('../utils/LocalStorage');

var Directory = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.connect(FaceStore, 'faceStore'),
    Reflux.listenTo(UserStore, 'onUserStoreChange'),
    Router.Navigation
  ],

  statics: {
    willTransitionTo: function (transition) {
      if (!LocalStorage.get('savedJwt')) {
        transition.redirect('/login'); // routing
      }
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {faceStore: []};
  },

  onUserStoreChange: function () {
    this.transitionTo('/login');
  },

  componentDidMount: function () {
    FaceActions.fetchAll();
  },

  handleLogout: function (e) {
    e.preventDefault();

    UserActions.logout();
  },

  handleChange: function (newValue) {
    FaceActions.search(newValue);
  },

  render: function () {
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
            <a onClick={this.handleLogout} href="#">Logout</a>
          </div>
        </div>

        <form>
          <input id="search_input" type="text" placeholder="search" valueLink={{requestChange: this.handleChange}}/>
        </form>

        {pivotFaces}
      </div>
    );
  }
});

module.exports = Directory;
