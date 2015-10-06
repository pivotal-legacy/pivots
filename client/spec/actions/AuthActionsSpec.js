import AuthActions from '../../src/js/actions/AuthActions';
import FakePromise from '../support/FakePromise';
import Api from '../../src/js/utils/Api';
import {createStore} from 'reflux';

describe('AuthAction', () => {
  describe('#login', () => {
    beforeEach(() => {
      AuthActions.login.sync = true;
      AuthActions.login.completed.sync = true;
    });

    afterEach(() => {
      AuthActions.login.sync = false;
      AuthActions.login.completed.sync = false;
    });

    it('makes an api request', () => {
      var loginCompletedSpy = jasmine.createSpy('loginCompleted');
      createStore({
        listenables: [AuthActions],
        loginCompleted: loginCompletedSpy
      });

      let user = 'username';
      let password = 'password';
      let authToken = 'auth-token';
      let fakePromise = new FakePromise();

      spyOn(Api, 'post').and.returnValue(fakePromise);

      AuthActions.login(user, password);
      fakePromise.resolve({headers: {'x-auth-token': authToken}});

      expect(Api.post).toHaveBeenCalledWith('/login', {username: user, password: password});
      expect(loginCompletedSpy).toHaveBeenCalledWith(authToken);
    });
  });
});
