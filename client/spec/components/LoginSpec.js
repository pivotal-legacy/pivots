import Login from '../../src/js/components/Login';
import React from 'react/addons';
import AuthActions from '../../src/js/actions/AuthActions';

describe('Login', () => {
  const TestUtils = React.addons.TestUtils;
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = TestUtils.renderIntoDocument(React.createElement(Login, {}));
  });

  afterEach(() => {
    React.unmountComponentAtNode(React.findDOMNode(renderedComponent).parentNode);
  });

  it('triggers a login user action', () => {
    spyOn(AuthActions, 'login');

    let form = React.findDOMNode(renderedComponent.refs.submit);
    let username = React.findDOMNode(renderedComponent.refs.username);
    let password = React.findDOMNode(renderedComponent.refs.password);

    TestUtils.Simulate.change(username, {target: {value: 'user'}});
    TestUtils.Simulate.change(password, {target: {value: 'password'}});
    TestUtils.Simulate.submit(form);

    expect(AuthActions.login).toHaveBeenCalledWith('user', 'password');
  });
});
