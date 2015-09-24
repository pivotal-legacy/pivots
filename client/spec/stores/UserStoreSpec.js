'use strict';

describe('UserStore', function () {
  var SpecHelper = require('../specHelper');
  var Api = require('../../src/js/utils/Api');
  var UserStore = require('../../src/js/stores/UserStore');
  var LocalStorage = require('../../src/js/utils/LocalStorage');

  describe('#login', function () {
    it('makes a request to Api and sets the returned token in LocalStore', function () {
      var fakePromise = SpecHelper.buildFakePromise();
      var authToken = 'token-returned-from-api';

      spyOn(Api, 'post').and.returnValue(fakePromise);
      spyOn(LocalStorage, 'set');

      UserStore.login('username', 'password');

      expect(Api.post).toHaveBeenCalledWith('/login', {username: 'username', password: 'password'});

      fakePromise.resolve({headers: {'x-auth-token': authToken}});

      expect(LocalStorage.set).toHaveBeenCalledWith('savedJwt', authToken);
    });
  });

  describe('#logout', function() {
    it('clears LocalStorage', function() {
      spyOn(LocalStorage, 'remove');

      UserStore.logout();

      expect(LocalStorage.remove).toHaveBeenCalledWith('savedJwt');
    });
  });
});
