describe('Api', function () {
  require('jasmine-ajax');
  var Api = require('../../src/js/utils/Api');
  var onSuccess;
  var onFailure;

  beforeEach(function () {
    jasmine.Ajax.install();

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

    var successResponse = {
      success: {
        status: 200,
        responseText: '[{"id": 1}, {"id": 2}]'
      }
    };

    //request.respondWith(successResponse);
    //
    //expect(onSuccess).toHaveBeenCalled();

    //expect(successArgs.length).toEqual(1);
    //expect(successArgs[0]).toEqual('[{"id": 1}, {"id": 2}]');
  });
})
;
