'use strict';

var React = require('react');
var request = require('superagent');
var _ = require('lodash');
var Face = require('./Face');

var Directory = React.createClass({
  statics: {
    willTransitionTo: function (transition) {
      if (window.sessionStorage.getItem('savedJwt') === undefined) {
        transition.redirect('/login');
      }
    }
  },

  getInitialState: function() {
    return {
      pivots: []
    };
  },

  componentDidMount: function() {
    request.get('http://localhost:8081/employees')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-AUTH-TOKEN', window.sessionStorage.getItem('savedJwt'))
      .end(function(err, result) {
        if (this.isMounted()) {
          this.setState({
            pivots: result.body
          });
        }
      }.bind(this));
  },

  render: function() {
    var pivotFaces = _.map(this.state.pivots, function(pivot) {
      return (
        <Face key={pivot.id} pivot={pivot} />
      );
    });

    return (
      <div className='container'>
        {pivotFaces}
      </div>
    );
  }
});

module.exports = Directory;