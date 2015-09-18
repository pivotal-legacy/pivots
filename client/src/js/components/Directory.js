'use strict';

var Reflux = require('reflux');
var React = require('react');
var _ = require('lodash');
var Face = require('./Face');
var FaceStore = require('../stores/FaceStore');
var FaceActions = require('../actions/FaceActions');

var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');

var LocalStorage = require('../utils/LocalStorage');

var Directory = React.createClass({
  mixins: [
    Reflux.connect(FaceStore, 'faceStore'),
    Reflux.listenTo(UserStore, 'onUserStoreChange')
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo: function (transition) {
      if (!LocalStorage.get('savedJwt')) {
        transition.redirect('/login');
      }
    }
  },

  onUserStoreChange: function () {
    this.context.router.transitionTo('/login');
  },

  componentDidMount: function () {
    FaceActions.fetchAll();
  },

  handleLogout: function (e) {
    e.preventDefault();

    UserActions.logout();
  },

  render: function () {
    var pivotFaces = [];
    if (this.state.faceStore) {
      pivotFaces = _.map(this.state.faceStore, function (pivot) {
        return (
          <Face key={pivot.id} pivot={pivot}/>
        );
      });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h1>Directory</h1>
          </div>
          <div className="col-md-2">
            <a onClick={this.handleLogout}>Logout</a>
          </div>
        </div>

        {pivotFaces}
      </div>
    );
  }
});

module.exports = Directory;
