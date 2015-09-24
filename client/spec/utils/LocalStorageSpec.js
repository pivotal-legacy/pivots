'use strict';

require('../specHelper');

describe('LocalStorage', function () {
  var LocalStorage = require('../../src/js/utils/LocalStorage');

  it('sets an item into local storage', function () {
    LocalStorage.set('jwt-token', 'some-secret-token');

    expect(window.localStorage.getItem('jwt-token')).toEqual('some-secret-token');
  });

  it('returns stored items', function () {
    window.localStorage.setItem('jwt-token', 'some-secret-token');

    expect(LocalStorage.get('jwt-token')).toEqual('some-secret-token');
  });

  it('removes stored items', function() {
    window.localStorage.setItem('jwt-token', 'secret-token');

    expect(window.localStorage.getItem('jwt-token')).not.toEqual(null);

    LocalStorage.remove('jwt-token');

    expect(window.localStorage.getItem('jwt-token')).toEqual(null);
  });
});
