import React from 'react';
import {Router, Route} from 'react-router';

import Directory from './components/Directory';
import Login from './components/Login';
import RouteNotFound from './components/RouteNotFound';

import {requireAuth} from './utils/Authentication';

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/main.scss';

var routes = (
  <Router>
    <Route path="/" component={Directory} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="*" component={RouteNotFound} />
  </Router>
);

React.render(routes, document.getElementById('content'));
