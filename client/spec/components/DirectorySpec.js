describe('Directory', function () {
  var Directory = require('../../src/js/components/Directory');
  var React = require('react/addons');
  var AuthActions = require('../../src/js/actions/AuthActions');
  var FaceActions = require('../../src/js/actions/FaceActions');
  var TestUtils = React.addons.TestUtils;
  var renderedDirectory;

  beforeEach(function() {
    spyOn(FaceActions, 'fetchAll');

    renderedDirectory = TestUtils.renderIntoDocument(React.createElement(Directory, {}));
  });

  afterEach(function () {
    React.unmountComponentAtNode(React.findDOMNode(renderedDirectory).parentNode);
  });

  it('sets the initial state to an empty array', function () {
    expect(renderedDirectory.state.faceStore).toEqual([]);
  });

  it('fetches all faces from the store', function () {
    expect(FaceActions.fetchAll).toHaveBeenCalled();
  });

  it('triggers a user action when logout is clicked', function () {
    spyOn(AuthActions, 'logout');
    var logoutButton = React.findDOMNode(renderedDirectory.refs.logout);

    TestUtils.Simulate.click(logoutButton);

    expect(AuthActions.logout).toHaveBeenCalled();
  });

  it('triggers a face action when the search input value is changed', function() {
    spyOn(FaceActions, 'search');
    var searchInput = React.findDOMNode(renderedDirectory.refs.search);

    searchInput.value = 'Danny';
    TestUtils.Simulate.change(searchInput);

    expect(FaceActions.search).toHaveBeenCalledWith('Danny');
  });
});
