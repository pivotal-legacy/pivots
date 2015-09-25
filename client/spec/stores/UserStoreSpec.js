import SpecHelper from '../specHelper';
import Api from '../../src/js/utils/Api';
import AuthStore from '../../src/js/stores/AuthStore';
import LocalStorage from '../../src/js/utils/LocalStorage';

describe('AuthStore', () => {
  describe('#login', () => {
    it('makes a request to Api and sets the returned token in LocalStore', () => {
      var fakePromise = SpecHelper.buildFakePromise();
      var authToken = 'token-returned-from-api';

      spyOn(Api, 'post').and.returnValue(fakePromise);
      spyOn(LocalStorage, 'set');

      AuthStore.login('username', 'password');

      expect(Api.post).toHaveBeenCalledWith('/login', {username: 'username', password: 'password'});

      fakePromise.resolve({headers: {'x-auth-token': authToken}});

      expect(LocalStorage.set).toHaveBeenCalledWith('savedJwt', authToken);
    });
  });

  describe('#logout', () => {
    it('clears LocalStorage', () => {
      spyOn(LocalStorage, 'remove');

      AuthStore.logout();

      expect(LocalStorage.remove).toHaveBeenCalledWith('savedJwt');
    });
  });
});
