import React from 'react/addons';
import Reflux from 'reflux';
import Router from 'react-router';

import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

var Login = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.listenTo(AuthStore, 'onAuthStoreChange'),
    Router.History
  ],

  getInitialState: function() {
    return {username: undefined, password: undefined};
  },

  onAuthStoreChange: function () {
    this.history.pushState(null, '/');
  },

  handleSubmit: function (e) {
    e.preventDefault();

    AuthActions.login(this.state.username, this.state.password);
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
