'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Directory = require('./components/Directory');
var Login = require('./components/Login');
var RouteNotFound = require('./components/RouteNotFound');
var LocalStorage = require('./utils/LocalStorage');

// CSS
require('../css/main.css');
require('bootstrap/dist/css/bootstrap.css');

function requireAuth(nextState, redirectTo) {
  if (!LocalStorage.get('savedJwt')) {
    redirectTo('/login', null, {nextPathname: nextState.location.pathname});
  }
}

var routes = (
  <Router>
    <Route path="/" component={Directory} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="*" component={RouteNotFound} />
  </Router>
);

React.render(routes, document.getElementById('content'));
