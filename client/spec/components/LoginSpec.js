'use strict';

describe('Login', function () {
  var Login = require('../../src/js/components/Login');
  var React = require('react/addons');
  var UserActions = require('../../src/js/actions/UserActions');
  var TestUtils = React.addons.TestUtils;
  var renderedComponent;

  beforeEach(function() {
    renderedComponent = TestUtils.renderIntoDocument(React.createElement(Login, {}));
  });

  afterEach(function () {
    React.unmountComponentAtNode(React.findDOMNode(renderedComponent).parentNode);
  });

  it('triggers a login user action', function () {
    spyOn(UserActions, 'login');

    var form = React.findDOMNode(renderedComponent.refs.submit);
    var username = React.findDOMNode(renderedComponent.refs.username);
    var password = React.findDOMNode(renderedComponent.refs.password);

    TestUtils.Simulate.change(username, {target: {value: 'user'}});
    TestUtils.Simulate.change(password, {target: {value: 'password'}});
    TestUtils.Simulate.submit(form);

    expect(UserActions.login).toHaveBeenCalledWith('user', 'password');
  });
});
