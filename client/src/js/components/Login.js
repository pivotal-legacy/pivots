import React from 'react/addons';
import Reflux from 'reflux';
import {History} from 'react-router';

import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

var Login = React.createClass({
  mixins: [
    Reflux.listenTo(AuthStore, 'onAuthStoreChange'),
    History
  ],

  getInitialState() {
    return {username: '', password: ''};
  },

  onAuthStoreChange() {
    this.history.pushState(null, '/');
  },

  handleSubmit(e) {
    e.preventDefault();

    AuthActions.login(this.state.username, this.state.password);
  },

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  },

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  },

  render() {
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
                   onChange={this.handleUsernameChange} />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="password">Password</label>
            <input type="password"
                   id="password"
                   ref="password"
                   className="form-control"
                   placeholder="Password"
                   onChange={this.handlePasswordChange} />
          </div>
          <button type="submit" className="btn btn-default">Sign in</button>
        </form>
      </div>
    );
  }
});

export default Login;
