describe('Api', function () {
  require('jasmine-ajax');
  var Api = require('../../src/js/utils/Api');
  var onSuccess;
  var onFailure;

  beforeEach(function () {
    onSuccess = jasmine.createSpy('onSuccess');
    onFailure = jasmine.createSpy('onFailure');
  });

  it('sends GET requests', function () {
    Api.get('/employees')
      .then(onSuccess)
      .catch(onFailure);

    request = jasmine.Ajax.requests.mostRecent();

    expect(request.url).toBe('base-url/employees');
    expect(request.method).toBe('GET');
  });
});
