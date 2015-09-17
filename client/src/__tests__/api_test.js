// __tests__/sum-test.js
jest.dontMock('../js/utils/api');

describe('Api', function() {
  describe('#get', function() {
    it('makes a GET request', function() {
      var Api = require('../js/utils/api');

      Api.get('/path/to/resource').done();

      // This is not  working.
      expect(this.requests[0]).toBeDefined();
    });
  });
});