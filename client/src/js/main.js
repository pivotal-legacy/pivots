import React from 'react';
import ReactRouter from 'react-router';
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

import Directory from './components/Directory';
import Login from './components/Login';
import RouteNotFound from './components/RouteNotFound';
import LocalStorage from './utils/LocalStorage';

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
