'use strict';

var Reflux = require('reflux');
var React = require('react/addons');
var Router = require('react-router');
var _ = require('lodash');
var Face = require('./Face');
var FaceStore = require('../stores/FaceStore');
var FaceActions = require('../actions/FaceActions');
var AuthStore = require('../stores/AuthStore');
var AuthActions = require('../actions/AuthActions');

var Directory = React.createClass({
  mixins: [
    Reflux.connect(FaceStore, 'faceStore'),
    Reflux.listenTo(AuthStore, 'onAuthStoreChange'),
    Router.History
  ],

  onAuthStoreChange: function () {
    this.history.pushState(null, '/login');
  },

  componentDidMount: function () {
    FaceActions.fetchAll();
  },

  handleLogout: function (e) {
    e.preventDefault();

    AuthActions.logout();
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

module.exports = Directory;
