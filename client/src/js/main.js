'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Directory = require('./components/Directory');
var Login = require('./components/Login');
var RouteNotFound = require('./components/RouteNotFound');

// CSS
require('../css/main.css');
require('bootstrap/dist/css/bootstrap.css');

var routes = (
  <Route>
    <DefaultRoute handler={Directory}/>
    <Route name="login" handler={Login}/>
    <NotFoundRoute handler={RouteNotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
