'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App');
var Login = require('./components/Login');

// CSS
require('normalize.css');
require('./../css/main.css');

var routes = (
  <Route>
    <DefaultRoute handler={App}/>
    <Route name="login" handler={Login}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
