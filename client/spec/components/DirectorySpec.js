'use strict';

describe('Directory', function () {
  var Directory = require('../../src/js/components/Directory');
  var React = require('react/addons');
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
});
