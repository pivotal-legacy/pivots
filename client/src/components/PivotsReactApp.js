'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

global.jQuery = require('jquery');

// CSS
require('bootstrap/dist/css/bootstrap.css');
require('../styles/application.css');

var imageURL = require('../images/yeoman.png');

var PivotsReactApp = React.createClass({
  render: function() {
    return (
      <div className="main">
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = PivotsReactApp;
