import AuthStore from '../../src/js/stores/AuthStore';
import LocalStorage from '../../src/js/utils/LocalStorage';

describe('AuthStore', () => {
  describe('#loginCompleted', () => {
    it('makes a request to Api and sets the returned token in LocalStore', () => {
      let authToken = 'token-returned-from-api';
      spyOn(LocalStorage, 'set');

      AuthStore.loginCompleted(authToken);

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
