import {createActions} from 'reflux';
import Api from '../utils/Api';

const AuthActions = createActions({
  'login': {children: ['completed', 'failed']},
  'logout': {}
});

AuthActions.login.listen(function(username, password) {
  Api.post('/login', {username: username, password: password})
    .then(function(res) {
      this.completed(res.headers['x-auth-token']);
    }.bind(this));
});

export default AuthActions;
