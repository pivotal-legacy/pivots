describe('Login', function () {
  var Login = require('../../src/js/components/Login');
  var React = require('react/addons');
  var AuthActions = require('../../src/js/actions/AuthActions');
  var TestUtils = React.addons.TestUtils;
  var renderedComponent;

  beforeEach(function() {
    renderedComponent = TestUtils.renderIntoDocument(React.createElement(Login, {}));
  });

  afterEach(function () {
    React.unmountComponentAtNode(React.findDOMNode(renderedComponent).parentNode);
  });

  it('triggers a login user action', function () {
    spyOn(AuthActions, 'login');

    var form = React.findDOMNode(renderedComponent.refs.submit);
    var username = React.findDOMNode(renderedComponent.refs.username);
    var password = React.findDOMNode(renderedComponent.refs.password);

    TestUtils.Simulate.change(username, {target: {value: 'user'}});
    TestUtils.Simulate.change(password, {target: {value: 'password'}});
    TestUtils.Simulate.submit(form);

    expect(AuthActions.login).toHaveBeenCalledWith('user', 'password');
  });
});
