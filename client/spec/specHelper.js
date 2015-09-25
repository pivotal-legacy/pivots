window.localStorage = {
  store: {},
  getItem: (key) => {
    return this.store[key];
  },
  setItem: (key, value) => {
    this.store[key] = value;
  },
  clear: () => {
    this.store = {};
  }
};

var buildFakePromise = () => {
  var realSuccessCallback;
  var realFailureCallback;

  return {
    then: (f) => {
      realSuccessCallback = f;
      return this;
    },

    fail: (f) => {
      realFailureCallback = f;
      return this;
    },

    resolve: (payload) => {
      return realSuccessCallback(payload);
    },

    reject: (payload) => {
      return realFailureCallback(payload);
    }
  };
};

var SpecHelper = {
  buildFakePromise: buildFakePromise
};

module.exports = SpecHelper;
