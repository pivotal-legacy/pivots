'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var Login = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.listenTo(UserStore, 'onUserStoreChange'),
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {username: undefined, password: undefined};
  },

  onUserStoreChange: function () {
    this.transitionTo('/');
  },

  handleSubmit: function (e) {
    e.preventDefault();

    UserActions.login(this.state.username, this.state.password);
  },

  render: function () {
    return (
      <div className="container">
        <h1>Login</h1>

        <form className="form-inline" onSubmit={this.handleSubmit} ref="submit">
          <div className="form-group">
            <label className="sr-only" htmlFor="username">Username</label>
            <input type="text"
                   id="username"
                   placeholder="Username"
                   ref="username"
                   className="form-control"
                   valueLink={this.linkState('username')} />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="password">Password</label>
            <input type="password"
                   id="password"
                   ref="password"
                   className="form-control"
                   placeholder="Password"
                   valueLink={this.linkState('password')} />
          </div>
          <button type="submit" className="btn btn-default">Sign in</button>
        </form>
      </div>
    );
  }
});

module.exports = Login;
