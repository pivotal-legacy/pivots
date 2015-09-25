require('../specHelper');

import LocalStorage from '../../src/js/utils/LocalStorage';

describe('LocalStorage', () => {

  it('sets an item into local storage', () => {
    LocalStorage.set('jwt-token', 'some-secret-token');

    expect(window.localStorage.getItem('jwt-token')).toEqual('some-secret-token');
  });

  it('returns stored items', () => {
    window.localStorage.setItem('jwt-token', 'some-secret-token');

    expect(LocalStorage.get('jwt-token')).toEqual('some-secret-token');
  });

  it('removes stored items', () => {
    window.localStorage.setItem('jwt-token', 'secret-token');

    expect(window.localStorage.getItem('jwt-token')).not.toEqual(null);

    LocalStorage.remove('jwt-token');

    expect(window.localStorage.getItem('jwt-token')).toEqual(null);
  });
});
