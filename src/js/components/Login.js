var React = require('react');
var Reflux = require('reflux');

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var Login = React.createClass({
  mixins: [
    Reflux.listenTo(UserStore, 'onUserStoreChange')
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  onUserStoreChange: function () {
    this.context.router.transitionTo('/');
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var username = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    UserActions.login(username, password);
  },

  render: function () {
    return (
      <div className="container">
        <h1>Login</h1>

        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="sr-only" htmlFor="email">Email address</label>
            <input type="text" className="form-control" id="email" ref="email" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" ref="password" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-default">Sign in</button>
        </form>
      </div>
    );
  }
});

module.exports = Login;
