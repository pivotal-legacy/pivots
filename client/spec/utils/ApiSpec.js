import 'jasmine-ajax';
import {polyfill} from 'es6-promise';

import Api from '../../src/js/utils/Api';
import LocalStorage from '../../src/js/utils/LocalStorage';
import EnvConstants from '../../src/js/constants/EnvConstants';

describe('Api', () => {

  beforeEach(() => {
    polyfill();
    spyOn(EnvConstants, 'getApiServerUrl').and.returnValue('fake-server-url');
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('sends GET requests', (done) => {
    spyOn(LocalStorage, 'get').and.returnValue('secret-jwt-token');

    Api.get('/employees');

    setTimeout(() => {
      var request = jasmine.Ajax.requests.mostRecent();

      expect(request.url).toBe('fake-server-url/employees');
      expect(request.method).toBe('GET');
      expect(request.requestHeaders['Accept']).toBe('application/json');
      expect(request.requestHeaders['X-AUTH-TOKEN']).toBe('secret-jwt-token');

      done();
    }, 0);
  });

  it('sends POST requests', (done) => {
    Api.post('/login', {username: 'username', password: 'password'});

    setTimeout(() => {
      var request = jasmine.Ajax.requests.mostRecent();

      expect(request.url).toBe('fake-server-url/login');
      expect(request.method).toBe('POST');
      expect(request.requestHeaders['Accept']).toBe('application/json');
      expect(request.requestHeaders['Content-Type']).toBe('application/json');
      expect(request.data()).toEqual({username: 'username', password: 'password'});

      done();
    }, 0);
  });
});
