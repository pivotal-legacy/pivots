var LocalStorage = {
  set: function(key, value) {
    window.localStorage.setItem(key, value);
  },

  get: function(key) {
    return window.localStorage.getItem(key);
  }
};

module.exports = LocalStorage;
