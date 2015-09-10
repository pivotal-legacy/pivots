'use strict';

var React = require('react');
var App = require('./components/App');

require('normalize.css');
require('./../css/main.css');

React.render(<App/>, document.getElementById('content'));
