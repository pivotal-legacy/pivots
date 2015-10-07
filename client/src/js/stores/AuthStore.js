import Reflux from 'reflux';
import AuthActions from '../actions/AuthActions';
import LocalStorage from '../utils/LocalStorage';

var AuthStore = Reflux.createStore({
  init() {
    this.listenToMany(AuthActions);
  },

  loginCompleted(token) {
    LocalStorage.set('savedJwt', token);
    this.trigger();
  },

  logout() {
    LocalStorage.remove('savedJwt');
    this.trigger();
  }
});

export default AuthStore;
