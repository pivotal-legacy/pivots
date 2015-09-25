window.localStorage = {
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

var buildFakePromise = function () {
  var realSuccessCallback;
  var realFailureCallback;

  return {
    then: function (f) {
      realSuccessCallback = f;
      return this;
    },

    fail: function (f) {
      realFailureCallback = f;
      return this;
    },

    resolve: function (payload) {
      return realSuccessCallback(payload);
    },

    reject: function (payload) {
      return realFailureCallback(payload);
    }
  };
};

var SpecHelper = {
  buildFakePromise: buildFakePromise
};

module.exports = SpecHelper;
