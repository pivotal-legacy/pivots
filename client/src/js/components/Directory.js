'use strict';

var Reflux = require('reflux');
var React = require('react');
var _ = require('lodash');
var Face = require('./Face');
var FaceStore = require('../stores/FaceStore');
var FaceActions = require('../actions/FaceActions');

var Directory = React.createClass({
  mixins: [Reflux.connect(FaceStore, 'faceStore')],
  statics: {
    willTransitionTo: function (transition) {
      if (!window.localStorage.getItem('savedJwt')) {
        transition.redirect('/login');
      }
    }
  },

  componentDidMount: function () {
    FaceActions.fetchAll();
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
        <h1>Directory</h1>
        {pivotFaces}
      </div>
    );
  }
});

module.exports = Directory;
