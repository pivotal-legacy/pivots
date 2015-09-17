jest.dontMock('../LocalStorage');

describe('LocalStorage', function () {
  var LocalStorage = require('../LocalStorage');
  var fakeLocalStorage;

  beforeEach(function () {
    fakeLocalStorage = {
      store: {},
      getItem: function (key) {
        return this.store[key];
      },
      setItem: function (key, value) {
        this.store[key] = value;
      },
      clear: function () {
        this.store = {};
      }
    };

    Object.defineProperty(window, 'localStorage', {value: fakeLocalStorage});
  });

  it('sets an item into local storage', function () {
    LocalStorage.set('jwt-token', 'some-secret-token');

    expect(window.localStorage.getItem('jwt-token')).toEqual('some-secret-token');
  });

  it('returns stored items', function () {
    fakeLocalStorage.setItem('jwt-token', 'some-secret-token');

    expect(LocalStorage.get('jwt-token')).toEqual('some-secret-token');
  });
});
