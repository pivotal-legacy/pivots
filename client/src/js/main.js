import React from 'react';
import {Router, Route} from 'react-router';

import Directory from './components/Directory';
import Login from './components/Login';
import RouteNotFound from './components/RouteNotFound';
import LocalStorage from './utils/LocalStorage';

// CSS
import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.css';

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
