require('jasmine-ajax');
require('es6-promise').polyfill();

describe('Api', function () {
  var Api = require('../../src/js/utils/Api');
  var LocalStorage = require('../../src/js/utils/LocalStorage');

  beforeEach(function () {
    jasmine.Ajax.install();
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  it('sends GET requests', function (done) {
    spyOn(LocalStorage, 'get').and.returnValue('secret-jwt-token');

    Api.get('/employees');

    setTimeout(function () {
      var request = jasmine.Ajax.requests.mostRecent();

      expect(request.url).toBe('base-url/employees');
      expect(request.method).toBe('GET');
      expect(request.requestHeaders['Accept']).toBe('application/json');
      expect(request.requestHeaders['X-AUTH-TOKEN']).toBe('secret-jwt-token');

      done();
    }, 0);
  });

  it('sends POST requests', function (done) {
    Api.post('/login', {username: 'username', password: 'password'});

    setTimeout(function () {
      var request = jasmine.Ajax.requests.mostRecent();

      expect(request.url).toBe('base-url/login');
      expect(request.method).toBe('POST');
      expect(request.requestHeaders['Accept']).toBe('application/json');
      expect(request.requestHeaders['Content-Type']).toBe('application/json');
      expect(request.data()).toEqual({username: 'username', password: 'password'});

      done();
    }, 0);
  });
});
