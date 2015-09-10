'use strict';

var React = require('react');
var Link = require('react-router').Link;

var App = React.createClass({
  render: () => {
    return (
      <div>
        <h1>Hello, World!</h1>
        <Link to="login">Login</Link>
      </div>
    );
  }
});

module.exports = App;
