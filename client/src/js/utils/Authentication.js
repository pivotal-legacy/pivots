import LocalStorage from './LocalStorage';

let Authentication = {
  requireAuth(nextState, redirectTo) {
    if (!LocalStorage.get('savedJwt')) {
      redirectTo(null, '/login', {nextPathname: nextState.location.pathname});
    }
  }
};

export default Authentication;
