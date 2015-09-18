var React = require('react/addons');
var Reflux = require('reflux');

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var Login = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.listenTo(UserStore, 'onUserStoreChange')
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {username: undefined, password: undefined};
  },

  onUserStoreChange: function () {
    this.context.router.transitionTo('/');
  },

  handleSubmit: function (e) {
    e.preventDefault();

    UserActions.login(this.state.username, this.state.password);
  },

  render: function () {
    return (
      <div className="container">
        <h1>Login</h1>

        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="sr-only" htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Username" valueLink={this.linkState('username')} />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" valueLink={this.linkState('password')} />
          </div>
          <button type="submit" className="btn btn-default">Sign in</button>
        </form>
      </div>
    );
  }
});

module.exports = Login;
