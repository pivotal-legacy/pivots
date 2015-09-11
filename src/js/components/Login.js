var React = require('react');
var request = require('superagent');

var API_SERVER = 'http://localhost:8081';

var Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var username = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    request
      .post(API_SERVER + '/login')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({username: username, password: password})
      .end(function(err, res){
        if (res.ok) {
          window.localStorage.setItem('savedJwt', res.headers['x-auth-token']);
          this.context.router.transitionTo('/');
        }
      }.bind(this));
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