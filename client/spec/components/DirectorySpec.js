import Directory from '../../src/js/components/Directory';
import React from 'react/addons';
import AuthActions from '../../src/js/actions/AuthActions';
import FaceActions from '../../src/js/actions/FaceActions';

describe('Directory', () => {
  const TestUtils = React.addons.TestUtils;
  let renderedDirectory;

  beforeEach(() => {
    spyOn(FaceActions, 'fetchAll');

    renderedDirectory = TestUtils.renderIntoDocument(React.createElement(Directory, {}));
  });

  afterEach(() => {
    React.unmountComponentAtNode(React.findDOMNode(renderedDirectory).parentNode);
  });

  it('sets the initial state to an empty array', () => {
    expect(renderedDirectory.state.faceStore).toEqual([]);
  });

  it('fetches all faces from the store', () => {
    expect(FaceActions.fetchAll).toHaveBeenCalled();
  });

  it('triggers a user action when logout is clicked', () => {
    spyOn(AuthActions, 'logout');
    let logoutButton = React.findDOMNode(renderedDirectory.refs.logout);

    TestUtils.Simulate.click(logoutButton);

    expect(AuthActions.logout).toHaveBeenCalled();
  });

  it('triggers a face action when the search input value is changed', () => {
    spyOn(FaceActions, 'search');
    let searchInput = React.findDOMNode(renderedDirectory.refs.search);

    searchInput.value = 'Danny';
    TestUtils.Simulate.change(searchInput);

    expect(FaceActions.search).toHaveBeenCalledWith('Danny');
  });
});
