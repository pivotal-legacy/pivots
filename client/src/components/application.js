'use strict';

var PivotsReactApp = require('./PivotsReactApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={PivotsReactApp}>
    <Route name="/" handler={PivotsReactApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
